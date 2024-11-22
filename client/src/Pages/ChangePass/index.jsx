import classNames from 'classnames/bind';
import style from './ChangPass.module.scss';
import axios from 'axios';






function Changpass() {
    const cx = classNames.bind(style);
    const token = localStorage.getItem('authToken');
    
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
      
        const token = localStorage.getItem("authToken"); // Lấy token từ localStorage
        const userId = localStorage.getItem("userId");  // Lấy userId từ localStorage
      
        if (!userId || !token) {
          alert("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
          return;
        }
      
        try {
          const response = await axios.post(
            `http://localhost:8080/users/ChangPass/${userId}`,
            {
              new_password: passwordData.new_password,
              old_password: passwordData.old_password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
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
            `Lỗi: ${
              err.response?.data?.error || "Đã xảy ra lỗi. Vui lòng thử lại."
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
