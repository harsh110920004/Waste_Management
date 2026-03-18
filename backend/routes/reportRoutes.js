import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import Report from "../models/Report.js";
import { verifyWaste } from "../utils/aiCheck.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const uploaded = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {
        if (error) return res.status(500).json(error);

        const aiResult = await verifyWaste(result.secure_url);

        const report = await Report.create({
          image: result.secure_url,
          location: req.body.location,
          aiVerified: aiResult
        });

        res.json(report);
      }
    );

    uploaded.end(file.buffer);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
});

export default router;