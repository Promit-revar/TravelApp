import React, { FC } from "react";
import { useEffect, useState } from "react";
import { getIxigoSearchResults } from "../../lib/action";
import Image from "next/image";
import classes from "../../styles/pages/trip-details.module.scss";
import moment from 'moment';
import { FilePlus2 } from 'lucide-react';
import { useRouter } from "next/navigation";

interface cardProps {
  tripDetailsData: any;
  showClientProfile: any;
}
const TripCard: FC<cardProps> = ({ tripDetailsData, showClientProfile }) => {
  //console.log("tripDetailsData", tripDetailsData);
  const router = useRouter();
  const [place, setPlace] = useState<any>({});
  useEffect(() => {
    getIxigoSearchResults(tripDetailsData.destination).then((data) => {
      setPlace(data[0]);
    }).catch(err => console.log(err.message));
  }, [tripDetailsData.destination]);
  return (
<div className={classes.card_inner} onClick={() =>router.push(`/trip?tripId=${tripDetailsData._id}`)}>
      <div className={classes.card_inner_image_wrapper} >
        <Image
          src={place?.destination_image}
          width={300}
          height={200}
          alt="city"
          className={classes.card_inner_image}
        />
      </div>

      <div className={classes.card_inner_details}>
        <div className={classes.flexAlign}>
          <p className={classes.card_inner_name}>
            <span className={classes.label}>&nbsp;</span>
            {tripDetailsData?.name}
          </p>

          {/* <span>
            {moment(tripDetailsData?.going_travel_date).format('h:mm a')}
          </span> */}
        </div>


        <p className={classes.card_inner_name}>
          <span className={classes.icon_wrapper}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7071 13.7071L20.3552 16.3552C20.7113 16.7113 20.7113 17.2887 20.3552 17.6448C18.43 19.57 15.3821 19.7866 13.204 18.153L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L5.84701 10.796C4.21341 8.61788 4.43001 5.56999 6.35523 3.64477C6.71133 3.28867 7.28867 3.28867 7.64477 3.64477L10.2929 6.29289C10.6834 6.68342 10.6834 7.31658 10.2929 7.70711L9.27175 8.72825C9.10946 8.89054 9.06923 9.13846 9.17187 9.34373C10.3585 11.7171 12.2829 13.6415 14.6563 14.8281C14.8615 14.9308 15.1095 14.8905 15.2717 14.7283L16.2929 13.7071C16.6834 13.3166 17.3166 13.3166 17.7071 13.7071Z"
                stroke="#33363F"
                stroke-width="2"
              />
            </svg>
          </span>
          {tripDetailsData?.phoneNo}
        </p>
        <div className={`${classes.flexAlign}`}>
          <div className="w-48">
            <p className={classes.card_inner_name}>
              <span className={classes.icon_wrapper}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4.66675"
                    y="7"
                    width="18.6667"
                    height="14"
                    rx="2"
                    stroke="#33363F"
                    stroke-width="2"
                  />
                  <path
                    d="M4.66675 10.5L13.1057 14.7195C13.6687 15.001 14.3315 15.001 14.8945 14.7195L23.3334 10.5"
                    stroke="#33363F"
                    stroke-width="2"
                  />
                </svg>
              </span>
              <span className="w-full truncate overflow-hidden">{tripDetailsData?.email}</span>
            </p>
          </div>
          <div className={classes.card_inner_notes}>
            <span className={classes.notes_wrapper}>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            </span>
            {} {/* Display the notes */}
          </div>

        </div>
      </div>
      {/* <p className={classes.card_inner_name}>
        <span className={classes.label}>Travel from:&nbsp;</span>
        {tripDetailsData?.from}
      </p>

      <p className={classes.card_inner_name}>
        <span className={classes.label}>Destination:&nbsp;</span>
        {tripDetailsData?.destination}
      </p>

      {tripDetailsData?.travel_type && (
        <div className={classes.one_way}>
          <p className={classes.card_inner_name}>
            <span className={classes.label}>Travel Type:&nbsp;</span>
            <span
              style={{
                backgroundColor:
                  tripDetailsData?.travel_type == "One Way"
                    ? "#0000ff"
                    : "#21B6A8",
              }}
              className={classes.travel_type}
            >
              {tripDetailsData?.travel_type}
            </span>
          </p>
        </div>
      )}

      <p className={classes.card_inner_name}>
        <span className={classes.label}>Number of travellers:&nbsp;</span>
        {tripDetailsData?.no_of_travellers}
      </p> */}
    </div>
  );
};

export default TripCard;
