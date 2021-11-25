import React from 'react';
import S from './style';
import Modal from '@/lib/design/Modal';

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
    <S.Container>
      <Modal
        shouldConfirm={false}
        visible={visible}
        title="새로운 에픽 생성"
        size="LARGE"
        onClose={() => setVisible(false)}
      >
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={value} onChange={handleChange} />
        </form>
      </Modal>
    </S.Container>
  );
};

export default EpicPlaceholder;
