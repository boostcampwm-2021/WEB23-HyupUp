import React from 'react';
import S from './style';
import { Button, Modal } from '@/lib/design';

interface EpicPlaceholderProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit(epicName: string): void;
}

const EpicPlaceholder = ({ visible, setVisible, handleSubmit }: EpicPlaceholderProps) => {
  const [value, setValue] = React.useState<string>('');

  const handleFormSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    handleSubmit(value);
    setValue('');
  };

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  return (
    <Modal
      shouldConfirm={false}
      visible={visible}
      title="새로운 에픽 생성"
      size="SMALL"
      onClose={() => setVisible(false)}
    >
      <S.Container onSubmit={handleFormSubmit}>
        <S.Input
          type="text"
          placeholder="에픽 제목을 입력하세요"
          value={value}
          onChange={handleChange}
        />
        <Button category="default" size="small" onClick={handleFormSubmit}>
          OK
        </Button>
      </S.Container>
    </Modal>
  );
};

export default EpicPlaceholder;
