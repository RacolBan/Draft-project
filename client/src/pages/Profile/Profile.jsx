import React from "react";
import style from "./Profile.module.css";

function Profile() {
  return (
    <div className={style.container}>
      <div className={style.profile}>
        <div className={style["profile-left"]}>
          <div className={style["profile-left-header"]}>
            <div className={style["profile-left-avatar"]}>
              <img
                src="https://cf.shopee.vn/file/99e09cc1ae8fedc68f1e4bcabd9e9f50_tn"
                alt="avatar"
              />
            </div>
            <div className={style["profile-left-username"]}>Legen92</div>
          </div>
          <div className={style["profile-left-body"]}>
            <div className={style["profile-left-body-info"]}>
              <i className="fa-solid fa-user"></i>
              <span>Tài khoản của tôi</span>
            </div>
            <div className={style["profile-left-body-changePass"]}>
              Đổi mật khẩu
            </div>
          </div>
        </div>
        <div className={style["profile-right"]}>
          <div className={style["profile-right-header"]}>
            <h3>Hồ sơ của tôi</h3>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
          </div>
          <div className={style["profile-right-body"]}>
            <div className={style["profile-right-body-left"]}>
              <div className={style["profile-right-body-infomation"]}>
                <div className={style["profile-right-body-name"]}>
                  Tên đăng nhập:
                </div>
                <div className={style["profile-right-body-info"]}>
                  <input type="text" />
                </div>
              </div>
              <div className={style["profile-right-body-infomation"]}>
                <div className={style["profile-right-body-name"]}>Họ:</div>
                <div className={style["profile-right-body-info"]}>
                  <input type="text" />
                </div>
              </div>
              <div className={style["profile-right-body-infomation"]}>
                <div className={style["profile-right-body-name"]}>Tên:</div>
                <div className={style["profile-right-body-info"]}>
                  <input type="text" />
                </div>
              </div>
              <div className={style["profile-right-body-infomation"]}>
                <div className={style["profile-right-body-name"]}>Địa chỉ:</div>
                <div className={style["profile-right-body-info"]}>
                  <input type="text" />
                </div>
              </div>
              <div className={style["profile-right-body-infomation"]}>
                <div className={style["profile-right-body-name"]}>Email:</div>
                <div className={style["profile-right-body-info"]}>
                  <input type="text" />
                </div>
              </div>
              <div className={style["profile-right-body-infomation"]}>
                <div className={style["profile-right-body-name"]}>
                  Số điện thoại:
                </div>
                <div className={style["profile-right-body-info"]}>
                  <input type="text" />
                </div>
              </div>
              <div className={style.btn}>
                <button className={style["btn-save"]}>Lưu</button>
              </div>
            </div>
            <div className={style["profile-right-body-right"]}>
              <div className={style["profile-right-body-file"]}>
                <input type="file" name="" id="" />
                <img
                  src="https://cf.shopee.vn/file/99e09cc1ae8fedc68f1e4bcabd9e9f50"
                  alt="avatar"
                />
                <button className={style["select-img"]}>Chọn Ảnh</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
