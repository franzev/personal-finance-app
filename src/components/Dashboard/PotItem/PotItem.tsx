interface PotItemProps {
  label: string;
  amount: number;
  color: string;
}

export function PotItem({ label, amount, color }: PotItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <p className="truncate text-xs text-[#696868]">{label}</p>
        <p className="text-sm font-bold whitespace-nowrap text-[#201F24]">${amount.toFixed(0)}</p>
      </div>
    </div>
  );
}
