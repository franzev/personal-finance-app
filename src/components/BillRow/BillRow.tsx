import Image from 'next/image';
import { RecurringBill } from '@/lib/types';
import { formatCurrency, getOrdinalSuffix } from '@/lib/formatters';
import { normalizeImagePath } from '@/lib/utils';

interface BillRowProps {
  bill: RecurringBill;
}

export const BillRow = ({ bill }: BillRowProps) => {
  const avatarPath = normalizeImagePath(bill.avatar);
  const dueLabel = `Monthly - ${bill.dayOfMonth}${getOrdinalSuffix(bill.dayOfMonth)}`;
  const dueDateColor = bill.isPaid ? 'text-[#277C78]' : 'text-[#696868]';

  return (
    <div className="border-b border-gray-100 px-4 py-5 transition-colors last:border-0 hover:bg-gray-50/50 sm:px-6">
      <div className="space-y-3 sm:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={avatarPath}
              alt={bill.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>

          <p className="truncate text-sm font-bold text-gray-900">{bill.name}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 text-xs ${dueDateColor}`}>
            <span>{dueLabel}</span>

            {bill.isPaid && (
              <Image
                src="/assets/images/icon-bill-paid.svg"
                alt="Bill paid"
                width={12}
                height={12}
                className="shrink-0"
              />
            )}

            {!bill.isPaid && bill.isDueSoon && (
              <Image
                src="/assets/images/icon-bill-due.svg"
                alt="Bill due soon"
                width={12}
                height={12}
                className="shrink-0"
              />
            )}
          </div>

          <span
            className={`text-sm font-bold ${
              bill.isDueSoon && !bill.isPaid ? 'text-[#C94736]' : 'text-gray-900'
            }`}
          >
            {formatCurrency(bill.amount)}
          </span>
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={avatarPath}
              alt={bill.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>

          <p className="truncate text-sm font-bold text-gray-900">{bill.name}</p>
        </div>

        <div className={`flex items-center justify-center gap-2 text-sm ${dueDateColor}`}>
          <span className="whitespace-nowrap">{dueLabel}</span>
          {bill.isPaid && (
            <Image
              src="/assets/images/icon-bill-paid.svg"
              alt="Bill paid"
              width={14}
              height={14}
              className="shrink-0"
            />
          )}
          {bill.isDueSoon && !bill.isPaid && (
            <Image
              src="/assets/images/icon-bill-due.svg"
              alt="Bill due soon"
              width={14}
              height={14}
              className="shrink-0"
            />
          )}
        </div>
        <div className="text-right">
          <span
            className={`text-sm font-bold ${
              bill.isDueSoon && !bill.isPaid ? 'text-[#C94736]' : 'text-gray-900'
            }`}
          >
            {formatCurrency(bill.amount)}
          </span>
        </div>
      </div>
    </div>
  );
};
