export default function Navbar({ inHub, onRestart }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-7 sm:px-10">
      <span className="text-xs font-bold tracking-[0.4em]">THE CORE</span>

      <div className="flex items-center gap-4">
        <span className="hidden text-[10px] tracking-[0.2em] text-cyan-400 sm:block">
          SYSTEM ONLINE
        </span>

        {inHub && (
          <button
            type="button"
            onClick={onRestart}
            className="pointer-events-auto cursor-pointer text-[10px] tracking-[0.2em] text-gray-400 hover:text-white"
          >
            RESTART
          </button>
        )}
      </div>
    </header>
  );
}
