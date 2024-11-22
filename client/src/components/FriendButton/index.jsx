import axios from "axios";
import { useEffect, useState } from "react";


const FriendButton = ({id , friendId}) => {
    console.log(id);
    console.log(friendId);
    
    const [status, setStatus] = useState();
    console.log(status);

    //lấy status của 2 user
    useEffect(() => {
        const fetchInitialStatus = async () => {
            try {
            const response = await axios.get(`http://localhost:8080/friend/status`, {
                params: { id, friendId }
            });
            setStatus(response.data.status);
            } catch (error) {
            console.error("Error fetching friend status", error);
            // setStatus('error');
            }
        };

        fetchInitialStatus();
    }, [id, friendId]);

    // Xử lý thêm bạn bè
    const handleAddFriend = async () => {
        try {
            const response = await axios.post('http://localhost:8080/friend/add', { id, friendId });
            setStatus(response.data.status);
        } catch (error) {
            console.error("Error sending friend request", error);
        }
    }

    // Xử lý hủy bạn bè
    const handleRemoveFriend = async () => {
    
    }

    // Xử lý hủy yêu cầu kết bạn
    const handleRemoveRequest =  async () => {

        try {
            const response = await axios.post('http://localhost:8080/friend/delstatus', { id, friendId });
            setStatus(undefined);
        } catch (error) {
            console.error("Error sending friend request", error);
        }
    }
    return (
        <>
            {status === 0 && (
                <div className={'btn_title_edit'} onClick={handleRemoveRequest}>
                    Hủy yêu cầu thêm bạn bè
                </div>
            )}
            {status === 1 && (
                <div className={'btn_title_edit'} onClick={handleRemoveFriend}>
                    Hủy bạn bè
                </div>
            )}
            {status === undefined && (
                <div className={'btn_title_edit'} onClick={handleAddFriend}>
                    Thêm bạn bè
                </div>
            )}
        </>
    );
};

export default FriendButton;