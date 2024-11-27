const express = require("express");
const storyController = require("../controllers/StoryController.js");
const storyRouter = express.Router();
const MiddlewareImg = require("../middleware/middlewareImg.js");

storyRouter.get("/", storyController.getAllStories);
storyRouter.post("/store", storyController.createStory);
storyRouter.get("/:id",MiddlewareImg, storyController.getStoriesById);

module.exports = storyRouter;
