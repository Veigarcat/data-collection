import React from 'react'
import {
  makeStyles,
  Typography,
  TableRow,
  TableCell,
  IconButton,
  TableHead,
  Table,
  Box,
  Collapse,
  TableBody,
  Checkbox
} from '@material-ui/core';
import Controls from "./controls/Controls";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Moment from "moment";
import TableContent from "./TableContent";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
export default function Popup(props) {
  const {row, labelId, index} = props;
  const setSelected = props.setSelected;
  const isItemSelected = props.isItemSelected;
  const [openASR, setOpenASR] = React.useState(false);
  const selected = props.selected;
  const listAudio = props.listAudio;
  const setListAudio = props.setListAudio;
  const classes = useRowStyles();
  const setRecordForEdit = props.setRecordForEdit;
  const setOpenPopup = props.setOpenPopup;


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const deleteItem = async (audioId, index) => {
    console.log(audioId)
    try {
      await axios.delete(
        `${process.env.REACT_APP_ASR_APP}/api/audio/deleteAudio/${audioId}`,
      ).then(res => {
        if (res.data.ok) {
          let array = [...listAudio]; // make a separate copy of the array
          if (index !== -1) {
            array.splice(index, 1);
            setListAudio(array)
            setSelected([])
          }
        }
      })
    } catch (error) {
      alert(error)
    }
  };
  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row._id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row._id}
        className="table-row table-row-bg"
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{'aria-labelledby': labelId}}
          />
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small"
                      onClick={() => setOpenASR(!openASR)}>
            {openASR ? <KeyboardArrowUpIcon/> :
              <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="table-cell"
        >
          {row.duration}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="table-cell"
        >
          {row.username}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="table-cell"
        >
          {row.audioStyle}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="table-cell"
        >
          {Moment(row.createdAt).format('DD/MM/YYYY, HH:mm')}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="table-cell"
        >
          {row.wer}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="table-cell"
          style={{width: "150px"}}
        >
          <TableContent
            audioLink={row.audioLink}
          />
          <Controls.ActionButton
            color="secondary"
            onClick={() => deleteItem(row._id, index)}
            // onClick={handleClickOpen}
          >
            <DeleteIcon fontSize="small"/>
          </Controls.ActionButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={openASR} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Nội dung âm thanh
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="color-black">Nội dung
                      gốc</TableCell>
                    <TableCell align="left" className="color-black">Nội dung
                      tự sinh </TableCell>
                    <TableCell align="left" className="color-black">Nội dung
                      chuẩn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      className="table-cell"
                    >{row.origin_transcript}</TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="table-cell"
                    >{row.bot_transcript}</TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="table-cell"
                    >{row.final_transcript}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
