import React from "react";
import { Calendar } from "@/components/ui/calendar";
import CardModal from "./CardModal";

export default function Body() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div>
      <section className="bg-slate-500 flex flex-col py-2">
        <h2 className="text-center mb-2">Daily Task</h2>
        <CardModal />
      </section>
      <section className="bg-slate-700">
        <div className="w-[50%] p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </section>
    </div>
  );
}
