import { Radio, Wifi } from "lucide-react";

export default function SignalVisualizer({ activeChannel }) {
  return (
    <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[70px]" />

      <div className="absolute h-48 w-48 rounded-full border border-cyan-400/10 sm:h-56 sm:w-56" />

      <div className="absolute h-60 w-60 animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-cyan-400/25 motion-reduce:animate-none sm:h-72 sm:w-72" />

      <div className="absolute h-40 w-40 animate-[spin_18s_linear_infinite_reverse] rounded-full border-2 border-transparent border-t-cyan-400/70 border-r-cyan-400/20 motion-reduce:animate-none sm:h-48 sm:w-48" />

      <div className="absolute h-28 w-28 animate-[spin_12s_linear_infinite] rounded-full border border-transparent border-b-cyan-300/80 border-l-cyan-400/30 motion-reduce:animate-none sm:h-36 sm:w-36" />

      <div className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-400/20 motion-reduce:animate-none" />

      <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-cyan-300/70 bg-[#071d29] shadow-[0_0_35px_rgba(34,211,238,0.2),inset_0_0_25px_rgba(34,211,238,0.1)]">
        <Radio size={27} className="text-cyan-300" />
        <span className="mt-2 text-[8px] tracking-[0.2em] text-cyan-400">
          ONLINE
        </span>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] tracking-[0.2em] text-gray-500">
        <Wifi size={13} className="text-cyan-400" />
        TRANSMISSION READY
      </div>

      <div className="absolute bottom-4 right-4 text-[9px] tracking-[0.2em] text-cyan-500">
        CH / {activeChannel.number}
      </div>
    </div>
  );
}
