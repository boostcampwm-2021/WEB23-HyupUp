import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

type Styling = {
  [key: string]: FlattenSimpleInterpolation;
};

const SIZES: Styling = {
  small: css`
    --button-font-size: 12px;
    --button-padding: 10px 15px;
  `,
  large: css`
    --button-font-size: 16px;
    --button-padding: 13px 50px;
  `,
};

const VARIANTS: Styling = {
  default: css`
    --button-color: #fafafa;
    --button-bg-color: #255fb5;
    --button-hover-bg-color: #fafafa;
    &:hover {
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

interface LayoutProps {
  variantStyle: FlattenSimpleInterpolation;
  sizeStyle: FlattenSimpleInterpolation;
}

const StyledButton = styled.button<LayoutProps>`
  ${(p) => p.sizeStyle};
  ${(p) => p.variantStyle};
  margin: 0;
  border: none;
  cursor: pointer;

  padding: var(--button-padding);
  border-radius: var(--button-radius, 8px);
  color: var(--button-color, #ffffff);
  background: var(--button-bg-color, #0d6efd);
  font: ${({ theme }) => theme.font.bold_regular};
  font-size: var(--button-font-size, 1rem);
`;

type Props = {
  variant: string;
  size: string;
  children: string;
  disabled?: boolean;
};

const Button = ({ variant, size, children, disabled }: Props) => {
  const variantStyle = VARIANTS[variant];
  const sizeStyle = SIZES[size];

  return (
    <StyledButton variantStyle={variantStyle} sizeStyle={sizeStyle} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
