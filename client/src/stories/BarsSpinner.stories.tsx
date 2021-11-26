import { Meta, Story } from '@storybook/react';
import React from 'react';
import BarsSpinner, { BarsSpinnerProps } from '@/lib/design/Spinner/Bars';

export default {
  title: 'src/lib/design/Spinner/Bars',
  component: BarsSpinner,
  argTypes: {
    duration: {
      control: {
        type: 'number',
      },
      defaultValue: 1,
    },
  },
} as Meta;

const Template: Story<BarsSpinnerProps> = (args: BarsSpinnerProps) => <BarsSpinner {...args} />;

export const Spinner = (args: BarsSpinnerProps) => <Template {...args}></Template>;
