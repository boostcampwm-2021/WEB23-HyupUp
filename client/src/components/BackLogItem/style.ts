import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 705px;
  height: 70px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 8px;
`;

const StoryText = styled.span`
  font: ${({ theme }) => theme.font.body_medium};
`;

interface IsClick {
  check: boolean;
}

const ToggleImg = styled.img<IsClick>`
  width: 25px;
  height: 25px;

  transform: ${(props) => (props.check ? 'rotate(0deg)' : 'rotate(90deg)')};
  transition-duration: ${(props) => (props.check ? '0.1s' : '0.1s')};
`;

const ToggleButton = styled.button`
  position: relative;
  right: 10px;
`;

export default { ItemContainer, StoryText, ToggleImg, ToggleButton };
