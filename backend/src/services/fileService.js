import File from "../models/fileModel.js";
import fs from "fs/promises";
import path from "path";

export class FileService {
  async uploadFile(userid, file) {
    const newFile = await File.create({
      ...file,
      user: userid,
    });

    return newFile;
  }

  async findAllFiles(userid) {
    const uploadfile = await File.find({
      user: userid,
    });

    return uploadfile;
  }

  async findFileById(fileid, userid) {
    const findfile = await File.findOne({ user: userid, _id: fileid });

    if (!findfile) {
      throw new Error("this user did not upload file!");
    }

    return findfile;
  }
  async deleteFileById(userid, fileid) {
    const findfile = await File.findOne({
      user: userid,
      _id: fileid,
    });

    if (!findfile) {
      throw new Error("File does not exist");
    }

    const filepath = path.resolve(findfile.path);

    try {
      await fs.unlink(filepath);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("File already deleted");
      } else {
        throw error;
      }
    }

    await File.findByIdAndDelete(fileid);

    return findfile;
  }

  async updateFile(filter ,update) {
    const file = await File.findOneAndUpdate(filter,update,{
        returnDocument: "after",
        runValidators:true
    })

    

    if (!file) {
      throw new Error("File does not exist");
    }
    return file;
  }
}
