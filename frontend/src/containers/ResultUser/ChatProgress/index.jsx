// import React from 'react';

// import { Typography, Card } from '@material-ui/core';

// import { useTranslation } from 'react-i18next';
// import ChatProgressStyle from './chatProgress,style';

// export default function ChatProgress() {
//   const { t } = useTranslation();

//   return (
//     <ChatProgressStyle>
//       <div className="chart-statistical">
//         <Typography
//           gutterBottom
//           variant="h6"
//           component="h5"
//           className="title-general-information"
//         >
//           {t('generalInformation')}
//         </Typography>
//       </div>
//     </ChatProgressStyle>
//   );
// }

import { Line } from 'react-chartjs-2';
import React from 'react';
import ChatProgressStyle from './chatProgress.style';

const options = {
  title: {
    display: true,
    text: 'Biểu đồ thống kê kết quả chat hằng ngày',
  },
  legend: {
    display: true,
    position: 'top',
  },
};

const info = {
  chartData: {
    labels: [
      '23 / 2 / 2020',
      '24 / 2 / 2020',
      '25 / 2 / 2020',
      '26 / 2 / 2020',
      '27 / 2 / 2020',
    ],
    datasets: [
      {
        data: [6, 3, 2, 2, 7],
        label: 'Tổng câu chat',
        borderColor: '#c45850',
        fill: false,
      },
    ],
  },
};
const StockChart = () => {
  return (
    <ChatProgressStyle>
      <div className="chart-container">
        <Line data={info.chartData} options={options} />
      </div>
    </ChatProgressStyle>
  );
};

export default StockChart;
