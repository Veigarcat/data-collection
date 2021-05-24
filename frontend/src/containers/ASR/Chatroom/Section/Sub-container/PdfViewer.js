import React, {useState} from "react";
import PDF from "react-pdf-js";
import {ZoomInOutlined, ZoomOutOutlined} from "@material-ui/icons";
import {AppBar, Dialog} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const PdfViewer = ({pdf,handleClose, handleClickOpen}) => {

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [scale, setScale] = useState(1);
  const classes = useStyles();

  const onDocumentComplete = (numPages) => {
    setPages(numPages)
  }

  const onDocumentError = (err) => {
    console.error('pdf viewer error:', err);
  }

  const onSetScale = (type) => {

    var newScale = type ? scale + 0.1 : scale - 0.1;

    if (newScale > 2) {
      newScale = 2
    } else if (newScale < 0.1) {
      newScale = 0.1
    }

    setScale(newScale)

  }

  const onPage = (type) => {

    let newPage = type ? page + 1 : page - 1

    if (newPage > pages) {
      newPage = 1
    } else if (newPage < 1) {
      newPage = pages
    }

    setPage(newPage)
  }

  const zoomStyle = {
    marginLeft: 10,
    cursor: 'pointer'
  }

  const footer = <div className="footer-asr">
    <Button onClick={() => onPage(0)}>Trước</Button>
    <div>
      <span style={{textAlign: 'center'}}>Trang {page} của {pages}</span>
      <ZoomOutOutlined style={{...zoomStyle, opacity: scale === 0.1 ? 0.5 : 1}} onClick={() => onSetScale(0)}/>
      <ZoomInOutlined style={{...zoomStyle, opacity: scale === 0.1 ? 0.5 : 1}} onClick={() => onSetScale(1)}/>
      <span>{Math.round(scale * 100)}%</span>
    </div>
    <Button onClick={() => onPage(1)}>Tiếp</Button>
  </div>


  return (

    <>
      <Dialog fullScreen open={handleClickOpen} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}
                        aria-label="close">
              <CloseIcon/>
            </IconButton>

          </Toolbar>
        </AppBar>
        <div className="pdfWrapper">
          <PDF
            file={pdf}
            onDocumentComplete={onDocumentComplete}
            onDocumentError={onDocumentError}
            page={page}
            scale={scale}
          />
        </div>
        {footer}
      </Dialog>
    </>


  )

};
export default PdfViewer;
