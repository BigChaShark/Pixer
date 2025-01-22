const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
// ตั้งค่า multer สำหรับอัปโหลดไฟล์ไปยังโฟลเดอร์ "public/images"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public/images");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint สำหรับอัปโหลดรูปภาพ
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = `/images/${req.file.filename}`;
  res.status(200).json({ path: filePath });
});

app.post("/delete", (req, res) => {
  const { path: filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "No file path provided" });
  }

  const fullFilePath = path.join(__dirname, "public", filePath);
  console.log("Full file path:", fullFilePath); // Debug ดู path ที่ได้

  fs.access(fullFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found:", fullFilePath); // Log เมื่อไฟล์ไม่เจอ
      return res.status(404).json({ error: "File not found" });
    }

    fs.unlink(fullFilePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
        return res.status(500).json({ error: "Failed to delete file" });
      }

      res.status(200).json({ message: "File deleted successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
