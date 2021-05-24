import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .navigation {
    padding: 5px 20px;
    background: ${COLOR.pink[100]};
    z-index: 1000000;
    margin-top: 20px;
  }
  .link-navigation {
    text-decoration: none;
    text-transform: uppercase;
  }
  .link {
    cursor: pointer;
  }
`;
