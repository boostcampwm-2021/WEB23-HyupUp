import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import SearchBar from '@/lib/design/SearchBar';

interface Props {
  color?: 'gray' | 'white';
  size?: 'large' | 'midium' | 'small';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default {
  title: 'src/lib/design/SearchBar',
  component: SearchBar,
} as Meta;

const Template: Story<Props> = (args) => (
  <SearchBar
    {...args}
    onSubmit={(e) => {
      e.preventDefault();
      action('submitted')(e);
    }}
  />
);

export const DefaultSearchBar = (args: Props) => <Template {...args}></Template>;
