import React from 'react';
import S from './style';
import { Button, Modal } from '@/lib/design';
import { checkStringInput } from '@/lib/utils/bytes';
import { toast } from 'react-toastify';
import { errorMessage } from '@/lib/common/message';

interface EpicPlaceholderProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit(epicName: string): void;
}

const EpicPlaceholder = ({ visible, setVisible, handleSubmit }: EpicPlaceholderProps) => {
  const [value, setValue] = React.useState<string>('');

  const handleFormSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!checkStringInput(value)) {
      toast.error(errorMessage.EPIC_TITLE_LENGTH_LIMIT);
      return;
    }
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
          placeholder="에픽 제목을 입력하세요 (255자 이내)"
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
