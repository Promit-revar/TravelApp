import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StateContext } from "@/context/Provider";
import React, { FC, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateForm } from "@/store/formSlice";

interface Step2Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step2: FC<Step2Props> = ({ setStep, step }) => {
  const form_values = useSelector((state: any) => state.form);

  const { formValues, setFormValues } = useContext(StateContext);

  const dispatch = useDispatch();

  
  // const [localVal, setLocalVal] = useState({});
  // useEffect(() => {
  //   setLocalVal(JSON.parse(localStorage.getItem("userData")));
   
  // }, []);
  

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          How do you wish to fly?
        </h2>
        <RadioGroup
          defaultValue={form_values.flight_type}
          className="flex items-center gap-4"
          onValueChange={(value: "Economy" | "Business" | "First Class") => {
            setFormValues({
              ...formValues,
              flight_type: value,
            });
            dispatch(updateForm({ flight_type: value }));
          }}
        >
          {["Economy", "Business", "First Class"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label
                className="font-medium cursor-pointer capitalize"
                htmlFor={item}
              >
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/*  */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Do you also want to book hotel?
        </h2>
        <RadioGroup
          defaultValue={form_values.book_hotel}
          className="flex items-center gap-4"
          onValueChange={(value: "Yes" | "No") => {
            setFormValues({ ...formValues, book_hotel: value });
            dispatch(updateForm({ book_hotel: value }));
          }}
        >
          {["Yes", "No"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label
                className="font-medium cursor-pointer capitalize"
                htmlFor={item}
              >
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* buttons */}
      <div className="space-x-4 flex justify-between pt-4">
        <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
          Previous
        </Button>
        <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default Step2;
