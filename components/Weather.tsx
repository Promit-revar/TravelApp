import { cn } from "@/lib/utils";
import { Cloudy } from "lucide-react";
import { FC } from "react";

interface WeatherProps {
  condition: string;
  temprature: string;
  aqi: string;
  environment: string;
  className?: string;
  humidity: string;
}

const Weather: FC<WeatherProps> = ({
  aqi,
  condition,
  environment,
  temprature,
  className,
  humidity,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 md:gap-6 lg:gap-8 sm:text-lg md:text-xl md:tracking-[4px] tracking-wider justify-center text-white",
        className
      )}
    >
      <span className="flex items-center gap-2">
        {condition} {temprature}
      </span>

      <span className="h-4 w-0.5 bg-white"></span>

      <span className="flex gap-2 items-center">
        {/* <span className="py-1 px-2 bg-green-500 rounded-lg">AQI {aqi}</span>
        <span>{environment}</span> */}
        Humidity {humidity}
      </span>
    </div>
  );
};

export default Weather;
