import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";

interface Step4Props {
  destination: any;
}

const Step4: FC<Step4Props> = ({ destination }) => {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Thank You For Contacting Quantum Travels
      </h2>
      <p>Please expect our call in the next 30 minutes.</p>
      <Link className="block" href={`/plan/${destination}`}>
        <Button>Close</Button>
      </Link>
    </div>
  );
};

export default Step4;
