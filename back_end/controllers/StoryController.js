//import Models
const { where } = require("sequelize");
const dbModel = require("../models");
class StoryController {
  //Đăng story

  async createStory(req, res) {
    const { content, user_id } = req.body;
    const { image_url } = req.params;
    try {
      const newStory = await dbModel.Story.create({
        content: content,
        image_url: image_url,
        user_id: user_id,
      });
      return res
        .status(201)
        .json({ message: "Story created successfully!", newStory });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to create story", details: err });
    }
  }

  // Lấy tất cả story
  async getAllStories(req, res) {
    try {
      const stories = await dbModel.Story.findAll({
        include: [
          {
            model: dbModel.User,
            as: "oneUser",
            attributes: ["id", "username", "avatar"],
          },
        ],
        order: [["id", "DESC"]],
      });
      return res.status(200).json({ stories });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve stories", details: err });
    }
  }

  async getStoriesById(req, res) {
    const { id } = req.params;
    try {
      const stories = await dbModel.Story.findByPk(id);
      return res.status(200).json({ stories });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve stories", details: err });
    }
  }
}
module.exports = new StoryController();
