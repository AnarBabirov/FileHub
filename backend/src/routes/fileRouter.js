import { Router } from "express";
import { FileController } from "../controllers/fileController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const fileRouter = Router();
const fileController = new FileController();

fileRouter.post(
  "/upload",
  AuthMiddleware,
  upload.single("file"),
  fileController.uploadFile,
);
fileRouter.get(
  "/getUploads",
  AuthMiddleware,
  upload.single("file"),
  fileController.findAllFiles,
);
fileRouter.get(
  "/findfilebyid/:fileid",
  AuthMiddleware,
  upload.single("file"),
  fileController.findFileById,
);
fileRouter.delete(
  "/deletefilebyid/:id",
  AuthMiddleware,
  upload.single("file"),
  fileController.DeleteFileById,
);
fileRouter.get("/:id/download", AuthMiddleware, fileController.Download);
fileRouter.put("/update/:id", AuthMiddleware, fileController.UpdateFile);

export default fileRouter;
