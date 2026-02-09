import type { Story } from '@ladle/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

export const Default: Story = () => (
  <Alert>
    <AlertTitle>Default Alert</AlertTitle>
    <AlertDescription>This is a default alert message.</AlertDescription>
  </Alert>
);

export const Destructive: Story = () => (
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
  </Alert>
);

export const Success: Story = () => (
  <Alert variant="success">
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>Your changes have been saved.</AlertDescription>
  </Alert>
);

export const AllVariants: Story = () => (
  <div className="flex flex-col gap-4">
    <Alert>
      <AlertTitle>Default</AlertTitle>
      <AlertDescription>Default alert style.</AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertTitle>Destructive</AlertTitle>
      <AlertDescription>Destructive alert style.</AlertDescription>
    </Alert>
    <Alert variant="success">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Success alert style.</AlertDescription>
    </Alert>
  </div>
);
