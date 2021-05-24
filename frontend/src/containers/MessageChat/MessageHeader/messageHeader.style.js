import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .header-chat {
    display: flex;
    align-items: center;
    background-color: ${COLOR.blue[500]};
  }
  .user-chat {
    display: flex;
    width: 90%;
    box-shadow: none;
    background-color: ${COLOR.blue[500]};
    align-items: center;
  }
  .info-user-chat-header {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: white;
    text-transform: capitalize;
  }
  .campaign-avatar {
    width: 40px;
    height: 40px;
  }
`;
