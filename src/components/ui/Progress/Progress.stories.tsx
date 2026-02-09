import type { Story } from '@ladle/react';
import { Progress } from './Progress';

export const Default: Story = () => <Progress value={50} />;

export const Empty: Story = () => <Progress value={0} />;

export const Full: Story = () => <Progress value={100} />;

export const CustomColor: Story = () => <Progress value={70} color="#277C78" />;

export const AllStates: Story = () => (
  <div className="flex w-64 flex-col gap-4">
    <div>
      <p className="mb-1 text-sm">0%</p>
      <Progress value={0} />
    </div>
    <div>
      <p className="mb-1 text-sm">25%</p>
      <Progress value={25} />
    </div>
    <div>
      <p className="mb-1 text-sm">50%</p>
      <Progress value={50} />
    </div>
    <div>
      <p className="mb-1 text-sm">75%</p>
      <Progress value={75} color="#277C78" />
    </div>
    <div>
      <p className="mb-1 text-sm">100%</p>
      <Progress value={100} color="#82C9D7" />
    </div>
  </div>
);
