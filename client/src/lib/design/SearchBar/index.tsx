import React from 'react';
import Styled from '@/lib/design/SearchBar/style';

interface Props {
  color?: 'gray' | 'white';
  size?: 'large' | 'midium' | 'small';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const SearchBar = ({ color, value, size, onChange, onSubmit }: Props) => {
  return (
    <Styled.Form color={color} onSubmit={onSubmit}>
      <Styled.Input value={value} onChange={onChange} inputSize={size} />
      <Styled.Button />
    </Styled.Form>
  );
};

export default SearchBar;
