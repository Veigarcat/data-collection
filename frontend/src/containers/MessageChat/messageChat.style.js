import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .message-chat {
    margin: 10px;
    height: calc(100vh - 95px);
    border-radius: 10px;
  }
  .header-chat {
    display: flex;
    align-items: center;
    background-color: ${COLOR.blue[500]};
    height: 50px;
    color: white;
  }
  .user-chat {
    display: flex;
    padding: 10px;
    width: 90%;
    box-shadow: none;
    background-color: ${COLOR.blue[500]};
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .info-user-chat {
    padding: 10px 15px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .input-message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }
  .message-text {
    padding: 10px 20px;
    width: 70%;
  }

  .chat-search {
    padding: 10px;
    width: calc(100% - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid ${COLOR.gray[400]};
  }
  .search {
    position: relative;
    background-color: ${COLOR.gray[400]};
    opacity: 50%;
    border-radius: 20px;
    padding: 5px;
    width: 70%;
  }
  .search-icon {
    padding: 0 10px;
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-search {
    padding-left: 50px;
    width: 80%;
  }
  .message-icon {
    padding: 5px 5px 5px 10px;
  }
`;
