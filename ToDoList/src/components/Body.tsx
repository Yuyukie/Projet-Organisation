import Calendar from "./calendar";

export default function Body() {
  return (
    <div>
      <section className="bg-slate-700">
        <div className="w-[50%] p-2">
          <Calendar />
        </div>
      </section>
    </div>
  );
}
