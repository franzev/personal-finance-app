interface RecurringBillCardProps {
  label: string;
  amount: number;
  borderColor: string;
}

export function RecurringBillCard({ label, amount, borderColor }: RecurringBillCardProps) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border-l-4 bg-[#F8F4F0] p-4"
      style={{ borderLeftColor: borderColor }}
    >
      <span className="text-sm font-normal text-[#201F24]">{label}</span>
      <span className="text-sm font-bold text-[#201F24]">${amount.toFixed(2)}</span>
    </div>
  );
}
