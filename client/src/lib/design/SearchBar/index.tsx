import React from 'react';
import Styled from '@/lib/design/SearchBar/style';

interface Props {
  color?: 'gray' | 'white';
  size?: 'large' | 'midium' | 'small';
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const SearchBar = ({ color, value, size, onChange, onSubmit, placeholder = '' }: Props) => {
  return (
    <Styled.Form inputSize={size} color={color} onSubmit={onSubmit}>
      <Styled.Input value={value} onChange={onChange} placeholder={placeholder} />
      <Styled.Button />
    </Styled.Form>
  );
};

export default SearchBar;
