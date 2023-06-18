import fileService from "./fileService.js";
import Card from "./models/card.js";
import dictCard from "./models/dictionaryCard.js";

class CardService {
  async create(post, picture) {
    const fileName = fileService.saveFile(picture);
    const createdPost = await Card.create({ ...post, picture: fileName });
    return createdPost;
  }

  async getAll() {
    const posts = await Card.find();
    return posts;
  }
  async getAllDict(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const posts = await dictCard.find(id);
    return posts;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const post = await Card.findById(id);
    return post;
  }
  async update(post) {
    if (!post._id) {
      throw new Error("не указан ID");
    }
    const updatedPost = await Card.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }
  async delete(uId, cardId) {
    if (!uId || !cardId) {
      throw new Error("не указан ID");
    }
    const post = await dictCard.findOneAndDelete({ userId: uId, _id: cardId });
    return post;
  }

  // async createDict(post, picture, userId) {
  //   const fileName = fileService.saveFile(picture);
  //   const createdPost = await dictCard.create({
  //     ...post,
  //     picture: fileName,
  //     userId: userId,
  //   });
  //   return createdPost;
  // }
  async createDict(post, picture, userId) {
    const createdPost = await dictCard.create({
      ...post,
    });
    return createdPost;
  }
  async addToDict(post) {
    const createdPost = await dictCard.create({
      post,
    });
    return createdPost;
  }
}

export default new CardService();
