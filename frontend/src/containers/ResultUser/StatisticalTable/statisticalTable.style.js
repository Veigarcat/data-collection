import styled from 'styled-components';
import { COLOR } from '../../../styles/color';
import { FEATURE_COLORS } from '../../../themes/configs';

export default styled.div`
  .container {
    flex-direction: column;
    padding: 10px;
    margin-top: 20px;
    background-color: ${FEATURE_COLORS.bgIconHeader};
  }
  .table {
    margin-top: 20px;
  }
  .table-header {
    background-color: ${COLOR.green[200]};
  }
  .table-row {
    background-color: ${COLOR.pink[[100]]};
  }
  .table-row-sole {
    background-color: ${COLOR.gray[200]};
  }
  .table-pagination {
    background-color: ${COLOR.pink[100]};
  }
  .icon {
    cursor: pointer;
  }
`;
