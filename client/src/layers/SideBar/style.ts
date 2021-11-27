import styled from 'styled-components';

const S = {
  Container: styled.section`
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;

    top: 10px;
    width: 173px;
    height: 75vh;
    padding: 24px 16px;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;

    font: ${({ theme }) => theme.font.body_regular};
  `,
  Entry: styled.ul`
    margin-top: 32px;
  `,
  EntryItem: styled.li`
    padding: 12px 0;

    color: ${({ theme }) => theme.color.gray300};
  `,
};

export default S;
