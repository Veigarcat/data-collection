import React, {useState} from 'react'
import intentInfo from './intent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PdfViewer from "./Sub-container/PdfViewer";
import mtk from '../../Asset/Dich vu tai khoan.pdf'
import dvnh from '../../Asset/20190513_Dich vu ngan hang dien tu_BP KHCN _dang tai Website.pdf'
import pdf2 from '../../Asset/Huong dan GUI TIEN TRUC TUYEN_15.10.2013.pdf';

import Button from "@material-ui/core/Button";

export default function Scenario(props) {
  const scenario = props.scenario;
  const user_role = props.user_role;
  const [result, setResult] = useState('')
  const generateScript = (
    (scenario && scenario.length !== 0) ? (
      scenario[0][1] === 0 ? (
          <div>
            <h3 className="scenario-subtitle">Kịch
              bản: {intentInfo.SCENARIO[scenario[0][1]].name}</h3>
            <p>Vai trò của bạn là {user_role === "client" ? (<><b>khách hàng</b>. Mô tả tình huống: {intentInfo.SCENARIO[scenario[0][1]].context.split(".").map((ele, i) => (
                <ul>
                  <li key={i}>{ele}</li>
                </ul>
              ))}</>)
              :
              (<><b>nhân viên tư vấn</b>. Từ thông tin tra cứu được hãy giới thiệu sản phẩm và hỏi khách hàng: {intentInfo.SCENARIO[scenario[0][1]].servant.split(".").map((ele, i) => (
                <ul>
                  <li key={i}>{ele}</li>
                </ul>
              ))}</>)}
              {user_role === "servant" ? "Bạn hãy sử dụng những thông tin tìn kiếm được để phản hồi khách hàng" : ""}
            </p>
            {
              user_role === "client" ?
                <>
                  <p>Thông tin có thể trao đổi</p>
                  <ul>
                    <li>Cách khóa thẻ</li>
                    <li>Cách khóa Mobile banking/Ngân hàng điện tử</li>
                    <li>Hướng dẫn làm lại thẻ: thủ tục làm lại thẻ thủ, ở đâu,
                      bao lâu thì xong
                    </li>
                    <li>Hướng dẫn tải ứng dụng Mobile banking</li>
                    <li>Hướng dẫn mở lại dịch vụ Ngân hàng điện tử</li>
                    <li>Hướng dẫn thay đổi số điện thoại đăng ký ngân hàng điện
                      tử
                    </li>
                  </ul>
                </>
                :
                ""
            }
          </div>
        ) :
        scenario[0][1] === 1 ? (
            <div>
              <h3 className="scenario-subtitle">Kịch
                bản: {intentInfo.SCENARIO[scenario[0][1]].name}</h3>
              <p>Vai trò của bạn là {user_role === "client" ? (<><b>khách hàng</b>. Mô tả tình huống: {intentInfo.SCENARIO[scenario[0][1]].context.split(".").map((ele, i) => (
                  <ul>
                    <li key={i}>{ele}</li>
                  </ul>
                ))}</>)
                :
                (<><b>nhân viên tư vấn</b>. Từ thông tin tra cứu được hãy giới thiệu sản phẩm và hỏi khách hàng: {intentInfo.SCENARIO[scenario[0][1]].servant.split(".").map((ele, i) => (
                  <ul>
                    <li key={i}>{ele}</li>
                  </ul>
                ))}</>)}
                {user_role === "servant" ? "Bạn hãy sử dụng những thông tin tìn kiếm được để phản hồi khách hàng" : ""}
              </p>
              {
                user_role === "client" ?
                  <>
                    <p><b>Thông tin có thể trao đổi</b></p>
                    <ul>
                      <li>Các loại thẻ mà ngân hàng hỗ trợ</li>
                      <li>Hỏi thông tin về từng loại thẻ: thẻ
                        Visa/Mastercard/JCB/thẻ nội địa
                      </li>
                      <li>Hướng dẫn mở thẻ: thủ tục làm lại thẻ thủ, ở đâu,
                        bao lâu thì xong
                      </li>
                      <li>Điều kiện mở thẻ</li>
                      <li>Phí mở thẻ</li>
                      <li>Cách thanh toán thẻ, Hạn mức từng loại thẻ</li>
                      <li>Lãi suất khi sử dụng thẻ tín dụng</li>
                      <li>Cách sử dụng thẻ, dùng thẻ để làm gì, ở đâu</li>
                    </ul>
                  </>
                  :
                  ""
              }
            </div>
          ) :
          (scenario[0][1] === 2) ? (
              <div>
                <h3 className="scenario-subtitle">Kịch
                  bản: {intentInfo.SCENARIO[scenario[0][1]].name}</h3>
                <p>Vai trò của bạn là {user_role === "client" ? (<><b>khách hàng</b>. Mô tả tình huống: {intentInfo.SCENARIO[scenario[0][1]].context.split(".").map((ele, i) => (
                    <ul>
                      <li key={i}>{ele}</li>
                    </ul>
                  ))}</>)
                  :
                  (<><b>nhân viên tư vấn</b>. Từ thông tin tra cứu được hãy giới thiệu sản phẩm và hỏi khách hàng: {intentInfo.SCENARIO[scenario[0][1]].servant.split(".").map((ele, i) => (
                    <ul>
                      <li key={i}>{ele}</li>
                    </ul>
                  ))}</>)}
                  {user_role === "servant" ? "Bạn hãy sử dụng những thông tin tìn kiếm được để phản hồi khách hàng" : ""}
                </p>
                {
                  user_role === "client" ?
                    <>
                      <p><b>Thông tin có thể trao đổi</b></p>
                      <ul>
                        <li>Cách gửi tiết kiệm/Các loại tiền có thể gửi
                          tiết kiệm
                        </li>
                        <li>Lãi suất tiết kiệm/Thời hạn gửi tiết kiệm</li>
                        <li>Cách mở khoản tiết kiệm/Cách tất toán tài
                          khoản tiết kiệm
                        </li>
                        <li>Thủ tục mở tài khoản</li>
                        <li>Số tài khoản mỗi người có thể mở</li>
                        <li>Phí mở tài khoản</li>
                        <li>Phí sử dụng các dịch vụ ngân hàng</li>
                      </ul>
                    </>
                    :
                    ""
                }
              </div>
            ) :
            (scenario[0][1] === 3) ? (
                <div>
                  <h3 className="scenario-subtitle">Kịch
                    bản: {intentInfo.SCENARIO[scenario[0][1]].name}</h3>
                  <p>Vai trò của bạn là {user_role === "client" ? (<><b>khách hàng</b>. Mô tả tình huống: {intentInfo.SCENARIO[scenario[0][1]].context.split(".").map((ele, i) => (
                      <ul>
                        <li key={i}>{ele}</li>
                      </ul>
                    ))}</>)
                    :
                    (<><b>nhân viên tư vấn</b>. Từ thông tin tra cứu được hãy giới thiệu sản phẩm và hỏi khách hàng: {intentInfo.SCENARIO[scenario[0][1]].servant.split(".").map((ele, i) => (
                      <ul>
                        <li key={i}>{ele}</li>
                      </ul>
                    ))}</>)}
                    {user_role === "servant" ? "Bạn hãy sử dụng những thông tin tìn kiếm được để phản hồi khách hàng" : ""}
                  </p>
                  {
                    user_role === "client" ?
                      <>
                        <p><b>Thông tin có thể trao đổi</b></p>
                        <ul>
                          <li>Mục đích vay của bản thân</li>
                          <li>Điều kiện vay</li>
                          <li>Hồ sơ/thủ tục vay</li>
                          <li>Thời hạn vay</li>
                          <li>Số tiền được vay</li>
                        </ul>
                      </>
                      :
                      ""
                  }
                </div>
              ) :
              (scenario[0][1] === 4) ? (
                  <div>
                    <h3 className="scenario-subtitle">Kịch
                      bản: {intentInfo.SCENARIO[scenario[0][1]].name}</h3>
                    <p>Vai trò của bạn là {user_role === "client" ? (<><b>khách hàng</b>. Mô tả tình huống: {intentInfo.SCENARIO[scenario[0][1]].context.split(".").map((ele, i) => (
                        <ul>
                          <li key={i}>{ele}</li>
                        </ul>
                      ))}</>)
                      :
                      (<><b>nhân viên tư vấn</b>. Từ thông tin tra cứu được hãy giới thiệu sản phẩm và hỏi khách hàng: {intentInfo.SCENARIO[scenario[0][1]].servant.split(".").map((ele, i) => (
                        <ul>
                          <li key={i}>{ele}</li>
                        </ul>
                      ))}</>)}
                      {user_role === "servant" ? "Bạn hãy sử dụng những thông tin tìn kiếm được để phản hồi khách hàng" : ""}
                    </p>
                    {
                      user_role === "client" ?
                        <>
                          <p><b>Thông tin có thể trao đổi</b></p>
                          <ul>
                            <li>Cách giải quyết khi chuyển khoản nhầm
                            </li>
                            <li>Cần làm gì khi không nhận được mã OTP</li>
                            <li>Rút tiền bị nuốt thẻ</li>
                            <li>Rút tiền mà không ra tiền</li>
                            <li>Địa chỉ chi nhánh gần nhất</li>
                            <li>Hotline VCB</li>
                          </ul>
                        </>
                        :
                        ""
                    }
                  </div>
                )
                :
                "Ko có kịch bản"
    ) : (
      <p>Không có kịch bản</p>
    )
  )

  function renderText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let parts = text.split(urlRegex) // re is a matching regular expression
    for (let i = 1; i < parts.length; i += 2) {

      if (parts[i] === "https://bit.ly/3u8u7bj") {
        parts[i] =
          <div>
            <a key={'link' + i} href={parts[i]} target="_blank">{parts[i]}</a>
            <PdfViewer pdf={mtk}
                       handleClose={() => setShowPdf(false)}
                       handleClickOpen={showPdf}
            />
            <Button onClick={() => setShowPdf(!showPdf)}>Xem nhanh</Button>
          </div>
      } else if (parts[i] === "https://bit.ly/3e9qYlW") {
        parts[i] =
          <div>
            <a key={'link' + i} href={parts[i]} target="_blank">{parts[i]}</a>
            <PdfViewer pdf={dvnh}
                       handleClose={() => setShowPdf(false)}
                       handleClickOpen={showPdf}
            />
            <Button onClick={() => setShowPdf(!showPdf)}>Xem nhanh</Button>
          </div>
      }else{
        parts[i] =
          <div>
            <a key={'link' + i} href={parts[i]} target="_blank">{parts[i]}</a>
          </div>
      }
    }


    return parts
  }

  const [showPdf, setShowPdf] = useState(false)

  return (
    <section className="scenario">
      <div className="scenarioText">
        {generateScript}
      </div>

      {user_role === "servant" ?
        <>
          <Autocomplete
            onChange={(event, value) => {
              if (value !== null) {
                setResult(value.answer)
              } else {
                setResult('')
              }
            }}
            id="id"
            options={intentInfo.QA}
            getOptionLabel={(option) => option.question}
            style={{width: 300, marginTop: "10px"}}
            renderInput={(params) => <TextField {...params}
                                                label="Tham khảo câu trả lời tại đây"
                                                variant="outlined"/>}
          />
          {result ?
            <div className="scenarioText1">{result.split('*').map((ele, i) => (
              <ul>
                <li key={i}>{renderText(ele)}</li>
              </ul>
            ))}</div> : ""}
        </>
        :
        ""
      }
    </section>
  )
}
