import React from 'react';
import S from './style';

interface EpicPlaceholderProps {
  visible: boolean;
}

const EpicPlaceholder = ({ visible }: EpicPlaceholderProps) => {
  return <S.Container>{visible ? <input type="text" /> : undefined}</S.Container>;
};

export default EpicPlaceholder;
