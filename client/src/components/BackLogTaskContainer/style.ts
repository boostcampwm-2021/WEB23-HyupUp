import styled from 'styled-components';

const Styled = {
  TaskContainer: styled.ul`
    animation-duration: 0.3s;
    animation-name: slidein;
    @keyframes slidein {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }

      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  `,
  UndefinedItemContainer: styled.ul`
    width: 705px;
    height: 70px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.color.gray200};
  `,

  UndefinedText: styled.span`
    font: ${({ theme }) => theme.font.body_regular};
  `,
};

export default Styled;
