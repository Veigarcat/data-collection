import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import CampaignListStyle from './campaignList.style';
import {
  fetchDeleteCampaign,
  filterCampaign,
} from '../../../redux/campaign/actions';
import { apiChangeStatusCampaign } from '../../../apis/campaign';
import InputConfirmDialog from '../../../components/Dialog/inputConfirmDialog';

const convertCollectType = (collectType) => {
  switch (collectType) {
    case 'intent':
      return 'Ý định';
    case 'usecase':
      return 'Kịch bản';
    case 'free':
      return 'Tự do';
    case 'topic':
      return 'Topic';
    default:
      return 'Chưa có dữ liệu';
  }
};
const convertMessageObject = (messageObject) => {
  switch (messageObject) {
    case 'bot':
      return 'Bot';
    case 'human':
      return 'Người';
    default:
      return 'Chưa có dữ liệu';
  }
};
const convertMessageType = (messageType) => {
  switch (messageType) {
    case 'msg_text':
      return (
        <Tooltip title="Tin nhắn văn bản">
          <TextFieldsIcon />
        </Tooltip>
      );
    case 'msg_voice':
      return (
        <Tooltip title="Tin nhắn giọng nói">
          <VolumeDownIcon />
        </Tooltip>
      );
    default:
      return 'Chưa có dữ liệu';
  }
};

