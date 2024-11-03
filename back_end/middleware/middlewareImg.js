const upload = require('./multer.js');
const multer = require('multer');

// Xử lí lỗi middle img trong này
function MiddlewareImg(req,res,next) {
    upload(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                //  Kiểm tra từng loại lỗi từ multer
                 let errorMessage = 'Upload error';
                 switch (err.code) {
                     case 'LIMIT_FILE_SIZE':
                         errorMessage = 'File quá lớn , chỉ tối thiểu 5MB';
                         break;
                     case 'LIMIT_FILE_COUNT':
                         errorMessage = 'Chỉ có thể upload tối đa 4 file.';
                         break;
                     case 'LIMIT_UNEXPECTED_FILE':
                         errorMessage = 'Chỉ có thể upload tối đa 4 file.';
                         break;
                     default:
                         errorMessage = `Multer error: ${err.message}`;
                 }
                // Xử lý lỗi từ multer (ví dụ: giới hạn số lượng file)
                return res.status(400).json({ message: errorMessage, codeError:err.code});
            } else if (err) {
                // Xử lý lỗi từ `fileFilter` hoặc các lỗi khác
                return res.status(400).json({ message: `Upload error: ${err.message}` });
            }
        }
        next(); // Không có lỗi, chuyển tiếp đến controller
    });
}

module.exports = MiddlewareImg;