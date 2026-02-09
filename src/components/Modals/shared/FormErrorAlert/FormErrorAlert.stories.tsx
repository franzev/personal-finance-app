import type { Story } from '@ladle/react';
import FormErrorAlert from './FormErrorAlert';

export const Default: Story = () => (
  <div className="w-80">
    <FormErrorAlert error="Something went wrong. Please try again." />
  </div>
);

export const NoError: Story = () => (
  <div className="w-80">
    <FormErrorAlert error={null} />
  </div>
);

export const LongError: Story = () => (
  <div className="w-80">
    <FormErrorAlert error="The budget category 'Entertainment' already exists. Please choose a different category or edit the existing budget." />
  </div>
);
