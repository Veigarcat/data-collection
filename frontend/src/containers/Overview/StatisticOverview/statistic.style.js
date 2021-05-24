import styled from 'styled-components';

const StyledStatistic = styled.div`
  .timeStatistic {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .text {
    flex-grow: 1;
    text-transform: uppercase;
  }

  .timeBox {
    margin-right: 10px;
    border-radius: 10px;

    &:hover,
    &.selected {
      background-color: #000034;
      color: #ffffff;
    }
  }

  .totalUserSayCard {
    display: grid;
    @media only screen and (min-width: 1135px) {
      grid-template-columns: repeat(auto-fit, minmax(19%, 1fr));
    }
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
  }

  .infoIcon {
    margin-left: 4px;
  }

  .addonBefore_1 {
    border-color: ${(props) => props.mainColors.havelockBlue};
  }

  .addonBefore_2 {
    border-color: ${(props) => props.mainColors.oceanGreen};
  }

  .addonBefore_3 {
    border-color: ${(props) => props.mainColors.froly};
  }

  .addonBefore_4 {
    border-color: ${(props) => props.mainColors.buttercup};
  }

  .addonBefore_5 {
    border-color: ${(props) => props.mainColors.mediumPurple};
  }
  .addonBefore_6 {
    border-color: ${(props) => props.mainColors.mediumPurple};
  }
  .addonBefore_7 {
    border-color: ${(props) => props.mainColors.mediumPurple};
  }
  .addonBefore_8 {
    border-color: ${(props) => props.mainColors.mediumPurple};
  }
  .addonBefore_9 {
    border-color: ${(props) => props.mainColors.mediumPurple};
  }
  .addonBefore_10 {
    border-color: ${(props) => props.mainColors.mediumPurple};
  }

  .countBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    flex-grow: 1;
    padding: 10px;
  }
  .countBox-title {
    min-height: 84px;
  }

  .divider {
    margin: 0px 20px;
  }

  .number {
    font-weight: bold;
  }

  .chartUserSays {
    margin-top: 20px;
  }

  .topUserSays {
    margin-top: 20px;
  }

  .scriptFromLog {
    margin-top: 20px;

    .wrapper {
      padding: 20px;
      height: 100%;
    }
    .counter {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      padding-top: 5px;
    }
  }
`;

export default StyledStatistic;
