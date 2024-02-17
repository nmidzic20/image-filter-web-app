const express = require("express");
const multer = require("multer");
const shell = require("shelljs");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, "uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/process", upload.single("image"), (req, res) => {
  const scriptPath = path.join(
    __dirname,
    ".",
    "build",
    "Debug",
    "opencvtest.exe"
  );
  const imagePath = req.file.path;
  const filter = req.body.filter;

  const command = `${scriptPath} "${imagePath}" ${filter}`;

  shell.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing C++ program: ${error}`);
      res.status(500).send(`Error executing C++ program: ${error}`);
      return;
    }

    console.log(`C++ program successfully executed`);

    const processedImagePath = path.join(__dirname, "processed_image.jpg");
    res.sendFile(processedImagePath);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`);
});
