'use client';

import { Button, Card, DeleteConfirmationModal, PotCard, PotFormModal, PotMoneyModal } from '@/components';
import {
  useAddMoneyToPot,
  useCreatePot,
  useDeletePot,
  usePots,
  useUpdatePot,
  useWithdrawFromPot,
} from '@/hooks/useFinanceData';
import { getHexFromThemeName, getThemeNameFromHex } from '@/lib/constants/constants';
import { Pot } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

export default function PotsPage() {
  const { data: pots = [], isLoading } = usePots();

  const createPot = useCreatePot();
  const updatePot = useUpdatePot();
  const deletePot = useDeletePot();
  const addMoneyToPot = useAddMoneyToPot();
  const withdrawFromPot = useWithdrawFromPot();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPot, setEditingPot] = useState<Pot | null>(null);
  const [deletingPot, setDeletingPot] = useState<Pot | null>(null);
  const [addMoneyPot, setAddMoneyPot] = useState<Pot | null>(null);
  const [withdrawPot, setWithdrawPot] = useState<Pot | null>(null);

  const handleAddPot = (data: { name: string; target: number; theme: string }) => {
    createPot.mutate(
      {
        name: data.name,
        target: data.target,
        total: 0,
        theme: getHexFromThemeName(data.theme) || data.theme,
      },
      {
        onSuccess: () => {
          setIsAddModalOpen(false);
        },
      },
    );
  };

  const handleEditPot = (data: { name: string; target: number; theme: string }) => {
    if (!editingPot || !editingPot.id) return;
    updatePot.mutate(
      {
        id: editingPot.id,
        name: data.name,
        target: data.target,
        theme: getHexFromThemeName(data.theme) || data.theme,
      },
      {
        onSuccess: () => {
          setEditingPot(null);
        },
      },
    );
  };

  const handleDeletePot = () => {
    if (!deletingPot || !deletingPot.id) return;
    deletePot.mutate(deletingPot.id, {
      onSuccess: () => {
        setDeletingPot(null);
      },
    });
  };

  const handleAddMoney = (amount: number) => {
    if (!addMoneyPot || !addMoneyPot.id) return;
    addMoneyToPot.mutate(
      { id: addMoneyPot.id, amount },
      {
        onSuccess: () => {
          setAddMoneyPot(null);
        },
      },
    );
  };

  const handleWithdraw = (amount: number) => {
    if (!withdrawPot || !withdrawPot.id) return;
    withdrawFromPot.mutate(
      { id: withdrawPot.id, amount },
      {
        onSuccess: () => {
          setWithdrawPot(null);
        },
      },
    );
  };

  return (
    <div className="bg-[#F8F4F0] p-4 pb-[68px] sm:pb-[90px] md:p-8 md:pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Pots</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add New Pot</Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[200px] animate-pulse rounded-lg bg-gray-200" />
            ))}
          </div>
        ) : pots.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pots.map((pot) => (
              <PotCard
                key={pot.name}
                pot={pot}
                onEdit={() =>
                  setEditingPot({
                    ...pot,
                  })
                }
                onDelete={() => setDeletingPot(pot)}
                onAddMoney={() => setAddMoneyPot(pot)}
                onWithdraw={() => setWithdrawPot(pot)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="mx-auto max-w-md">
              <Image
                src="/assets/images/icon-pot.svg"
                alt="No pots"
                width={64}
                height={64}
                className="mx-auto mb-4 opacity-20"
              />
              <h3 className="mb-2 text-xl font-bold text-gray-900">No pots yet</h3>
              <p className="mb-6 text-gray-600">
                Create your first pot to start saving towards your goals.
              </p>
              <Button onClick={() => setIsAddModalOpen(true)}>+ Add New Pot</Button>
            </div>
          </Card>
        )}

        <PotFormModal
          mode="add"
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSubmit={handleAddPot}
          existingPots={pots.map((p) => ({
            name: p.name,
            theme: getThemeNameFromHex(p.theme) || p.theme,
          }))}
        />

        {editingPot && (
          <PotFormModal
            mode="edit"
            open={!!editingPot}
            onOpenChange={(open) => !open && setEditingPot(null)}
            onSubmit={handleEditPot}
            initialData={{
              name: editingPot.name,
              target: editingPot.target,
              theme: getThemeNameFromHex(editingPot.theme) || editingPot.theme,
            }}
          />
        )}

        {deletingPot && (
          <DeleteConfirmationModal
            open={!!deletingPot}
            onOpenChange={(open) => !open && setDeletingPot(null)}
            onConfirm={handleDeletePot}
            title="Pot"
            itemName={deletingPot.name}
          />
        )}

        {addMoneyPot && (
          <PotMoneyModal
            mode="add"
            open={!!addMoneyPot}
            onOpenChange={(open) => !open && setAddMoneyPot(null)}
            onSubmit={handleAddMoney}
            pot={{
              name: addMoneyPot.name,
              currentAmount: addMoneyPot.total,
              targetAmount: addMoneyPot.target,
              theme: addMoneyPot.theme,
            }}
          />
        )}

        {withdrawPot && (
          <PotMoneyModal
            mode="withdraw"
            open={!!withdrawPot}
            onOpenChange={(open) => !open && setWithdrawPot(null)}
            onSubmit={handleWithdraw}
            pot={{
              name: withdrawPot.name,
              currentAmount: withdrawPot.total,
              targetAmount: withdrawPot.target,
              theme: withdrawPot.theme,
            }}
          />
        )}
      </div>
    </div>
  );
}
