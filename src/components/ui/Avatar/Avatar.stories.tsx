import type { Story } from '@ladle/react';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

export const WithImage: Story = () => (
  <Avatar>
    <AvatarImage src="https://i.pravatar.cc/32" alt="User" />
    <AvatarFallback>U</AvatarFallback>
  </Avatar>
);

export const WithFallback: Story = () => (
  <Avatar>
    <AvatarImage src="/broken-url.jpg" alt="User" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
);

export const Sizes: Story = () => (
  <div className="flex items-center gap-4">
    <Avatar className="size-6">
      <AvatarFallback className="text-xs">S</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>M</AvatarFallback>
    </Avatar>
    <Avatar className="size-12">
      <AvatarFallback>L</AvatarFallback>
    </Avatar>
    <Avatar className="size-16">
      <AvatarFallback>XL</AvatarFallback>
    </Avatar>
  </div>
);
