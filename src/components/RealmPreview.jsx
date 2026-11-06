import RealmHologram from "./RealmHologram";

export default function RealmPreview({ realm }) {
  return (
    <section className="relative flex min-h-[540px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[340px] w-[340px] rounded-full border border-cyan-500/10 sm:h-[420px] sm:w-[420px]" />

        <div className="absolute h-[290px] w-[290px] rounded-full border border-dashed border-cyan-500/10 sm:h-[360px] sm:w-[360px]" />

        <div className="absolute h-[240px] w-[240px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center">
        <div className="absolute left-4 top-6 text-[10px] tracking-[0.3em] text-cyan-500">
          {realm ? `REALM ${realm.number}` : "SYSTEM READY"}
        </div>

        <div className="absolute right-4 top-6 text-[10px] tracking-[0.3em] text-gray-500">
          HOLOGRAPHIC DISPLAY
        </div>

        <div className="relative w-full">
          <RealmHologram realmId={realm?.id ?? null} />
        </div>
      </div>

      <div
        key={realm?.id ?? "default"}
        className="relative z-10 w-full max-w-lg animate-[realm-reveal_400ms_ease-out_both] px-6 pb-8 text-center"
      >
        <p className="mb-3 text-[10px] tracking-[0.35em] text-cyan-400">
          {realm ? `DESTINATION ${realm.number}` : "CENTRAL SYSTEM"}
        </p>

        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {realm ? realm.title : "THE CORE"}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-400">
          {realm
            ? realm.description
            : "The center of everything I create. Choose a destination to begin exploring."}
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] text-cyan-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {realm ? "DESTINATION IDENTIFIED" : "AWAITING INPUT"}
        </div>
      </div>
    </section>
  );
}
