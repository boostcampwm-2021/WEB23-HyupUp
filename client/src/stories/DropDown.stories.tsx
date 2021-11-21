import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DropDown } from '@/lib/design';

interface IncludeId {
  id: number;
  name: string;
}

interface DropDownProps {
  Title: React.ReactNode;
  list: Array<IncludeId>;
  font?: string;
  handleClick: (e: React.MouseEvent) => void;
}

export default {
  title: 'src/lib/design/DropDown',
  component: DropDown,
  argTypes: {
    Title: {
      control: 'text',
      defaultValue: 'dropdown',
    },
    list: {
      control: 'array',
      defaultValue: [{ id: 1, name: 'first' }],
    },
    handleClick: {
      action: 'clicked',
    },
  },
} as Meta;

const Template: Story<DropDownProps> = (args: DropDownProps) => <DropDown {...args} />;

export const DefalutDropDown = (args: DropDownProps) => <Template {...args}></Template>;
