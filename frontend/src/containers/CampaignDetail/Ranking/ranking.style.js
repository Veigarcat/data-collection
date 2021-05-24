import styled from 'styled-components';
// import { COLOR } from '../../styles/color';

export default styled.div`
  .ranking-campaign-container {
    padding: 10px;
    box-shadow: none;
    border-radius: 10px;
    height: 100vh;
  }
  .title-ranking-campaign {
    text-align: center;
  }
  .avatar-name {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-avatar {
    border-radius: 50%;
    width: 10%;
    margin-right: 10px;
  }
  .table {
    overflow: auto;
    height: 450px;
  }
`;
