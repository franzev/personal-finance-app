import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Budget, Transaction } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { normalizeImagePath } from '@/lib/utils';
import { Button, Card, Progress } from '@/components';

interface BudgetCardProps {
  budget: Budget;
  spent: number;
  transactions: Transaction[];
  onEdit: () => void;
  onDelete: () => void;
}

export const BudgetCard = ({ budget, spent, transactions, onEdit, onDelete }: BudgetCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  
  // Memoize calculations to prevent unnecessary recalculations
  const percentage = useMemo(() => Math.min((spent / budget.maximum) * 100, 100), [spent, budget.maximum]);
  const remaining = useMemo(() => Math.max(0, budget.maximum - spent), [budget.maximum, spent]);
  const latestTransactions = useMemo(
    () => transactions.filter((t) => t.category === budget.category).slice(0, 3),
    [transactions, budget.category]
  );

  // Memoize event handlers to prevent unnecessary re-renders
  const handleMenuToggle = useCallback(() => setShowMenu((prev) => !prev), []);
  const handleMenuClose = useCallback(() => setShowMenu(false), []);
  
  const handleEdit = useCallback(() => {
    onEdit();
    setShowMenu(false);
  }, [onEdit]);
  
  const handleDelete = useCallback(() => {
    onDelete();
    setShowMenu(false);
  }, [onDelete]);

  useEffect(() => {
    if (!showMenu) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleMenuClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
    // handleMenuClose is stable (memoized with empty deps), safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenu]);

  return (
    <Card className="bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: budget.theme }}
            role="img"
            aria-label={`${budget.category} theme color`}
          />
          <h3 className="text-xl font-bold text-gray-900">{budget.category}</h3>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-lg p-2 hover:bg-gray-100"
            onClick={handleMenuToggle}
            aria-label={`Options for ${budget.category} budget`}
            aria-haspopup="menu"
            aria-expanded={showMenu}
          >
            <Image
              src="/assets/images/icon-ellipsis.svg"
              alt=""
              width={16}
              height={4}
              aria-hidden="true"
            />
          </Button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={handleMenuClose}
                aria-hidden="true"
              />
              <div
                className="absolute top-full right-0 z-20 mt-2 w-36 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                role="menu"
                aria-label={`Actions for ${budget.category} budget`}
              >
                <Button
                  variant="ghost"
                  onClick={handleEdit}
                  className="h-auto w-full justify-start px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                >
                  Edit Budget
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDelete}
                  className="h-auto w-full justify-start px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                  role="menuitem"
                >
                  Delete Budget
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-4 text-sm text-gray-500">Maximum of {formatCurrency(budget.maximum)}</p>

        <Progress
          value={percentage}
          className="mb-3 h-8"
          color={budget.theme}
          aria-label={`${percentage.toFixed(1)}% of budget spent`}
        />

        <div className="mt-4 grid grid-cols-2 gap-8">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: budget.theme }}
              aria-hidden="true"
            />
            <div>
              <p className="mb-1 text-xs text-gray-500">Spent</p>
              <p className="text-base font-bold text-gray-900">{formatCurrency(spent)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-1 shrink-0 rounded-full bg-gray-200" aria-hidden="true" />
            <div>
              <p className="mb-1 text-xs text-gray-500">Remaining</p>
              <p className="text-base font-bold text-gray-900">{formatCurrency(remaining)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="-mx-1 rounded-lg bg-[#F8F4F0] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900">Latest Spending</h4>
            {latestTransactions.length > 0 && (
              <Button
                variant="ghost"
                className="flex h-auto items-center gap-3 p-0 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                See All
                <Image
                  src="/assets/images/icon-caret-right.svg"
                  alt=""
                  width={6}
                  height={11}
                  aria-hidden="true"
                  className="h-3 w-auto"
                />
              </Button>
            )}
          </div>

          {latestTransactions.length > 0 ? (
            <div className="space-y-0">
              {latestTransactions.map((transaction, index) => {
                const avatarPath = normalizeImagePath(transaction.avatar);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-200 py-3 last:border-0"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src={avatarPath}
                          alt={transaction.name}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="truncate text-sm text-gray-900">{transaction.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">-{formatCurrency(transaction.amount)}</p>
                      <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-4 text-center text-sm text-gray-500">No transactions yet</p>
          )}
        </div>
      </div>
    </Card>
  );
};
