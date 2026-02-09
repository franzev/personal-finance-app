import Image from 'next/image';
import { normalizeImagePath } from '@/lib/utils';

interface TransactionItemProps {
  name: string;
  amount: number;
  date: string;
  avatar: string;
  isPositive?: boolean;
}

export function TransactionItem({
  name,
  amount,
  date,
  avatar,
  isPositive = false,
}: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={normalizeImagePath(avatar)}
            alt={name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-sm font-bold text-[#201F24]">{name}</p>
      </div>

      <div className="shrink-0 text-right">
        <p className={`text-sm font-bold ${isPositive ? 'text-[#277C78]' : 'text-[#201F24]'}`}>
          {isPositive ? '+' : '-'}${Math.abs(amount).toFixed(2)}
        </p>
        <p className="mt-1 text-xs text-[#696868]">{date}</p>
      </div>
    </div>
  );
}
