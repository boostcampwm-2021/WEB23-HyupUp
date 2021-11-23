import styled from 'styled-components';

const getIdColor = (id: number): string => {
  return ('#' + Math.round(((id % 100) / 100) * 0xffffff).toString(16)).padEnd(7, '0');
};
const Styled = {
  CardWrapper: styled.li`
    width: 300px;
    height: 200px;
    margin: 5px 0 5px 12px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.white};

    box-shadow: ${({ theme }) => theme.shadow};
  `,
  CardHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 50px;
    padding: 20px;
    h3 {
      font: ${({ theme }) => theme.font.bold_regular};
    }
  `,
  CardImage: styled.div<{ projectId: number }>`
    height: 150px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background: ${({ projectId }) =>
      `linear-gradient(45deg, ${getIdColor(projectId)}, ${getIdColor(projectId + 77)})`};
  `,
};

export default Styled;
