import React from 'react';
import S from './style';

interface EpicPlaceholderProps {
  visible: boolean;
  handleSubmit(epicName: string): void;
}

const EpicPlaceholder = ({ visible, handleSubmit }: EpicPlaceholderProps) => {
  const [value, setValue] = React.useState<string>('');

  const handleEnter = async (ev: React.KeyboardEvent) => {
    if (value === '' || ev.key !== 'Enter') return;
    await handleSubmit(value);
    setValue('');
  };

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  return (
    <S.Container>
      {visible ? (
        <input type="text" value={value} onKeyPress={handleEnter} onChange={handleChange} />
      ) : undefined}
    </S.Container>
  );
};

export default EpicPlaceholder;
