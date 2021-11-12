import styled from 'styled-components';

interface StateButtonProps {
  active: boolean;
}

const Styled = {
  Container: styled.header`
    position: absolute;
    display: flex;
    align-items: center;

    width: 695px;
    height: 75px;

    padding: 0 40px;

    border-radius: 8px;
    background-color: white;
  `,

  StateButton: styled.button<StateButtonProps>`
    height: 100%;

    margin-right: 40px;

    border-bottom: ${({ theme, active }) => (active ? '3px solid ' + theme.color.gray400 : 'none')};

    font: ${({ theme }) => theme.font.body_regular};
  `,
};

export default Styled;
