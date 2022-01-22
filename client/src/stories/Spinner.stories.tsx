import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Spinner } from '@/lib/design';

type SpinnerProps = {
  widthLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  heightValue: number;
  colorValue: 'gray' | 'white' | 'blue' | 'red';
};

export default {
  title: 'src/lib/design/Spinner',
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const DefaultSpinner = (args: SpinnerProps) => <Template {...args}></Template>;
