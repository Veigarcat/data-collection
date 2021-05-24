import styled from 'styled-components';

const ChartStyle = styled.div`
  position: relative;

  tspan {
    font-family: 'Poppins', 'Arial', sans-serif;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .placeholder {
    min-height: 400px;
  }

  .loadingChart {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    z-index: 1;
  }

  min-width: 400px;
`;

export default ChartStyle;
