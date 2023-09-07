"use client";
import React, { FC, useEffect, useState } from "react";
import { addNotes, getNotes, deleteNote, updateNotes } from "../../lib/action";
import { Pencil, Trash } from "lucide-react";
import { InfinitySpin } from "react-loader-spinner";

interface Props {
  tripId: string;
  userId: string;
}

const NotesComponent: FC<Props> = ({ tripId, userId }) => {
  const [notes, setNotes] = useState<any>([]);
  const [editedNoteIndex, setEditedNoteIndex] = useState<number>(-1);
  const [editedNoteTitle, setEditedNoteTitle] = useState("");
  const [editedNoteDescription, setEditedNoteDescription] = useState("");
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    getNotes(tripId)
      .then((data) => {
        const fetchedNotes = data.data.data.result;
        setNotes(fetchedNotes);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [tripId]);

  // On Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (editedNoteIndex === -1) {
      // Add new note
      addNotes(tripId, { title: editedNoteTitle, description: editedNoteDescription, user_id: userId })
        .then((data) => {
          //console.log(data);
          setNotes([...notes, { title: editedNoteTitle, description: editedNoteDescription, user_id: userId }]);
          setEditedNoteTitle(""); // Clear the title field for the edited note
          setEditedNoteDescription(""); // Clear the description field for the edited note
        })
        .catch((err) => console.log(err));
    } else {
      // Edit existing note
      const editedNote = notes[editedNoteIndex];
      updateNotes(editedNote._id, {
        title: editedNoteTitle,
        description: editedNoteDescription,
        user_id: userId,
      })
        .then((data) => {
         // console.log(data, "edit notes data");
          const updatedNotes = [...notes];
          updatedNotes[editedNoteIndex] = { ...editedNote, title: editedNoteTitle, description: editedNoteDescription };
          setNotes(updatedNotes);
          setEditedNoteTitle(""); // Clear the title field for the edited note
          setEditedNoteDescription(""); // Clear the description field for the edited note
          setEditedNoteIndex(-1);
        })
        .catch((err) => console.log(err));
    }
  };

  // On Edit
  const handleEdit = (note: any, index: number) => {
    setEditedNoteIndex(index);
    setEditedNoteTitle(note.title);
    setEditedNoteDescription(note.description);
  };

  // On Delete
  const handleDelete = (note: any, index: number) => {
    deleteNote(tripId, note._id)
      .then((data) => {
        //console.log("delete Note", data);
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
      })
      .catch((err) => console.log(err));
  };
  if(isLoading){
    return <div style={{ display: 'flex',justifyContent:"center", alignItems:"center"}}><InfinitySpin color="#009688"/></div> 
  }
  else{
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 space-y-3 flex flex-col items-center justify-center ">
        <input
          type="text"
          placeholder="Title"
          className="w-full md:w-8/12 resize-none border border-gray-400 rounded-md p-2"
          value={editedNoteTitle}
          onChange={(e) => setEditedNoteTitle(e.target.value)}
        />
        <textarea
          id="noteInput"
          className="w-full md:w-8/12 h-32 mb-4 resize-none border border-gray-300 rounded-md p-2"
          value={editedNoteDescription}
          onChange={(e) => setEditedNoteDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center justify-center space-x-5 ">
        <input
          type="submit"
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-green-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          value={editedNoteIndex === -1 ? "Add Note" : "Edit Note"}
        />
        {editedNoteIndex !== -1 && (
          <input
            onClick={() => setEditedNoteIndex(-1)}
            type="reset"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-green-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            value="Cancel"
          />
        )}
      </div>
      <ul
        id="noteList"
        className="mt-8  flex-wrap flex justify-center  items-center"
      >
        {notes.map((note: any, index: number) => (
          <li key={index} className="w-60 h-44 rounded overflow-hidden shadow-lg bg-white/70 mb-4 ml-4 mr-4" style={{width:'310px'}}>
            {editedNoteIndex !== index ? (
              <div className="px-3 py-2">
                <div className="font-bold text-xl mb-2 flex justify-between items-center">
                  {note?.title}
                  <span className="flex">
                    <Pencil
                      className="mr-3 text-blue-400"
                      onClick={() => handleEdit(note, index)}
                    />
                    <Trash
                      className="mr-3 text-red-400"
                      onClick={() => handleDelete(note, index)}
                    />
                  </span>
                </div>
                <p className="text-gray-700 text-sm overflow-hidden text-ellipsis">
                  {note?.description}
                </p>
              </div>
            ) : (
              // Edit Card
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Title"
                  className="mb-2 w-full flex justify-between items-center"
                  value={editedNoteTitle}
                  onChange={(e) => setEditedNoteTitle(e.target.value)}
                />
                <textarea
                  id="noteInput"
                  className="w-full h-24 resize-none border border-gray-300 rounded-md p-2"
                  value={editedNoteDescription}
                  onChange={(e) => setEditedNoteDescription(e.target.value)}
                ></textarea>
                {/* <div>
                  <div className="flex items-center justify-between space-x-5">
                    <input
                      type="submit"
                      className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-green-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      value="Save Changes"
                    />
                    <input
                      onClick={() => setEditedNoteIndex(-1)}
                      type="reset"
                      className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-green-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      value="Cancel"
                    />
                  </div>
                </div> */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
              }
};

export default NotesComponent;
