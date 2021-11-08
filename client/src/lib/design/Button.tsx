import React from 'react';

type Props = {
  border: string;
  color: string;
  height: string;
  width: string;
  radius: string;
  onClick: () => void;
  children?: React.ReactNode;
};

const Button = ({ border, color, height, width, radius, onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
