import LoginModal from "./LoginModal";

export default function Header() {
  return (
    <div className="w-full bg-slate-400 sticky flex">
      <h1 className="m-2 text-[40px]">My To Do List Forever</h1>
      <div className="ml-auto mr-4">
        <LoginModal />
      </div>
    </div>
  );
}
