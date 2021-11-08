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
  font-size: ${(props) => (props.size === 'large' ? '16px' : '14px')};

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
  }
  &:active {
    color: ${(props) => (props.category === 'default' ? props.theme.color.blue500 : '')};
  }
`;

/**
 * category : default | confirm | cancel
 * size : small | large
 * onClick : 전달하고자하는 함수
 * disabled : optional 로 전달
 */

const Button = ({ category, size, children, disabled, onClick }: Props) => {
  return (
    <StyledButton size={size} category={category} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
