import classNames from 'classnames/bind';
import style from './ChangPass.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';






function Changpass() {
  const cx = classNames.bind(style);
  //Lấy dữ liệu id người dùng khi đăng nhập
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState({});

  //Lấy token người dùng
  const token = localStorage.getItem('authToken');

  //Lấy dữ liệu userId khi đăng nhập vào
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserId(response.data);
        } catch (err) {
          setError('Không thể lấy thông tin người dùng');
        }
      } else {
        setError('Bạn chưa đăng nhập');
      }
    };
    fetchUserData();
  }, []);
  console.log(`userId.id`, userId.id);
  const ChangePassword = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const passwordData = {
      old_password: formData.get("old_password"),
      new_password: formData.get("new_password"),
      confirm_password: formData.get("confirm_password"),
    };

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }



    try {
      const response = await axios.post(
        `http://localhost:8080/users/ChangPass/${userId.id}`,
        {
          new_password: passwordData.new_password,
          old_password: passwordData.old_password,
        }

      );

      if (response.status === 200) {
        alert("Đổi mật khẩu thành công!");
        console.log("Response:", response.data);
      } else {
        console.error("Server error:", response.data);
        alert("Đổi mật khẩu thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(
        "Error changing password:",
        err.response ? err.response.data : err.message
      );
      alert(
        `Lỗi: ${err.response?.data?.error || "Đã xảy ra lỗi. Vui lòng thử lại."
        }`
      );
    }
  };


  return (
    <div className={cx('wrapper')}>
      <div className={cx('title_changepass')}>
        <span>Đổi mật khẩu</span>
      </div>
      <div className={cx('wr_input')}>
        <div className={cx('wrapper')}>
          <form onSubmit={ChangePassword}>
            <div className={cx('wr_edit_item')}>
              <div className={cx('my_id')}>
                <span>Mật khẩu cũ</span>
                <br></br>
                <input name='old_password' type="text" placeholder="Nhập mật khẩu cũ" />
              </div>
            </div>
            <div className={cx('wr_edit_item')}>
              <div className={cx('my_id')}>
                <p>Mật khẩu mới</p>
                <input
                  type="text"
                  name='new_password'
                  placeholder="Nhập mật khẩu mới..."
                />
              </div>
            </div>

            <div className={cx('wr_edit_item')}>
              <div className={cx('my_id')}>
                <p>Xác nhận mật khẩu mới</p>
                <input
                  type="text"
                  name='confirm_password'
                  placeholder="Xác nhận mật khẩu mới..."
                />
              </div>
            </div>

            <div className={cx('btn_confirm')}>
              <button type="submit">Xong</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Changpass;