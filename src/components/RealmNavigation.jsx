import { ArrowUpRight } from "lucide-react";

export default function RealmNavigation({
  realms,
  hoveredRealm,
  onHover,
  onSelect,
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      {realms.map((realm) => {
        const isActive = hoveredRealm === realm.id;

        return (
          <button
            key={realm.id}
            type="button"
            onClick={() => onSelect(realm.id)}
            onPointerEnter={() => onHover(realm.id)}
            onPointerLeave={() => onHover(null)}
            onFocus={() => onHover(realm.id)}
            onBlur={() => onHover(null)}
            className={`group relative flex min-h-28 w-full cursor-pointer flex-col justify-between overflow-hidden border p-5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
              isActive
                ? "border-cyan-400/70 bg-cyan-500/10"
                : "border-white/10 bg-white/[0.025] hover:border-cyan-400/40 hover:bg-cyan-500/[0.05]"
            }`}
          >
            <div
              className={`absolute left-0 top-0 h-full w-[2px] bg-cyan-400 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="flex w-full items-center justify-between">
              <span className="text-[10px] tracking-[0.3em] text-cyan-500">
                REALM {realm.number}
              </span>

              <ArrowUpRight
                size={16}
                className={`transition-all duration-300 ${
                  isActive
                    ? "-translate-y-1 translate-x-1 text-cyan-300"
                    : "text-gray-600 group-hover:text-cyan-300"
                }`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                {realm.title}
              </h3>

              <p className="mt-1 text-xs text-gray-500">{realm.subtitle}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
