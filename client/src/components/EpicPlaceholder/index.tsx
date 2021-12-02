import React from 'react';
import { checkStringInput } from '@/lib/utils/bytes';
import { toast } from 'react-toastify';
import { errorMessage } from '@/lib/common/message';
import EpicEditModal from '../EpicEditModal';
import { isLatter, isSameDay } from '@/lib/utils/date';

interface EpicPlaceholderProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit(epicName: string, datePair: { startDate: Date; endDate: Date }): void;
}

const EpicPlaceholder = ({ visible, setVisible, handleSubmit }: EpicPlaceholderProps) => {
  const [value, setValue] = React.useState<string>('');

  const handleFormSubmit = (
    ev: React.FormEvent,
    { startDate, endDate }: { startDate: Date; endDate: Date },
  ) => {
    ev.preventDefault();

    if (!checkStringInput(value)) {
      toast.error(errorMessage.EPIC_TITLE_LENGTH_LIMIT);
      return;
    }

    if (isLatter(startDate, endDate) && !isSameDay(startDate, endDate)) {
      toast.error(errorMessage.START_DATE_IS_LATTER);
      return;
    }

    handleSubmit(value, { startDate, endDate });
    setValue('');
  };

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  return (
    <EpicEditModal
      title={'새로운 에픽 생성'}
      showEditModal={visible}
      setShowModal={setVisible}
      epicData={{ id: 0, projectId: 0, name: '', startAt: new Date(), endAt: new Date(), order: 0 }}
      value={value}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default EpicPlaceholder;
