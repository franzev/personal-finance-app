import type { Story } from '@ladle/react';
import { Skeleton } from './Skeleton';

export const Default: Story = () => <Skeleton className="h-4 w-[250px]" />;

export const Circle: Story = () => <Skeleton className="size-12 rounded-full" />;

export const CardSkeleton: Story = () => (
  <div className="flex w-[300px] flex-col gap-3">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

export const ProfileSkeleton: Story = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="size-10 rounded-full" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-3 w-[100px]" />
    </div>
  </div>
);
