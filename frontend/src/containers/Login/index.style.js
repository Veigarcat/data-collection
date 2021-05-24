import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .container {
    margin-top: 140px;
    box-shadow: 10px 10px 5px ${COLOR.gray[200]};
  }
  .bg-image {
    background-image: url('https://www.pngitem.com/pimgs/m/65-657631_transparent-virtual-assistant-png-chatbot-png-download.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .grid-form {
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  .button-submit {
    margin: 20px 0;
  }
  .input-errors {
    display: none;
  }
  .text-errors {
    color: red;
    margin: 0px;
  }
`;
