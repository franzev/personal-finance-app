import Image from 'next/image';
import { Transaction } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { normalizeImagePath } from '@/lib/utils';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const isPositive = transaction.amount > 0;
  const avatarPath = normalizeImagePath(transaction.avatar);

  return (
    <div className="border-b border-gray-100 py-4 transition-colors last:border-0 hover:bg-gray-50">
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-4 sm:items-center sm:gap-0">
        <div className="flex min-w-0 items-center gap-4 sm:col-span-1">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={avatarPath}
              alt={transaction.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-gray-900">{transaction.name}</p>
            <p className="mt-1 text-xs text-gray-500 sm:hidden">{transaction.category}</p>
          </div>

          <div className="ml-auto text-right sm:hidden">
            <p className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-gray-900'}`}>
              {isPositive ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>

            <p className="mt-1 text-xs text-gray-500">{formatDate(transaction.date)}</p>
          </div>
        </div>

        <div className="hidden text-sm text-gray-500 sm:block">{transaction.category}</div>

        <div className="hidden text-sm text-gray-500 sm:block">{formatDate(transaction.date)}</div>

        <div className="hidden text-right sm:block">
          <p
            className={`text-sm font-bold md:text-base ${
              isPositive ? 'text-green-600' : 'text-gray-900'
            }`}
          >
            {isPositive ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </p>
        </div>
      </div>
    </div>
  );
};
