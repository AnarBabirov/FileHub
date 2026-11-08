import { FileService } from "../services/fileService.js";
export class FileController {
  fileService = new FileService();
  uploadFile = async (req, res) => {
    const userid = req.user.id;
    const file = req.file;
    try {
      if (!file) {
        return res.status(400).json({
          message: "File is required",
        });
      }
      const getfile = await this.fileService.uploadFile(userid, file);
      res.status(201).json({
        message: "file uploaded succesfully!",
        uploadfile: getfile,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  findAllFiles = async (req, res) => {
    const userid = req.user.id;
    try {
      const findfiles = await this.fileService.findAllFiles(userid);

      res.status(200).json({
        message: "Uploaded successfully!",
        files: findfiles,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  findFileById = async (req, res) => {
    const fileid = req.params.fileid;
    const userid = req.user.id;
    try {
      const find = await this.fileService.findFileById(fileid, userid);
      res.status(200).json({
        message: "Filter is successful!",
        res: find,
      });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  };
  DeleteFileById = async (req, res) => {
    const userid = req.user.id;
    const fileid = req.params.id;
    try {
      const deleteFile = await this.fileService.deleteFileById(userid, fileid);
      res
        .status(200)
        .json({ message: "File deleted succesfully", res: deleteFile });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  };
  Download = async (req, res) => {
    const userid = req.user.id;
    const fileid = req.params.id;
    try {
      const download = await this.fileService.findFileById(fileid, userid);
      res.status(200).download(download.path, download.originalname);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  };

  UpdateFile = async (req, res) => {
    const userid = req.user.id;
    const fileid = req.params.id;

    try {
        
      const update = await this.fileService.updateFile(
        {
          user: userid,
          _id: fileid,
        },
        req.body,
      );

      res
        .status(200)
        .json({ message: "File updated succesfully", res: update });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  };
}
