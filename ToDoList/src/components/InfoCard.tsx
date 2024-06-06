import { format } from "date-fns";

interface InfoCardProps {
  title: string;
  task: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, task }) => {
  const date = new Date();

  return (
    <div className="w-[200px] bg-slate-600 p-4 rounded-xl">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{format(date, "yyyy-MM-dd")}</p> <p>{task}</p>
    </div>
  );
};

export default InfoCard;
