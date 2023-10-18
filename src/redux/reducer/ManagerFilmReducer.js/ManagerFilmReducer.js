import { act } from "react-dom/test-utils";
import {
  ACTION_ERROR,
  ACTION_SUCCESS,
  EDIT_SUCCESS,
  FILM_DANG_CHIEU,
  FILM_SAP_CHIEU,
  GET_LIST_FILM,
  LAY_THONG_TIN_PHIM,
} from "../../actions/types/FilmType";
import { GET_LICH_CHIEU } from "../../actions/types/CinemaType";

const stateDefault = {
  listFilm: [
    {
      maPhim: 10895,
      tenPhim: "ALIENOID: Cuộc Chiến Xuyên Không",
      biDanh: "alienoid-cuoc-chien-xuyen-khong",
      trailer: "https://www.youtube.com/embed/ZmPvNvVsJCY",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/alienoid-cuoc-chien-xuyen-khong_gp00.png",
      moTa: "Năm 2022, hai người ngoài hành tinh là Guard (Kim Woo-bin) và Thunder sinh sống tại Trái Đất đang tìm kiếm những tù nhân vượt ngục, vốn bị họ giam giữ trong cơ thể con người. Cảnh sát Moon (So Ji-sub) vô tình trở thành đối tượng bị truy đuổi mà không rõ lý do. Cùng lúc đó, ở triều đại Goryeo hơn 630 năm về trước, pháp sư xui xẻo Muruk (Ryu Jun-yeol) và “cô gái bắn sấm sét” Ean (Kim Tae-ri) đang cố gắng tranh giành một thanh gươm thần huyền thoại. Cuộc chiến khốc liệt ấy còn có sự tham gia của hai phù thủy hắc ám là Madam Black (Yum Jung-ah) và Mr. Blue (Jo Woo-Jin), cùng kẻ đeo mặt nạ bí ẩn Jajang (Kim Eui-sung). Một cánh cổng thời gian xuất hiện và mở ra sự kết nối giữa hai thời đại, tạo nên tình huống hỗn loạn chưa từng thấy.",
      maNhom: "GP00",
      ngayKhoiChieu: "2023-09-04T20:53:21.513",
      danhGia: 7,
      hot: false,
      dangChieu: true,
      sapChieu: false,
    },
  ],
  dangChieu: true,
  sapChieu: false,
  arrFilmDefault: [],
  thongTinPhim: {},
};

export const ManangerFilmReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_FILM:
      state.listFilm = action.listFilm;
      state.arrFilmDefault = state.listFilm;

      return {
        ...state,
      };

    case FILM_DANG_CHIEU: {
      const arrDC = [...state.arrFilmDefault];
      const arrDangChieu = arrDC.filter((phim) => phim.dangChieu === true);
      console.log({ arrDangChieu });
      return {
        ...state,
        listFilm: arrDangChieu,
        dangChieu: true,
        sapChieu: false,
      };
    }
    case FILM_SAP_CHIEU: {
      const arrSC = [...state.arrFilmDefault];
      console.log({ arrSC });
      const arrSapChieu = arrSC.filter((phim) => phim.sapChieu === true);
      console.log({ arrSapChieu });
      console.log(state.listFilm);
      return {
        ...state,
        listFilm: arrSapChieu,
        sapChieu: true,
        dangChieu: false,
      };
    }
    case LAY_THONG_TIN_PHIM: {
      return {
        ...state,
        thongTinPhim: action.thongTinPhim,
      };
    }

    default:
      return { ...state };
  }
};
