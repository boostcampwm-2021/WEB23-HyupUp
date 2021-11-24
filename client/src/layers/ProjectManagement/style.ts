import styled from 'styled-components';

const Styled = {
  ProjectManagementWrapper: styled.section`
    margin-left: 20px;
  `,
  ProjectList: styled.ul`
    display: flex;
    flex-wrap: wrap;

    width: 950px;
    height: 500px;
    margin-top: 20px;
    padding: 10px 0;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

export default Styled;
