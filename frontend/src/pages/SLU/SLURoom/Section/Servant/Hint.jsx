/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */

import React from 'react';

import Grid from '@material-ui/core/Grid';
import intentInfo from '../../constant/intent';

export default function Hint(props) {
  const { currentIntent } = props;

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  // check if current intent has enough information for an answer or not
  const checkIntent = () => {
    if (currentIntent[0] !== undefined && currentIntent[0] !== null) {
      return (
        intentInfo.INTENT[currentIntent[0][1]].slot.length ===
        currentIntent.length - 1
      );
    }

    return false;
  };

  // const removeAccent = (str) => {
  //   const from =
  //     'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ';
  //   const to =
  //     'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
  //   for (let i = 0, l = from.length; i < l; i++) {
  //     str = str.replace(RegExp(from[i], 'gi'), to[i]);
  //   }

  //   return str
  //     .toLowerCase()
  //     .trim()
  //     .replace(/[^a-z0-9\-]/g, '-')
  //     .replace(/-+/g, '-');
  // };

  // console.log(currentIntent);

  const renderHint = () => {
    switch (currentIntent[0][1]) {
      case 0:
        return 'Vào trang web của ngân hàng, lựa chọn phần "Quên Mật khẩu", nhập thông tin yêu cầu và làm theo hướng dẫn của trang web.';
      case 1:
        return (
          <>
            Ưu đãi chung: Miễn phí thường niên trong năm đầu tiền sử dụng thẻ.{' '}
            <br />
            • Với thẻ Amex, ưu đãi hoàn tiền lên đến 2 triệu đồng khi mở thẻ tín
            dụng Amex. <br />
            • Với thẻ JCB, ưu đãi giảm giá đến 40% tại 100 nhà hàng nổi tiếng
            tại Việt Nam. <br />
          </>
        );
      case 2:
        switch (currentIntent[1][1]) {
          case 0:
            return (
              <>
                • Khách hàng cá nhân trong độ tuổi từ 18 tuổi đến 60 tuổi.{' '}
                <br />
                • Khách hàng có thu nhập ổn định từ 8 triệu đồng trở lên. <br />
                • Khách hàng có tài sản đảm bảo là bất động sản, ô tô mới/ ô tô
                cũ. <br />
              </>
            );
          case 1:
            return (
              <>
                • Khách hàng cá nhân trong độ tuổi từ 18 tuổi đến 65 tuổi.{' '}
                <br />
                • Khách hàng có thu nhập ổn định từ 5 triệu đồng trở lên. <br />
                • Khách hàng có tài sản đảm bảo là bất động sản, giấy tờ có giá.{' '}
                <br />
              </>
            );
          case 2:
            return (
              <>
                • Khách hàng cá nhân trong độ tuổi từ 18 đến dưới 70 tuổi.{' '}
                <br />
                • Khách hàng có Giấy chứng nhận đăng ký doanh nghiệp tư
                nhân/Giấy chứng nhận đăng ký hộ kinh doanh và/hoặc các giấy tờ
                có tính chất pháp lý tương đương. <br />
                • Khách hàng có tài sản đảm bảo là bất động sản, giấy tờ có giá,
                ô tô. <br />
              </>
            );
          case 3:
            return (
              <>
                • Khách hàng cá nhân trong độ tuổi từ 18 tuổi đến 65 tuổi.{' '}
                <br />
                • Khách hàng có thu nhập ổn định từ 5 triệu đồng trở lên. <br />
                • Khách hàng có tài sản đảm bảo là bất động sản, giấy tờ có giá.{' '}
                <br />
              </>
            );
          default:
            return 'case UNKNOWN';
        }
      case 3:
      case 4:
        return (
          <>
            Bạn hãy tra cứu địa điểm tại trang{' '}
            <a
              href="https://portal.vietcombank.com.vn/mang-luoi/Pages/home.aspx?devicechannel=default"
              target="_blank"
              rel="noopener noreferrer"
            >
              này
            </a>
            . Và lấy kết quả đầu tiên làm câu trả lời.
            <br />
            Trong trường hợp không có kết quả. Bạn hãy trả lời rằng `Không tìm
            thấy trong khu vực này`.
          </>
        );
      case 5:
      case 6:
        return (
          <>
            Bạn cần chuẩn bị hồ sơ nhân thân, hồ sơ chứng minh mục đích vay vốn,
            hồ sơ chứng minh thu nhập và hồ sơ tài sản bảo đảm theo mẫu của ngân
            hàng. Sau đó đi tới chi nhánh ngân hàng gần nhất và làm theo hướng
            dẫn của nhân viên.
          </>
        );
      case 7:
      case 10:
      case 11:
      case 12:
      case 17:
        return 'Bạn có thể trả lời rằng "Yêu cầu thực hiện thành công", hoặc "Yêu cầu không thực hiện được" kèm theo lý do tùy thích. (Thông tin không tồn hại hoặc thẻ bị khóa...)';
      case 8:
        return 'Mang theo chứng minh thư nhân dân/Căn cước công dân hoặc hộ chiếu tới phòng giao dịch Vietcombank gần nhất và làm theo hướng dẫn của nhân viên ngân hàng.';
      case 9:
        switch (currentIntent[2][1]) {
          case 0:
            return (
              <>
                Thẻ tín dụng là loại thẻ thường dùng để thanh toán tại các đơn
                vị chấp nhận thanh toán thẻ như siêu thị, cửa hàng tiện lợi, các
                trang thương mại điện tử.... thay thế cho việc thanh toán bằng
                tiền mặt.
              </>
            );
          case 1:
            return (
              <>
                Thẻ ghi nợ là loại thẻ thanh toán bằng nhựa cung cấp cho chủ thẻ
                để thanh toán thay cho tiền mặt. Thẻ ghi nợ được sử dụng tương
                tự với thẻ tín dụng, nhưng khác ở chỗ khi dùng thẻ ghi nợ thì
                tiền được rút trực tiếp từ tài khoản ngân hàng của chủ thẻ khi
                thực hiện các thanh toán.
              </>
            );
          default:
            return 'case UNKNOWN';
        }
      case 13:
        return (
          <>
            `Phí chuyển tiền giao động từ 2.000VNĐ tới 10.000VNĐ với giao dịch
            lượng tiền thấp. Tối đa là 1.000.000đ với giao dịch lượng tiền cao`.
          </>
        );
      case 14:
        return 'Bạn có thể trả lời rằng "Bạn có thể hủy dịch vụ online thông qua chức năng chọn "Huỷ dịch vụ" từ tính năng "Đăng ký sử dụng dịch vụ Mobile Banking". Hoặc tới điểm giao dịch gần chỗ bạn và nhân viên ngân hàng sẽ thực hiện yêu cầu cho bạn.';
      case 15:
        switch (currentIntent[1][1]) {
          case 0:
            return (
              <>
                • Tra cứu tài khoản, truy vấn thông tin. <br />
                • Nạp tiền điện thoại cho chính chủ thuê bao di động. <br />
                • Nhận tin nhắn chủ động. <br />
              </>
            )
          case 1:
            return (
              <>
                • Chuyển khoản định kỳ. <br />
                • Chuyển tiền nhanh. <br />
                • Thanh toán hóa đơn. <br />
                • Thanh toán sao kê thẻ tín dụng. <br />
                • Nộp thuế điện tử, nộp lệ phí trước bạ. <br />
              </>
            )
          case 2:
            return (
              <>
                • Có ứng dụng di động phục vụ việc chuyển khoản, đăng nhập và xác thực giao dịch bằng vân tay, Face ID. <br />
                • Mua vé máy bay, vé xem phim, đặt phòng khách sạn. <br />
                • Thanh toán bằng QR Code. <br />
                • Thanh toán hóa đơn, nạp tiền thuê bao di động trả trước <br />
              </>
            )
          case 3:
            return (
              <>
                • Chuyển tiền: đơn giản như việc gửi tin nhắn cho bạn bè. <br />
                • Chuyển tiền nhanh. <br />
                • Gửi quà tặng, yêu cầu đòi tiền cho nhóm người trong danh bạ từ ứng dụng VCBPAY. <br />
                • Thanh toán bằng QR Code. <br />
                • Mua vé máy bay, vé xem phim, đặt phòng khách sạn. <br />
                • Chức năng trợ lý ảo (Chatbot). <br />
              </>
            )
          default:
            return 'case UNKNOWN';

        }
      case 16:
        return `Bạn có thể trả lời với bất kì số tiền bạn muốn. (${numberWithCommas(
          (Math.floor(Math.random() * (100 - 10)) + 10) * 1000000,
        )})`;
      default:
        return 'case UNKNOWN';
    }
  };

  if (checkIntent()) {
    return (
      <Grid container style={{ padding: '10px' }}>
        <Grid item xs={12} sm={12} md={12}>
          <h3
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              textAlign: 'center',
            }}
          >
            Hướng dẫn trả lời
          </h3>
          {renderHint()}
        </Grid>
      </Grid>
    );
  }

  return '';
}
