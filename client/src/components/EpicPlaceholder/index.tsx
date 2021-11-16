import React from 'react';
import S from './style';

interface EpicPlaceholderProps {
  visible: boolean;
  handleSubmit(epicName: string): void;
}

const EpicPlaceholder = ({ visible, handleSubmit }: EpicPlaceholderProps) => {
  const [value, setValue] = React.useState<string>('');

  const handleFormSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    await handleSubmit(value);
    setValue('');
  };

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  return (
    <S.Container>
      <form onSubmit={handleFormSubmit}>
        {visible ? <input type="text" value={value} onChange={handleChange} /> : undefined}
      </form>
    </S.Container>
  );
};

export default EpicPlaceholder;
