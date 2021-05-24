import styled from 'styled-components';
// import { COLOR } from '../../../styles/color';
import { mainColors } from '../../../themes/styleConstant';

export default styled.div`
  .message-input-container {
    display: flex;
    align-items: center;
  }
  .icon-wrap {
    width: 10%;
    text-align: center;
  }
  .parameter__icon {
    cursor: pointer;
    &.end-chat {
      color: ${mainColors.froly};
    }
  }
  .MuiOutlinedInput-multiline {
    padding: 14px;
  }
  .MuiFormControl-root {
    width: 80%;
  }
`;
