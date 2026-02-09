import type { Story } from '@ladle/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './Select';

export const Default: Story = () => (
  <Select>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </Select>
);

export const WithGroups: Story = () => (
  <Select>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Vegetables</SelectLabel>
        <SelectItem value="carrot">Carrot</SelectItem>
        <SelectItem value="broccoli">Broccoli</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export const Small: Story = () => (
  <Select>
    <SelectTrigger className="w-[200px]" size="sm">
      <SelectValue placeholder="Small trigger" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="a">Item A</SelectItem>
      <SelectItem value="b">Item B</SelectItem>
    </SelectContent>
  </Select>
);
