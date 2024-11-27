

function ImageUser({img}) {

    const isValidURL = (path) => {
        try {
            new URL(path); // Thử khởi tạo URL với chuỗi này
            return true;
          } catch (e) {
            return false; // Nếu không thể khởi tạo, đây không phải là URL hợp lệ
          }
      }
    return (<>
    {
        isValidURL(img) ? (
            <img src={img} alt="" />
        ):(
            <img src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" alt="" />
        )
    }
    </> );
}

export default ImageUser;