type Props = {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  formatText: (text: string) => string;
};

export const OptionItem = ({ option, selected, onSelect, formatText }: Props) => {

  return (
    <button
      type="button"
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? "bg-amber-accent/10 border-amber-accent"
          : "bg-white/8 border-white/10 hover:bg-white/10"
      }
      `}
    >
      <div className="flex items-center gap-3">
        {/* radio visual */}
        <div
          className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center ${selected ? "border-amber-accent" : "border-white/30"}
          `}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-amber-accent" />}
        </div>

        {/* texto */}
        <span className="text-[#D4E4F5] text-[14px]">{formatText(option.texto)}</span>
      </div>
    </button>
  );
};
