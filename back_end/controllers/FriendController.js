// import Models
const { Sequelize } = require("sequelize");
const dbModel = require("../models");
class FriendController {

    // [GET] Lấy danh sách bạn bè của người dùng có :id
    async getListFriend(req,res) {
        const {userId} = req.params;
        
        try {
            const friends = await dbModel.Friendship.findAll({
                where: {
                    status: 1, // Chỉ lấy các mối quan hệ bạn bè
                    [Sequelize.Op.or]: [
                        { userid_1: userId },
                        { userid_2: userId },
                    ],  
                },
                attributes: [
                    [Sequelize.literal(`CASE WHEN userid_1 = ${userId} THEN userid_2 ELSE userid_1 END`), 'friend_id'],
                    'room'
                   
                ],
                
                raw: true
            });
            const friendIds = friends.map(friend => friend.friend_id);
            console.log(friends);
            // Truy vấn bảng user để lấy thông tin bạn bè
            const users = await dbModel.User.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: friendIds, // Lọc theo mảng friendIds
                    }
                },
                attributes: [ 'id','name', 'avatar'], // Lấy thông tin cần thiết
                raw: true
            });
            
            // Gộp dữ liệu1
            const mergedArray = friends.map(itemA => {
                const friendData = users.find(itemB => itemB.id === itemA.friend_id); // Tìm bạn bè trong arrB
                return {
                ...friendData, // Thêm thông tin từ arrB
                room: itemA.room // Thêm thuộc tính room từ arrA
                };
            });
            console.log(mergedArray);
            res.json(mergedArray);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Lỗi hệ thống...' });
        }
    }

    // [GET]
    async getStatus(req,res) {
        const { id, friendId } = req.query;
        
        
        try {
            const friendStatus = await dbModel.Friendship.findOne({
            where: { userid_1: id, userid_2: friendId },
            attributes: ['status']
            });
            if (friendStatus) {
            res.status(200).json({ status: friendStatus.status });
            } 
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // [POST] gửi yêu cầu kết bạn
    async sendAddFriend(req,res) {

        const { id, friendId } = req.body;
        try {
            const newRequest = await dbModel.Friendship.create({
            userid_1: id,
            userid_2: friendId,
            status: 0,
            });
            res.status(201).json(newRequest);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // [DELETE] hủy kết bạn
    deleteFriend(req,res) {
        
    }

    // [DELETE] yêu cầu kết bạn
    async deleteAddRequest(req,res) {
        const { id, friendId } = req.body;
        try {
             await dbModel.Friendship.destroy({
                where: {
                  userid_1: id,
                  userid_2: friendId
                }
              });
            res.status(201).json({message: 'success'});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new FriendController();