import React, { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch user data from backend and populate the 'user' state
  const fetchUserData = async () => {
    try {
      // Make an API call to fetch user data here and set the 'user' state
      const userData = await fetchUserDataFromBackend(); // Replace this with your API call
      setUser(userData);
    } catch (error) {
      // Handle error if user data cannot be fetched
      console.error("Error fetching user data", error);
    }
  };

  // Function to handle the form submit when user clicks 'Save' after editing
  const handleSave = async () => {
    try {
      // Make an API call to save the updated user data to the backend
      await saveUserDataToBackend(user); // Replace this with your API call
      setIsEditing(false); // Turn off edit mode after successful save
    } catch (error) {
      // Handle error if user data cannot be saved
      console.error("Error saving user data", error);
    }
  };

  // Call the fetchUserData function when the component mounts to populate the 'user' state
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {/* Display user data when not in edit mode */}
      {!isEditing && (
        <div>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Gender: {user.gender}</p>
          <p>Date of Birth: {user.dob}</p>
          <p>Email: {user.email}</p>
          {/* Add other user data fields here */}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}

      {/* Display edit form when in edit mode */}
      {isEditing && (
        <div>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          />
          {/* Add other editable fields here */}
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
