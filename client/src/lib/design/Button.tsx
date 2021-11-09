import React from 'react';
import styled from 'styled-components';

type Category = 'default' | 'confirm' | 'cancel';
type Size = 'small' | 'large';
interface Props {
  category: Category;
  size: Size;
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
interface LayoutProps {
  category: Category;
  size: Size;
}

const StyledButton = styled.button<LayoutProps>`
  margin: 0 auto;
  border-radius: 8px;

  padding: ${(props) => (props.size === 'large' ? '13px 50px' : '10px 15px')};
  font: ${({ theme }) => theme.font.bold_regular};
  font-size: ${(props) =>
    props.size === 'large' ? props.theme.font.bold_regular : props.theme.font.bold_small};

  background-color: ${(props) =>
    props.category === 'default'
      ? props.theme.color.blue400
      : props.category === 'confirm'
      ? props.theme.color.red400
      : props.theme.color.gray100};

  color: ${(props) =>
    props.category === 'cancel' ? props.theme.color.gray300 : props.theme.color.gray100};

  &:hover {
    background-color: ${(props) => (props.category === 'default' ? props.theme.color.blue500 : '')};
  }
  &:active {
    background-color: ${(props) => (props.category === 'default' ? props.theme.color.gray100 : '')};
    color: ${(props) => (props.category === 'default' ? props.theme.color.blue500 : '')};
  }
`;

/**
 * Button Component를 반환하는 함수
 * @param props size, category, onClick, disabled(optional)
 * size 는 Size <small | large>, category 는 Category<default | confirm | cancle>
 * children 은 버튼에 전달될 text, onClick은 부모로부터 전달받을 이벤트 리스너
 * disabled 는 <optinal | undefined>
 * @returns Button Component
 */
const Button = ({ category, size, children, onClick, disabled }: Props) => {
  return (
    <StyledButton size={size} category={category} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
