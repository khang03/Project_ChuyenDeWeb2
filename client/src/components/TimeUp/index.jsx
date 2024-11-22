function TimeUp({ time }) {
    const date = new Date();
    const createdDate = new Date(time); // Thời gian tạo, được chuyển đổi thành đối tượng Date

    const diffInMs = date - createdDate; // Tính chênh lệch thời gian (milliseconds)

    
    

    const seconds = Math.floor(diffInMs / 1000); // Giây
    const minutes = Math.floor(seconds / 60); // Phút
    const hours = Math.floor(minutes / 60); // Giờ
    const day = Math.floor(hours / 24);
    const renderTime = () => {
        
        if (day === 0) {
            if (hours === 0) {
                if (minutes === 0) {
                    return `${seconds} giây trước`;
                }
                return `${minutes} phút trước`;
            }
            return `${hours} giờ trước`;
        }

        return `${day} ngày trước`;
    };

    // const secondRender = minutes == 0 ? `${seconds} giây trước` : `${minutes} phút trước`
    return <div>{renderTime()}</div>;
}

export default TimeUp;
