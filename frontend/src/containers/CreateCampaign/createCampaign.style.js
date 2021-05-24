import styled from 'styled-components';
import { FEATURE_COLORS } from '../../themes/configs';
import { mainColors } from '../../themes/styleConstant';

export default styled.div`
  .campaign-create-container {
    min-height: 500px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
  }
  .headTitle {
    text-transform: uppercase;
  }
  .headButtons {
    display: flex;
    justify-content: flex-end;
  }

  .create-campaign-container {
    flex-grow: 1;
    margin: 10px;
    padding-top: 1px;
  }
  .title-page {
    margin-top: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .type-campaign {
    width: 60%;
  }
  .select-container {
    width: 100%;
  }
  .select-item {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .form-control-select {
    width: 100%;
  }
  .select-component {
    width: 100%;
  }
  .error {
    color: red;
  }
  .icon {
    cursor: pointer;
  }
  .select-component-item {
    padding-right: 24px;
    height: auto;
    overflow: hidden;
    min-height: 1.1876em;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    min-width: 16px;
    user-select: none;
    border-radius: 0;
    padding: 6px 0 7px;
    animation-duration: 10ms;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  .input-errors {
    display: none;
  }
  .text-errors {
    color: red;
    margin: 0px;
  }
  .button {
    margin-left: 20px;
  }
  .button-edit {
    margin-left: 20px;
    background-color: ${mainColors.havelockBlue};
  }
  .button-delete {
    margin-left: 10px;
    background-color: ${mainColors.froly};
  }
  .container-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .button-step-container {
    width: 80%;
    margin: 10px auto;
    display: flex;
    justify-content: flex-end;
  }
  .card {
    color: rgba(0, 0, 0, 0.87);
    border: 0;
    word-wrap: break-word;
    font-size: 0.875rem;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    border-radius: 6px;
    padding: 10px 15px 15px 15px;
    overflow: visible;
    margin-top: 25px;
  }
  .cardHeader {
    padding: 8px 20px 8px 10px;
    margin-top: -20px;
    border-radius: 3px;
    background-color: ${mainColors.havelockBlue};
    color: #fff;
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    .header {
      align-items: center;
      display: flex;
      width: 100%;
    }
  }
  .buttonIcon {
    padding: 10px 30px;
    margin: 0px 10px;
    transition: 0.2s background-color 0.1s;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .headerText {
    margin: 0;
    line-height: 30px;
    flex: 1;
    color: #fff;
    padding: 0 15px;
  }
  .cardBody {
    flex: 1 1 auto;
    padding: 15px 15px 0px 15px;
    position: relative;
    -webkit-box-flex: 1;
  }
  .divider {
    background-color: ${FEATURE_COLORS.divider};
    margin: 0px -15px;
  }
`;
