import styled from 'styled-components';

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

const Title = styled.span`
  font: ${({ theme }) => theme.font.bold_medium};
  color: ${({ theme }) => theme.color.gray400};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  width: 310px;
  height: 35px;
  margin-bottom: 20px;
`;

export { Icon, Title, TitleContainer };
