interface BudgetItemProps {
  category: string;
  amount: number;
  color: string;
}

export function BudgetItem({ category, amount, color }: BudgetItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-4">
      <div className="h-10 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm text-[#696868]">{category}</span>
        <span className="text-sm font-bold text-[#201F24]">${amount.toFixed(2)}</span>
      </div>
    </div>
  );
}
