import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Checkbox,
  TablePagination,
  Toolbar,
  InputAdornment, CircularProgress, InputLabel, Select, MenuItem, FormControl,

} from '@material-ui/core';

import {useTranslation} from 'react-i18next';
import AudioListStyle from './audioList.style';

import Controls from "./controls/Controls";
import Popup from "./Popup";
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Search} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Button from "@material-ui/core/Button";

import Row from './Row';
const useStyles = makeStyles(theme => ({
  searchInput: {
    width: '20%'
  },
}))

export default function AudioList({listAudio, setListAudio}) {
  const {t} = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const [openPopup, setOpenPopup] = useState(false)
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const [recordForEdit, setRecordForEdit] = useState(null)
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading,setLoading]= useState(false)

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
  };
  const handleSelectAllClick = (event, audioList) => {
    if (event.target.checked) {
      const newSelecteds = audioList.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const deleteAllItem = async () => {
    const body = {
      listAudioId: selected,
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_ASR_APP}/api/audio/deleteAll`, body
      ).then(res => {
        if (res.data.ok) {
          console.log(res.data)
          let array = [...listAudio];// make a separate copy of the array
          const removedArray = res.data.listAudioId
          removedArray.map(ele => {
            const index = array.findIndex(obj => obj._id = ele)
            array.splice(index, 1)
          })
          setListAudio(array)
          setSelected([])
        }
      })
    } catch (error) {
      alert(error)
    }
  };

  const getAutoTranscript = async () => {
    const array = []
    selected.map(ele => {
      array.push(listAudio.find(x => x._id === ele))
    })
    const body = {
      listAudio: array
    }
    try {
      setLoading(true)
      await axios.post(
        `${process.env.REACT_APP_ASR_APP}/api/getText/getMulAudio`, body
      ).then(async res => {
        if (res.data.ok) {
          const removedArray = res.data.obj
          setListAudio(listAudio.map((item, id) => {
            const matchedEle = removedArray.find(ele => ele.audio_name === item._id);
            console.log(matchedEle)
            if (matchedEle) {
              return {...item, bot_transcript: matchedEle.transcript};
            }
            return item;
          }))
          setSelected([])
        }
      })
        .then(res => setLoading(false))
    } catch (error) {
      alert(error)
    }
  }

  const getWER = async () => {
    const array = []
    selected.map(ele => {
      array.push(listAudio.find(x => x._id === ele))
    })
    const body = {
      listAudio: array
    }
    try {
      setLoading(true)
      await axios.post(
        `${process.env.REACT_APP_ASR_APP}/api/wer`, body
      ).then(res => {
        if (res.data.ok) {
          const listPoint = res.data.listPoint;
          console.log(listPoint)
          setListAudio(listAudio.map((item, id) => {
            const matchedEle = listPoint.find(ele => ele.audioId === item._id);
            console.log(matchedEle)
            if (matchedEle) {
              return {...item, wer: matchedEle.point};
            }
            return item;
          }))
          setSelected([])
        }
      })
        .then(res => setLoading(false))

    } catch (error) {
      alert(error)
    }
  }

  const renderAudioList = (data) => {

    let audioList = [];
    if (searchValue !== "") {
      audioList = data.filter(item => {
        if (item.username.toLowerCase().includes(searchValue.toLowerCase()))
          return item;
        else return null;
      });
    } else audioList = data;
    const rowCount = audioList.length
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="customized table" className="table-asr">
            <TableHead>
              <TableRow className="table-row-header">
                <TableCell padding="checkbox">
                  <Checkbox
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    onChange={(e) => handleSelectAllClick(e, audioList)}
                    inputProps={{'aria-label': 'select all desserts'}}
                  />
                </TableCell>
                <TableCell/>
                <TableCell align="left" className="headerCell">
                  Thời lượng
                </TableCell>
                <TableCell align="left" className="headerCell">
                  Người tải lên
                </TableCell>
                <TableCell align="left" className="headerCell">
                  Loại âm thanh
                </TableCell>
                <TableCell align="left" className="headerCell">
                  Thời gian tải
                </TableCell>
                <TableCell align="left" className="headerCell">
                  Tỉ lệ lỗi từ(%)
                </TableCell>
                <TableCell align="center" className="headerCell">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audioList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <Row key={row._id}
                         row={row}
                         index={index}
                         setSelected={setSelected}
                         isItemSelected={isItemSelected}
                         labelId={labelId} selected={selected}
                         listAudio={listAudio}
                         setListAudio={setListAudio}
                         setRecordForEdit={setRecordForEdit}
                         setOpenPopup={setOpenPopup}
                    />
                  );
                })}
              {audioList.length ===0 && (
                <TableRow>
                  <TableCell align="center" colSpan={3}>{t('noData')}</TableCell>
                </TableRow>
              )}
              {loading &&
              <div className="loader-view">
                <CircularProgress/>
              </div>}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    )
  }

  return (
    <AudioListStyle>
      <>
        <Toolbar>
          <Controls.Input
            label="Search User Upload"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Search/>
              </InputAdornment>)
            }}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
          />
          <FormControl variant="outlined" className="search-information">
            <InputLabel>{t('audioStyle')}</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label={t('scopeCampaign')}
              name="scope"
              // value={search.scope}
              // onChange={onChangeSearch}
            >
              <MenuItem value="total">{t('total')}</MenuItem>
              <MenuItem value="public">Hội Thoại</MenuItem>
              <MenuItem value="private">Dạng đọc</MenuItem>
            </Select>
          </FormControl>
          {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
          {/*  <KeyboardDatePicker*/}
          {/*    disableToolbar variant="inline" inputVariant="outlined"*/}
          {/*    label="Từ ngày"*/}
          {/*    format="dd/MM/yyyy"*/}
          {/*    value={selectedDateFrom}*/}
          {/*    onChange={handleDateChangeFrom}*/}
          {/*    KeyboardButtonProps={{*/}
          {/*      'aria-label': 'change date',*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</MuiPickersUtilsProvider>*/}
          {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
          {/*  <KeyboardDatePicker*/}
          {/*    disableToolbar variant="inline" inputVariant="outlined"*/}
          {/*    label="Đến ngày"*/}
          {/*    format="dd/MM/yyyy"*/}
          {/*    value={selectedDateTo}*/}
          {/*    onChange={handleDateChangeTo}*/}
          {/*    KeyboardButtonProps={{*/}
          {/*      'aria-label': 'change date',*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</MuiPickersUtilsProvider>*/}
        </Toolbar>
        <div className="group-button">
          <Button variant="contained"
                  disabled={selected.length === 0}
                  onClick={getWER}
          >WER</Button>
          <Button variant="contained" color="primary"
                  onClick={getAutoTranscript}
                  disabled={selected.length === 0}>
            Sinh phụ đề tự động
          </Button>
          <Button variant="contained"
                  color="four"
                  startIcon={<DeleteIcon/>}
                  onClick={deleteAllItem}
                  disabled={selected.length === 0}>
            Xóa
          </Button>
        </div>
        {renderAudioList(listAudio)}

        <Popup
          title="Employee Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          {/*<EmployeeForm*/}
          {/*  recordForEdit={recordForEdit}*/}
          {/*  addOrEdit={addOrEdit} />*/}
        </Popup>

      </>
    </AudioListStyle>
  );
}
