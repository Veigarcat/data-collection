import React from 'react';
import { Divider, Typography, Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function TotalUserSayCard({ dataTotalCount }) {
  const { t } = useTranslation();

  return (
    <div className="totalUserSayCard">
      {dataTotalCount &&
        dataTotalCount.map((card, index) => (
          <Card className={`card addonBefore_${index + 1}`}>
            <div className="wrapperCard">
              <div className="countBox countBox-title">
                <div className="title">
                  <Typography variant="h5">{t(card.title)}</Typography>
                </div>
              </div>
              <Divider className="divider" />
              <div className="countBox">
                <Typography variant="h4" className="number">
                  {card.number}
                </Typography>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default TotalUserSayCard;
