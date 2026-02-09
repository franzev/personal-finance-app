import type { Story } from '@ladle/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './Card';
import { Button } from '@/components';

export const Default: Story = () => (
  <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description goes here.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card content area.</p>
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
);

export const WithAction: Story = () => (
  <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card with an action button.</CardDescription>
      <CardAction>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p>Some content here.</p>
    </CardContent>
  </Card>
);

export const Simple: Story = () => (
  <Card className="w-[350px]">
    <CardContent>
      <p>A simple card with only content.</p>
    </CardContent>
  </Card>
);
