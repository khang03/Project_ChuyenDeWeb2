const multer = require('multer');

// Thiết lập lưu trữ cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Đặt tên file với timestamp để tránh trùng lặp
  }
});

// Chỉ cho phép upload file ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = [ 'image/gif','image/jpg','image/jpeg','image/png','image/webp','image/avif'] ;
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Cho phép lưu file
  } else {
    cb(new Error('File không hợp lệ. Chỉ cho phép JPEG, PNG, GIF, WEBP '), false); // Từ chối file không hợp lệ
  }
};

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file là 5MB
  fileFilter: fileFilter 
}).array('images',4);

module.exports = upload;
