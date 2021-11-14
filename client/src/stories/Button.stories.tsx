import { Meta, Story } from '@storybook/react';
import React from 'react';
import Button from '../lib/design/Button';

type Category = 'default' | 'confirm' | 'cancel';
type Size = 'small' | 'large';
interface ButtonProps {
  category: Category;
  size: Size;
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default {
  title: 'src/lib/design/Button',
  component: Button,
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: ['default', 'confirm', 'cancel'],
      },
      defaultValue: 'default',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
      defaultValue: 'large',
    },
    children: {
      control: 'text',
      defaultValue: 'Click',
    },
    onClick: {
      action: 'clicked',
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const DefaultBtn = (args: ButtonProps) => <Template {...args}></Template>;
