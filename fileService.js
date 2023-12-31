import * as path from "path";
import * as uuid from "uuid";

class FileService {
  saveFile(file) {
    try {
      const fileName = uuid.v4() + ".png";
      const filePath = path.resolve("static", fileName);
      file.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
