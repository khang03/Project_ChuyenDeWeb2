// import Models
const dbModel = require("../models");

class FriendController {

    // [GET] Lấy danh sách bạn bè của người dùng
    getListFriend() {

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