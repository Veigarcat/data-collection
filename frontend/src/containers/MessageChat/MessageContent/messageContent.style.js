import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

// import { mainColors } from '../../../constants/styleConstant';

export default styled.div`
  .wrapper {
    display: flex;
    flex-grow: 1;
    height: calc(100vh - 199px);
    overflow: auto;
  }
  .list {
    width: 100%;
  }
  .client {
    justify-content: flex-end;
  }
  .bot {
    display: block;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
    max-width: 80%;
  }
  .avatar {
    background-color: #f16a73;
    margin-right: 8px;
    width: 25px;
    height: 25px;
  }
  .avatar-message {
    background-color: #f16a73;
    width: 25px;
    height: 25px;
  }
  .avatarClient {
    margin-left: 8px;
  }
  .avatarBot {
    margin-right: 8px;
  }
  .message-client {
    border-radius: 10px;
    padding: 8px;
    word-break: break-word;
    white-space: pre-line;
    background-color: ${COLOR.gray[200]};
  }
  .message-server {
    border-radius: 10px;
    padding: 8px;
    word-break: break-word;
    white-space: pre-line;
    background-color: #4991e2;
    color: white;
  }
  .media {
    max-width: 100%;
  }
  .option {
    border: 1px dashed #1976d2;
    margin: 2px 0;
    padding: 2;
  }
  .comment {
    margin-top: 5px;
    max-width: 80%;
    margin-left: 25px;
  }
  .input-comment {
    border: 1px solid ${COLOR.gray[200]};
    width: 80%;
    padding-left: 10px;
    border-radius: 10px;
  }
  .text-comment {
    background: none;
    margin-left: 15px;
    color: ${COLOR.yellow[700]};
  }
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .select-button {
    width: 80%;
    margin-top: 10px;
    background: ${COLOR.gray[400]};
  }
  .icon-favorite {
    color: ${COLOR.red[600]};
  }
  .response-right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50px;
    height: 20px;
    margin-left: 20px;
  }
  .icon-unlike {
    color: ${COLOR.red[600]};
  }
  .comment-icon {
    color: ${COLOR.blue[600]};
  }
  /* .list-item-text {
    width: 80%;
  } */
`;
