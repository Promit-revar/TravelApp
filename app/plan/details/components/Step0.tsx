import React, { FC, useContext, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { updateForm } from "@/store/formSlice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StateContext } from "@/context/Provider";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

interface Step1Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step0: FC<Step1Props> = ({ setStep, step }) => {
  const form_values = useSelector((state: any) => state.form);

  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    getValues,
    register,
    setValue,
    control,
  } = useForm({
    reValidateMode: "onChange",
  });


  
  const dispatch = useDispatch();

  const myRef = useRef<HTMLElement | null>(null);
  const { formValues, setFormValues } = useContext(StateContext);
  const [passengersNumber, setPassengersNumber] = useState<any>(1);

  useEffect(() => {
    if (form_values?.destination) {
      setValue(
        "destination",
        `${form_values.destination.place && form_values.destination.place}${
          form_values.destination.city &&
          form_values.destination.city !== form_values.destination.city
            ? ", " + form_values.destination.city
            : ""
        }${
          form_values.destination.state && ", " + form_values.destination.state
        }${
          form_values.destination.country &&
          ", " + form_values.destination.country
        }`
      );
    }

    if (form_values?.from) {
      setValue("from", form_values.from);
    }

    if (form_values?.passengers_number) {
      setPassengersNumber(form_values?.passengers_number);
    }
  }, [form_values, setValue]);

  const onSubmit = async (formInput: any) => {
    let fromInput = "";
    console.log("myRef.current", myRef.current);
    if (myRef.current instanceof HTMLInputElement) {
      fromInput = myRef.current.value;
    }
    if (
      (usedFromInput == 0 && fromInput != null && fromInput.length > 0) ||
      fromPlaceList.includes(fromInput)
    ) {
      const updatedForm = {
        from: fromInput,
        passengers_number: passengersNumber,
      };

      dispatch(updateForm(updatedForm));
      setStep((s) => s + 1);
    } else {
      setfromError(true);
    }
  };

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
  ];

  const [fromError, setfromError] = useState(false);
  const [fromPlace, setFromPlace] = useState([]);
  const [usedFromInput, setUsedFromInput] = useState(0);
  const [fromPlaceList, setFromPlaceList] = useState<string[]>([]);
  const [PlaceAutocomplete, setPlaceAutocomplete] = useState("");

  const onChangePlaceAutocomplete = async (e: any) => {
    setUsedFromInput(1);
    setfromError(false);
    if (e.target.value) {
      let data = await placeAutocomplete(e.target.value);
      if (data.status == 0) {
        let tmpfromPlaceList = [];
        for (let i = 0; i < data.data.length; i++) {
          tmpfromPlaceList.push(data.data[i].place);
        }
        setFromPlaceList(tmpfromPlaceList);
        setFromPlace(data.data);
      } else {
        setFromPlaceList([]);
        setFromPlace([]);
      }
    }
  };

  const placeAutocomplete = async (search: string) => {
    try {
      let url =
        `https://apiv2.quantumtravel.ai/api/place/autocomplete/` + search;

      let { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {/* <h2 className="text-xl font-semibold text-gray-800">First Step</h2> */}

          <div className="flex">
            <div className="flex w-full" style={{ flexDirection: "column" }}>
              <label htmlFor="From" style={{ paddingBottom: "5px" }}>
                From
              </label>
              <Controller
                name="from"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Autocomplete
                    freeSolo
                    filterOptions={(x) => x}
                    // onChange={(e) => setPlaceAutocomplete(e.target.innerText)}
                    options={
                      fromPlace
                        ? fromPlace.map((obj: { place: string }) => obj.place)
                        : []
                    }
                    {...field}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={myRef}
                        id="from"
                        name="from"
                        error={fromError}
                        helperText={fromError ? "Enter a valid city" : ""}
                        onChange={(e) => onChangePlaceAutocomplete(e)}
                      />
                    )}
                    onChange={(_, data) => {
                      setPlaceAutocomplete(data);
                    }}
                    value={field.value}
                  />
                )}
              />
            </div>

            <span className="from_to_line"></span>

            <div className="flex w-full" style={{ flexDirection: "column" }}>
              <label htmlFor="destination" style={{ paddingBottom: "5px" }}>
                Destination
              </label>
              <input
                style={{ opacity: 1, height: "56px" }}
                {...register("destination", {
                  required: true,
                })}
                type="text"
                className="flex w-full rounded-md border border-input bg-background px-3  py-2.5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="destination"
                placeholder="Destination"
                name="destination"
                disabled
              />
            </div>
          </div>

          {errors?.from && errors.from.type === "required" && (
            <p className="errorTxt"> Please enter a valid city </p>
          )}
        </div>

        <div className="my-8">
          <h3 style={{ paddingBottom: "5px" }}>Number of travelers</h3>

          <Select
            options={options}
            // defaultValue={{ value: passengersNumber, label: passengersNumber }}
            value={{ value: passengersNumber, label: passengersNumber }}
            onChange={(e) => setPassengersNumber(e?.value)}
            placeholder="Number of travelers"
          />
        </div>

        {/* buttons */}
        <div className="space-x-4 flex justify-between pt-4">
          <Link href="/">
            <Button variant="ghost">Previous</Button>
          </Link>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default Step0;
