import styled from 'styled-components';

export default styled.div`
  .campaign-container {
    margin: 10px 0;
  }
  .input-name-campaign {
    width: 100%;
    display: flex;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
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
  .editor {
    border: 1px solid rgba(0, 0, 0, 0.12);
    font-size: 18px;
  }
`;
