import { Meta, Story } from '@storybook/react';
import React from 'react';
import CircleSpinner, { CircleSpinnerProps } from '@/lib/design/Spinner/Circle';

export default {
  title: 'src/lib/design/Spinner/Circle',
  component: CircleSpinner,
  argTypes: {
    radius: {
      control: {
        type: 'number',
      },
      defaultValue: 25,
    },
    duration: {
      control: {
        type: 'number',
      },
      defaultValue: 0.5,
    },
  },
} as Meta;

const Template: Story<CircleSpinnerProps> = (args: CircleSpinnerProps) => (
  <CircleSpinner {...args} />
);

export const Spinner = (args: CircleSpinnerProps) => <Template {...args}></Template>;