export default function CampaignList({
  listCampaign,
  isLoadingListCampaign,
  history,
  search,
  limitPage,
  page,
  setPage,
}) {
  const [idDelete, setIdDelete] = useState(null);
  const [idChangeStatus, setIdChangeStatus] = useState(null);
  const [titleDialog, setTitleDialog] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState();
  const [menuState, setMenuState] = useState([]);
  const handleRequestCloseMenu = (index) => () => {
    const newArr = [...menuState];
    newArr[index] = false;
    setMenuState(newArr);
  };
  const onContactOptionSelect = (index) => (e) => {
    const newArr = [...menuState];
    newArr[index] = true;
    setMenuState(newArr);
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    if (listCampaign) {
      const newArr = [];
      for (let i = 0; i < listCampaign.length; i += 1) {
        newArr.push(false);
      }
      setMenuState(newArr);
    }
  }, [listCampaign]);

  const handleClickOpenDelete = (id) => {
    setIdDelete(id);
  };
  const handleClickOpenChangeStatus = ({ campaignId, status }) => {
    setIdChangeStatus(campaignId);
    setChangeStatus(status);
  };
  const handleCampaignDelete = async () => {
    dispatch(fetchDeleteCampaign({ campaignId: idDelete }));
    setPage(1);
    setIdDelete(null);
  };
  const handleStatusChange = ({ campaignId, status }) => {
    apiChangeStatusCampaign({ campaignId, status })
      .then((res) => {
        if (res.status === 1) {
          dispatch(
            filterCampaign({
              ...search,
              page,
              records: limitPage,
            }),
          );
        }
      })
      .catch((error) => console.log(error));
    setChangeStatus(null);
  };
  // convert status
  const convertStatus = ({ campaignId, status }) => {
    switch (status) {
      case 'waiting':
        return (
          <div className="status-wrapper">
            <div className="status-button">
              <Tooltip title="Nhấn để bắt đầu">
                <IconButton
                  onClick={() => {
                    handleClickOpenChangeStatus({
                      campaignId,
                      status: 'running',
                    });
                    setTitleDialog('bắt đầu');
                  }}
                >
                  <PlayCircleFilledWhiteIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      case 'running':
        return (
          <div className="status-wrapper">
            <div className="status-button">
              <Tooltip title="Nhấn đề tạm dừng chiến dịch">
                <IconButton
                  onClick={() => {
                    handleClickOpenChangeStatus({
                      campaignId,
                      status: 'pause',
                    });
                    setTitleDialog('tạm dừng');
                  }}
                >
                  <PauseIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Nhấn kết thúc chiến dịch">
                <IconButton
                  onClick={() => {
                    handleClickOpenChangeStatus({
                      campaignId,
                      status: 'stop',
                    });
                    setTitleDialog('kết thúc');
                  }}
                >
                  <StopIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      case 'pause':
        return (
          <div className="status-wrapper">
            <div className="status-button">
              <Tooltip title="Nhấn để tiếp tục chiến dịch">
                <IconButton
                  onClick={() => {
                    handleClickOpenChangeStatus({
                      campaignId,
                      status: 'running',
                    });
                    setTitleDialog('tiếp tục');
                  }}
                >
                  <PlayArrowIcon className="color-yellow" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Nhấn để kết thúc chiến dịch">
                <IconButton
                  onClick={() => {
                    handleClickOpenChangeStatus({
                      campaignId,
                      status: 'stop',
                    });
                    setTitleDialog('kết thúc');
                  }}
                >
                  <StopIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      case 'stop':
        return (
          <div className="status-wrapper">
            <Typography color="secondary">{t('finished')}</Typography>
          </div>
        );
      default:
        return 'Chưa có dữ liệu';
    }
  };
  const tableTitle = [
    'STT',
    'campaignName',
    'time',
    'collectType',
    'messageObject',
    'messageType',
    'scope',
    'numberParticipant',
    'status',
  ];
  return (
    <CampaignListStyle>
      <>
        <Table aria-label="customized table" className="table">
          <TableHead>
            <TableRow>
              {tableTitle &&
                tableTitle.map((item) => (
                  <TableCell
                    key={item}
                    align="left"
                    variant="head"
                    className="headerCell"
                  >
                    <div className="cellContent">{t(item)}</div>
                  </TableCell>
                ))}
              <TableCell className="headerCell" />
            </TableRow>
          </TableHead>
          <TableBody>
            {listCampaign &&
              listCampaign.map((campaign, index) => (
                <TableRow key={campaign.id}>
                  <TableCell align="center" className="cellBody">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" className="cellBody">
                    {campaign.name}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    <Tooltip
                      title={`${Moment(campaign.timeStart).format(
                        'HH:mm DD/MM/YYYY',
                      )} - ${Moment(campaign.timeEnd).format(
                        'HH:mm DD/MM/YYYY',
                      )}`}
                    >
                      <Typography>
                        {Moment(campaign.timeStart).format('DD/MM')} -{' '}
                        {Moment(campaign.timeEnd).format('DD/MM')}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {convertCollectType(campaign.collectType)}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {convertMessageObject(campaign.messageObject)}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {convertMessageType(campaign.messageType)}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {campaign.scope}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {campaign.participant.length}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {convertStatus({
                      campaignId: campaign.id,
                      status: campaign.status,
                    })}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={onContactOptionSelect(index)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={menuState[index] || false}
                    onClose={handleRequestCloseMenu(index)}
                  >
                    <MenuItem
                      onClick={() => {
                        history.push(`/campaign-view/${campaign.id}/view`);
                      }}
                    >
                      Xem chi tiết
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        history.push(`/campaign/${campaign.id}/edit/step-1`);
                      }}
                    >
                      Chỉnh sửa chiến dịch
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickOpenDelete(campaign.id)}
                    >
                      Xóa chiến dịch
                    </MenuItem>
                    <MenuItem onClick={handleRequestCloseMenu(index)}>
                      Thống kê
                    </MenuItem>
                  </Menu>
                </TableRow>
              ))}
            {listCampaign.length === 0 && !isLoadingListCampaign && (
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  {t('noData')}
                </TableCell>
              </TableRow>
            )}
            {isLoadingListCampaign && (
              <div className="loader-view">
                <CircularProgress />
              </div>
            )}
          </TableBody>
        </Table>
        {idDelete && (
          <InputConfirmDialog
            open={idDelete !== null}
            handleClose={() => setIdDelete(null)}
            title="Xác nhận xóa chiến dịch?"
            buttonText={t('delete')}
            onClick={handleCampaignDelete}
            validInput="DELETE"
          />
        )}
        {changeStatus && (
          <InputConfirmDialog
            open={changeStatus !== null}
            handleClose={() => setChangeStatus(null)}
            title={`Xác nhận ${titleDialog} chiến dịch?`}
            buttonText="Xác nhận"
            onClick={() =>
              handleStatusChange({
                campaignId: idChangeStatus,
                status: changeStatus,
              })
            }
          />
        )}
      </>
    </CampaignListStyle>
  );
}
