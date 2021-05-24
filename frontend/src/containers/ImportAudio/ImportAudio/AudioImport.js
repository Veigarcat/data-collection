import React, {useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import './AudioImport.css';
import axios from "axios";
import {
  CircularProgress,
  Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination,
  TableRow
} from "@material-ui/core";
import {CSVLink} from 'react-csv';

import TableContent from "../../AudioManage/AudioList/TableContent";

import {useTranslation} from "react-i18next";
import {getCookie} from "../../../utils/cookie";

export default function AudioImport() {

  const {t} = useTranslation();

  const [fileWav, setFileWav] = useState({})
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false);
  const USER_SERVER = `${process.env.REACT_APP_ASR_APP}/api/users`;

  const [user, setUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowCount = fileList.length;
  const onDrop = (files) => {
    if (files && files.length > 0) {
      // console.log(files[0].name)
      setFileWav(files[0]);
    }
  }
  const csvData = [
    ['path', 'transcript', 'audio_name', 'speaker_id', 'speaker_name', 'speaker_accent',
      'speaker_gender', 'speaker_age', 'duration', 'content', 'style', 'type', 'device', 'Hướng dẫn'],
    ['đường dẫn đến folder chứa audio', 'nội dung của tệp âm thanh - 16000 sample rate - mono - wav'
      , 'Tên audio', 'mã định danh người nói', 'tên người nói', 'Giọng vùng miền', 'giới tính',
      'độ tuổi', 'thời lượng', 'có 3 loại(multi-domain,indomain(bank, fintech)', 'Kiểu tệp âm thanh(conversation, read)'
      , 'Loại tệp âm thanh(news, talkshow, switchboard)', 'Thu âm trong môi trường nào',
      'file zip tải lên gồm 1 folder wav chứa âm thanh và 1 file .csv chứa những thông tin như trong file này ']
  ];

  useEffect(() => {

    const cookieAccessToken = getCookie('accessToken')
    // console.log(cookieAccessToken)
    const body = {
      "accessToken": cookieAccessToken
    }
    axios.post(`${USER_SERVER}/getUser`, body)
      .then(response => setUser(response.data.user));
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const submitFile = (fileList) => {
    const body = {
      user: user._id,
      username: user.name,
      audioStyle: "Conversation",
      audioList: fileList,
    }
    axios.post(`${process.env.REACT_APP_ASR_APP}/api/audio/import`, body)
      .then(res => {
          if (res.data.ok) {
            console.log("oke")
            setFileList([])
          }
        }
      )
  }
  const getTranscript = async (fileWav) => {

    let formData = new FormData();

    console.log(fileWav)
    const matches = user.name.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu);
    const speaker_id = matches.join('') + user.ssoUserId;
    const file_name = `${fileWav.name.split(".")[0]}_${Date.now()}`
    const destination = `congpt/import/${speaker_id}`
    formData.append('destination', destination);
    formData.append('name', file_name);
    formData.append('file', fileWav);
    try {
      setLoading(true)
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_UPLOAD_DATA}/api/v1/uploads/file`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + `${process.env.REACT_APP_UPLOAD_AUTH_KEY}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }).then(async res => {
        if (res.data.status === 1) {
          console.log("oke")
          const body = {
            zip_link: res.data.result.link,
          }
          await axios.post(
            `${process.env.REACT_APP_ASR_APP}/api/getText/unzip`,
            body
          )
            .then(res => {
            console.log(res)
            const results = res.data.files.map(row => ({
              id: row.id,
              speaker_id: row.speaker_id,
              audio_link: row.audio_link,
              transcript: row.transcript,
              audio_name: row.audio_name,
              duration: row.duration,
            }))
            setFileList(results)
          })
              .then(res => setLoading(false))

        }
      })
    } catch (e) {
      alert(e)
    }
    // formData.append('destination', destination);
    // formData.append('name', audioName.split(".")[0]);
    // formData.append('file', file);
    // console.log(fileWav.length)
    // for (let i = 0; i < fileWav.length; i++) {
    //   formData.append("files", fileWav[i], fileWav[i].name)
    // }

    // try {
    //   setLoading(true)
    //   await axios.post(
    //     `${process.env.REACT_APP_ASR_APP}/api/getText/audioImportZip`,
    //     formData
    //   ).then(res => {
    //     console.log(res)
    //     const results = res.data.files.map(row => ({
    //       id: row.id,
    //       audio_link: row.audio_link,
    //       transcript: row.transcript,
    //       audio_name: row.audio_name,
    //       duration: row.duration,
    //     }))
    //     setFileList(results)
    //   })
    //     .then(res => setLoading(false))
    // } catch (error) {
    //   alert(error)
    // }
  }

  return (
    <div id="content">
      <div className="speech-to-text-main">
        <div className="get-audio">
          <section className="launched">
            <div className="title-and-search">
              <div>
                {/*{console.log(fileWav.)}*/}
                <h1>Công cụ đóng góp dữ liệu</h1>
              </div>
              <hr className="hr"></hr>
            </div>
            {/*{!audio ?*/}
            <Dropzone onDrop={onDrop}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps({className: 'dropzone'})}>
                    <input type="file" id='upload-audio' {...getInputProps()}
                           accept=".wav,.zip"/>
                    <p>Kéo thả một hoặc nhiều tệp ở đây</p>
                  </div>
                </section>
              )}
            </Dropzone>
            {/*    <Dropzone onDrop={onDrop}>*/}
            {/*      {({getRootProps, getInputProps}) => (*/}
            {/*          <section>*/}
            {/*            <div {...getRootProps({className: 'dropzone'})}>*/}
            {/*              <input id='upload-audio' {...getInputProps()} />*/}
            {/*              /!*<img src="https://stc-ai-developers.zdn.vn/image/audio_img.png"/>*!/*/}
            {/*              /!*<div>Name: {file.name}</div>*!/*/}
            {/*            </div>*/}
            {/*          </section>*/}
            {/*      )}*/}
            {/*    </Dropzone>*/}
            {/*}*/}
            <div className="button-guide">
              <button onClick={() => getTranscript(fileWav)} type="primary"
                      className="getText"
                      disabled={!fileWav}>Lấy nội dung tệp
              </button>
              <button onClick={() => submitFile(fileList)} type="primary"
                      className="guide">
                <CSVLink data={csvData}>Hướng dẫn</CSVLink>
              </button>
            </div>
            <div className="title-and-search">
              <div className="abc">
                <h1 style={{marginRight: "1.5rem"}}>Danh sách tệp</h1>
                <button onClick={() => submitFile(fileList)} type="primary"
                        className="getText" disabled={fileList.length === 0}>Tải
                  lên
                </button>
              </div>
              <hr className="hr"></hr>
            </div>
            {loading &&
            <div className="loader-view">
              <CircularProgress/>
            </div>}
            <div style={{height: 400, width: '100%'}}>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow className="table-row-header1">
                      <TableCell className="color-white1">
                        STT
                      </TableCell>
                      <TableCell align="center" className="color-white1">
                        ID người nói
                      </TableCell>
                      <TableCell align="center" className="color-white1">
                        Tên File
                      </TableCell>
                      <TableCell align="center" className="color-white1">
                        Phụ đề gốc
                      </TableCell>
                      <TableCell align="center" className="color-white1">
                        Âm thanh
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fileList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        // const isItemSelected = isSelected(row._id);
                        // const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row._id)}
                            // role="checkbox"
                            // aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.audio_link}
                            className="table-row table-row-bg"
                            // selected={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              className="table-cell1"
                              style={{width: "100px"}}
                            >
                              {index+1}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className="table-cell1"
                              style={{width: "100px"}}
                            >
                              {row.speaker_id}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className="table-cell1"
                              style={{width: "100px"}}
                            >
                              {row.audio_name}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className="table-cell1"
                              style={{width: "300px"}}
                            >
                              {row.transcript}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className="table-cell1"
                              align="center"
                            >
                              <TableContent
                                audioLink={row.audio_link}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {!fileList && (
                      <TableRow>
                        <TableCell align="center">{t('noData')}</TableCell>
                      </TableRow>
                    )}
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
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
