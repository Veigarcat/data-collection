import styled from 'styled-components';
import { COLOR } from '../../../styles/color';
import { mainColors, colorStyleMap } from '../../../themes/styleConstant';

export default styled.div`
  .wrapper {
    display: flex;
    flex-grow: 1;
    height: calc(100vh - 215px);
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
    background-color: ${mainColors.froly};
    color: white;
  }
  .message-server {
    border-radius: 10px;
    padding: 8px;
    word-break: break-word;
    white-space: pre-line;
    background-color: ${colorStyleMap.GRAY.backgroundColor};
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
  .list-item-text {
    display: flex;
    &:hover {
      .response-right {
        opacity: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 10px;
      }
    }
  }
  .MuiListItemText-root {
    max-width: 80%;
  }
  .response-right {
    width: 100px;
    display: flex;
    opacity: 0;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
  }
  .heart-comment-icon {
    height: 20px;
    margin-top: -5px;
    display: flex;
    justify-content: center;
  }
  .parameter__icon {
    cursor: pointer;
    margin-left: 1px;
    &.success {
      color: #4caf50;
    }
    &.heart {
      color: ${mainColors.froly};
    }
    &.review {
      color: ${mainColors.havelockBlue};
    }
  }
`;
