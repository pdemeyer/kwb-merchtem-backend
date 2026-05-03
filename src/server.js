import express from "express";
import multer from "multer";
import cors from "cors";
import { uploadToSharePoint } from "./graphUpload.js";
import { validateAccessToken } from "./validateToken.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer();

console.log("ENV:", process.env);

app.use(cors());

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const rawAuth = req.headers.authorization;
    const token = validateAccessToken(rawAuth);

    const folder = req.query.folder || "Uploads";

    await uploadToSharePoint({
      token,
      file: req.file,
      folder
    });

    res.send("OK");
  } catch (err) {
    console.error(err);
    if (err.message.startsWith("Invalid") || err.message.startsWith("Missing")) {
      return res.status(401).send("Unauthorized");
    }
    res.status(500).send("Upload failed");
  }
});

app.get("/health", (req, res) => res.send("OK"));

app.listen(3000, () => console.log("API running on port 3000"));
