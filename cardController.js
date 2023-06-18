import * as uuid from "uuid";
import CardService from "./cardService.js";
import Card from "./models/card.js";
class PostController {
  async create(req, res) {
    try {
      const post = await CardService.create(req.body, req.files.picture);
      res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async createDict(req, res) {
    try {
      const post = await CardService.createDict(
        req.body,
        req.files.picture,
        req.user.id
      );

      res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async addToDict(req, res) {
    try {
      const post = await CardService.createDict(req.body);
      res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async getAllDict(req, res) {
    try {
      const posts = await CardService.getAllDict({ userId: req.user.id });
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await CardService.getAll();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async getOne(req, res) {
    try {
      const post = await CardService.getOne(req.params.id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async update(req, res) {
    try {
      const updatedPost = await CardService.update(req.body);
      return res.json(updatedPost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const post = await CardService.delete(req.user.id, req.params.id);
      if (!post) {
        return res.status(400).json({ message: "File not found" });
      }
      return res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  // async uploadImage(req, res) {
  //   try {
  //     const file = req.files.file;
  //     const card = await Card.findById(req.cards.id);
  //     const fileName = uuid.v4() + ".png";
  //     file.mv(config.get("staticPath") + "\\" + fileName);
  //     card.picture = fileName;
  //     await card.save();
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "Upload Image Error" });
  //   }
  // }
}

export default new PostController();
