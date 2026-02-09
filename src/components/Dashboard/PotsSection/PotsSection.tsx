import Image from 'next/image';
import { Card, Skeleton } from '@/components';
import { SectionHeader } from '../SectionHeader';
import { PotItem } from '../PotItem';
import type { Pot } from '@/lib/types';

interface PotsSectionProps {
  pots: Pot[];
  isLoading: boolean;
}

export function PotsSection({ pots, isLoading }: PotsSectionProps) {
  if (isLoading) {
    return (
      <Card className="p-8">
        <SectionHeader title="Pots" href="/pots" linkText="See Details" />
        <div className="flex flex-col items-start gap-5 lg:flex-row">
          <Skeleton className="h-[100px] w-full lg:flex-1" />
          <div className="grid w-full grid-cols-2 gap-4 lg:flex-1">
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[50px]" />
          </div>
        </div>
      </Card>
    );
  }

  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);
  const displayPots = pots.slice(0, 4);

  return (
    <Card className="p-8">
      <SectionHeader title="Pots" href="/pots" linkText="See Details" />

      <div className="flex flex-col items-start gap-5 lg:flex-row">
        <div className="flex w-full items-center gap-4 rounded-xl bg-[#F8F4F0] p-5 lg:flex-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <Image src="/assets/images/icon-pot.svg" alt="Pot" width={20} height={20} />
          </div>
          <div>
            <p className="mb-1 text-sm text-[#696868]">Total Saved</p>
            <p className="text-[32px] leading-[1.2] font-bold text-[#201F24]">
              ${totalSaved.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex-1">
          {displayPots.map((pot, index) => (
            <PotItem key={index} label={pot.name} amount={pot.total} color={pot.theme} />
          ))}
        </div>
      </div>
    </Card>
  );
}
