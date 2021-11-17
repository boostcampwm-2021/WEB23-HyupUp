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
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
`;

const StoryText = styled.span`
  margin-left: 30px;

  font: ${({ theme }) => theme.font.body_medium};
`;

interface IsClick {
  click: boolean;
}

const ToggleImg = styled.img<IsClick>`
  width: 25px;
  height: 25px;

  transform: ${(props) => (props.click ? 'rotate(0deg)' : 'rotate(90deg)')};
  transition-duration: ${(props) => (props.click ? '0.1s' : '0.1s')};
`;

const ToggleButton = styled.button`
  position: relative;
  right: 10px;
`;

const TaskContainer = styled.ul<IsClick>`
  ${({ click }) => (!click ? 'height: 0px; position:absolute;' : undefined)};
  visibility: ${({ click }) => (click ? 'visible' : 'hidden')};
  opacity: ${({ click }) => (click ? '1' : '0')};

  transform: ${({ click }) => (click ? 'translateY(0px)' : 'translateY(-10px)')};
  z-index: ${({ click }) => (click ? '1' : '-1')};
  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
  transition-delay: ${({ click }) => (click ? '0s' : ' 0s, 0s, 0.3s;')};
`;

export default { ItemContainer, StoryText, ToggleImg, ToggleButton, TaskContainer };
