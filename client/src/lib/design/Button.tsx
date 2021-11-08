import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

type Styling = {
  [key: string]: FlattenSimpleInterpolation;
};

const VARIANTS: Styling = {
  default: css`
    --button-color: #fafafa;
    --button-bg-color: #255fb5;
    --button-hover-bg-color: #fafafa;
    &:hover {
      --button-color: #fafafa;
      --button-bg-color: #255fb5;
    }
    &:active {
      --button-color: #255fb5;
      --button-bg-color: #fafafa;
    }
  `,
  confirm: css`
    --button-color: #fafafa;
    --button-bg-color: #f06e69;
  `,
  cancel: css`
    --button-color: #8993a1;
    --button-bg-color: #fafafa;
  `,
};

interface Props {
  variant: string;
  size: string;
  children: string;
  disabled?: boolean;
}
interface LayoutProps {
  variantStyle: FlattenSimpleInterpolation;
  size: string;
}

const StyledButton = styled.button<LayoutProps>`
  ${(props) => props.variantStyle};

  margin: 0;
  border: none;
  cursor: pointer;
  border-radius: 8px;

  padding: ${(props) => (props.size === 'large' ? '13px 50px' : '10px 15px')};
  font: ${({ theme }) => theme.font.bold_regular};
  font-size: ${(props) => (props.size === 'large' ? '16px' : '14px')};

  color: var(--button-color);
  background: var(--button-bg-color);
`;

const Button = ({ variant, size, children, disabled }: Props) => {
  const variantStyle = VARIANTS[variant];
  return (
    <StyledButton size={size} variantStyle={variantStyle} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
