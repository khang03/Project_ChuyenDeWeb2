const jwt = require('jsonwebtoken');

// Middleware để xác thực token JWT
function MiddlewareUserLogin(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }

  // Xác thực token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token hết hạn hoặc không hợp lệ' });
    }

    // Lưu thông tin người dùng (userId, username) vào req.user để sử dụng ở bước sau
    req.user = decoded; 
    next(); // Tiếp tục với các bước tiếp theo
  });
}
module.exports = MiddlewareUserLogin;