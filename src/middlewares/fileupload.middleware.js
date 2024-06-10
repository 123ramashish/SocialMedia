import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { ObjectId } from "mongodb";
// Create storage engine
const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/SocialMedia",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const userId = req.userId; 
    const caption = req.body.caption;

    return {
      bucketName: "posts", 
      filename: new Date().toISOString().replace(/:/g, "_") + file.originalname,
      metadata: {
        userId: new ObjectId(userId),
        caption: caption,
      },
    };
  },
});

// Initialize multer with GridFS storage engine
const upload = multer({ storage });

export { upload };
