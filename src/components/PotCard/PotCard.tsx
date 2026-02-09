import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Pot } from '@/lib/types';
import { formatCurrency } from '@/lib/formatters';
import { Button, Card, Progress } from '@/components';

interface PotCardProps {
  pot: Pot;
  onEdit: () => void;
  onDelete: () => void;
  onAddMoney: () => void;
  onWithdraw: () => void;
}

export const PotCard = ({ pot, onEdit, onDelete, onAddMoney, onWithdraw }: PotCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const percentage = Math.min((pot.total / pot.target) * 100, 100);

  useEffect(() => {
    if (!showMenu) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showMenu]);

  return (
    <Card className="bg-white p-5 md:p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="h-4 w-4 shrink-0 rounded-full"
            style={{ backgroundColor: pot.theme }}
            role="img"
            aria-label={`${pot.name} theme color`}
          />
          <h3 className="text-xl font-bold text-gray-900">{pot.name}</h3>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-lg p-2 hover:bg-gray-100"
            onClick={() => setShowMenu(!showMenu)}
            aria-label={`Options for ${pot.name}`}
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
                onClick={() => setShowMenu(false)}
                aria-hidden="true"
              />
              <div
                className="absolute top-full right-0 z-20 mt-2 w-36 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                role="menu"
                aria-label={`Actions for ${pot.name}`}
              >
                <Button
                  variant="ghost"
                  onClick={() => {
                    onEdit();
                    setShowMenu(false);
                  }}
                  className="h-auto w-full justify-start px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                >
                  Edit Pot
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onDelete();
                    setShowMenu(false);
                  }}
                  className="h-auto w-full justify-start px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                  role="menuitem"
                >
                  Delete Pot
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-sm text-gray-500">Total Saved</p>
        <p className="text-[32px] font-bold text-gray-900">{formatCurrency(pot.total, false)}</p>
      </div>

      <div className="mb-8">
        <Progress
          value={percentage}
          className="mb-3 h-2 rounded-full"
          color={pot.theme}
          aria-label={`${percentage.toFixed(1)}% of target saved`}
        />
        <div className="flex items-center justify-between text-xs">
          <span
            className="font-bold text-gray-900"
            aria-label={`${percentage.toFixed(1)} percent complete`}
          >
            {percentage.toFixed(1)}%
          </span>
          <span className="text-gray-500">Target of {formatCurrency(pot.target, false)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onAddMoney} className="h-[53px] text-sm font-bold">
          + Add Money
        </Button>
        <Button variant="outline" onClick={onWithdraw} className="h-[53px] text-sm font-bold">
          Withdraw
        </Button>
      </div>
    </Card>
  );
};
