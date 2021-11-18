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
  display: ${({ click }) => (click ? 'block' : 'none')};
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
`;

export default { ItemContainer, StoryText, ToggleImg, ToggleButton, TaskContainer };
