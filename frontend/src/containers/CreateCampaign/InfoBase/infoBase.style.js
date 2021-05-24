import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .card {
    padding: 1px 0;
  }
  .card-container {
    margin: 20px 10px;
    min-height: 200px;
    width: unset;
    background: ${COLOR.gray[200]};
    border: 0px;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 14%) 0px 1px 4px 0px;
    border-radius: 6px;
    padding: 10px 15px 15px;
  }
  .campaign-container {
    margin: 10px 0;
  }
  .input-name-campaign {
    width: 100%;
    display: flex;
    padding: 8px;
    border: 1px solid ${COLOR.black};
  }
  .date-container {
    display: flex;
    align-items: center;
  }
  .textarea {
    width: 100%;
  }
  .title {
    text-align: left;
    margin: 10px 20px;
  }
  .datetime {
    margin: 0;
  }
  .select {
    width: 40%;
    margin: 20px;
  }
  .type-campaign {
    display: flex;
    align-items: center;
    margin: 20px;
    border-radius: 20px;
  }
  .image {
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
  }
  .fileInput {
    display: none;
  }
  .icon-cloud-upload {
    width: 70px;
    height: 70px;
  }
`;
