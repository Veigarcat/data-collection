import styled from 'styled-components';
import { mainColors } from '../../themes/styleConstant';

export default styled.div`
  .title-result-user {
    text-align: center;
    text-transform: uppercase;
  }
  .container-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 16px;
    margin-top: 10px;
  }
  .card {
    border-top: 10px solid;
  }

  .wrapperCard {
    display: flex;
    flex-direction: column;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70px;
  }

  .infoIcon {
    margin-left: 4px;
  }

  .addonBefore_1 {
    border-color: ${mainColors.havelockBlue};
  }

  .addonBefore_2 {
    border-color: ${mainColors.oceanGreen};
  }

  .addonBefore_3 {
    border-color: ${mainColors.froly};
  }

  .addonBefore_4 {
    border-color: ${mainColors.buttercup};
  }

  .addonBefore_5 {
    border-color: ${mainColors.mediumPurple};
  }

  .addonBefore_6 {
    border-color: ${mainColors.darkBlue};
  }
  .addonBefore_7 {
    border-color: ${mainColors.blurDark};
  }
  .addonBefore_8 {
    border-color: ${mainColors.orange};
  }

  .countBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    flex-grow: 1;
    padding: 10px;
  }

  .divider {
    margin: 0px 20px;
  }
  .chart-progress {
    margin-top: 20px;
    background-color: #fff;
  }
`;
