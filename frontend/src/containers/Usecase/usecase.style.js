import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .usecase {
    margin: 10px;
    height: calc(100vh - 95px);
    position: relative;
    border-radius: 10px;
  }
  .title-usecase {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    background-color: ${COLOR.gray[1000]};
    color: black;
    text-transform: capitalize;
  }
  .desc-usecase {
    text-align: center;
    padding: 10px 20px;
    border-radius: none;
  }
  .detail-desc-usecase {
    text-align: left;
  }
  .intent {
    text-align: center;
    padding: 5px 20px;
  }
  .intent-detail {
    text-align: left;
    overflow-y: auto;
  }
  .discussion-container {
    padding: 10px;
  }
  .detail-discussion {
    height: 180px;
  }
  .detail-question {
    height: 180px;
  }
  .intent-detail::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  .intent-detail::-webkit-scrollbar-track::-webkit-scrollbar-track {
    background: ${COLOR.gray[200]};
  }
  /* Handle */
  .intent-detail::-webkit-scrollbar-thumb {
    background: ${COLOR.gray[500]};
  }
  .number-detail {
    display: flex;
    justify-content: space-around;
  }
  .number {
    width: 25px;
    margin-left: 20px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sum-discussion {
    background-color: red;
    color: white;
  }
  .sum-submit {
    background-color: yellow;
    border-radius: 50%;
    color: black;
  }
  .footer-usecase {
    margin: 15px 0;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .button {
    margin-right: 20px;
  }
  .item-question {
    padding: 10px;
  }
`;
