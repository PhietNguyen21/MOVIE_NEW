import React from "react";

const Review = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 mt-10">
        <div className=" col-span-12 md:col-span-6 ">
          <a href="#">
            <div>
              <img src="https://s3img.vcdn.vn/123phim/2020/08/review-tan-tich-quy-am-relic-ba-the-he-va-moi-lien-ket-15965255784224.png" />
            </div>
            <b>
              [MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH
              NỔI...
            </b>
          </a>
          <p>
            Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới
            đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách
            Artistic Urban Lifestyle đầu tiên tại Việt Nam!
          </p>
        </div>
        <div className=" col-span-12 md:col-span-6">
          <a href="#">
            <div>
              <img
                className="w-full"
                src="https://s3img.vcdn.vn/123phim/2020/08/review-dinh-thu-oan-khuat-ghost-of-war-15965120886610.png"
              />
            </div>
            <b>Review: Dinh Thự Oan Khuất (Ghost Of War)</b>
          </a>
          <p>
            Tuy là một bộ phim có chất lượng tốt, nhưng có vẻ Dinh Thự Oan Khuất
            vẫn chưa đủ để đem khán giả trở lại phòng vé!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-10">
        <div className="col-span-12 md:col-span-12 sm:col-span-12 xl:col-span-4 ">
          <a href="#">
            <div>
              <img
                className="w-full"
                src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png"
              />
            </div>
            <b>
              PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn
              trả thù...
            </b>
          </a>
          <p>
            Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ
            chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô
            trong phim
          </p>
        </div>

        <div className="col-span-12 md:col-span-12 sm:col-span-12 xl:col-span-4">
          <a href="#">
            <div>
              <img src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" />
            </div>
            <b>
              VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT
              QUỶ”...
            </b>
          </a>
          <p>
            Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực
            diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm
            kinh dị – hành
          </p>
        </div>
        <div className="col-span-12 md:col-span-12 sm:col-span-12 xl:col-span-4 ">
          <div className="grid grid-cols-12 mb-2">
            <div className="col-span-4">
              <img
                src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg"
                style={{ width: "70%" }}
                alt=""
              />
            </div>
            <div className="col-span-8">
              <a href="#">
                {" "}
                <p>Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-2">
            <div className="col-span-4">
              <img
                src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png"
                style={{ width: "70%" }}
                alt=""
              />
            </div>
            <div className="col-span-8">
              <a href="#">
                <p>“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-2">
            <div className="col-span-4">
              <img
                src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
                style={{ width: "70%" }}
                alt=""
              />
            </div>
            <div className="col-span-8 ">
              <a href="#">
                {" "}
                <p>
                  Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công
                </p>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-2">
            <div className="col-span-4">
              <img
                src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                style={{ width: "70%" }}
                alt=""
              />
            </div>
            <div className="col-span-8">
              <a href="#">
                <p>NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
