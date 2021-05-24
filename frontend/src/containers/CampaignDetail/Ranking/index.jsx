import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CardMedia,
  Card,
} from '@material-ui/core';
import RankingStyle from './ranking.style';

const dataRanking = [
  {
    name: 'Hương',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8jLepdbS2kF0i1mh0UTtkYg205HYkG4sOcNmGWbig4l4z046e6koSFTRxLaUSvbeG25E&usqp=CAU',
    score: '10',
  },
  {
    name: 'Lâm',
    avatar:
      'https://i.pinimg.com/736x/e3/41/b3/e341b3ce61dd0d130bd8ab1dd04153d7.jpg',
    score: '10',
  },
];

export default function Ranking() {
  return (
    <RankingStyle>
      <Card className="ranking-campaign-container">
        <Typography
          gutterBottom
          variant="h5"
          component="h6"
          className="title-ranking-campaign"
        >
          Xếp hạng
        </Typography>
        <TableContainer className="table">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow className="table-row-header">
                <TableCell className="color-white" align="center">
                  STT
                </TableCell>
                <TableCell align="center" className="color-white">
                  Họ tên
                </TableCell>
                <TableCell align="center" className="color-white">
                  Điểm số
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRanking &&
                dataRanking.map((data, index) => (
                  <TableRow key={data.id} className="table-row table-row-bg">
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="table-cell"
                      align="center"
                    >
                      <div className="avatar-name">
                        <CardMedia
                          className="image-avatar"
                          component="img"
                          alt={`avatar: ${data.name}`}
                          image={data.avatar}
                          title={`avatar: ${data.name}`}
                        />
                        {data.name}
                      </div>
                    </TableCell>
                    <TableCell align="center">{data.score}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </RankingStyle>
  );
}
