const express = require("express");
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const fileUpload = require("express-fileupload");
const { uploadFile, downloadFile } = require("./s3");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.get("/", (req, res) => {
	return res.render("index");
});
// app.post("/upload", async (req, res) => {
// 	res.send("Hello from upload");
// });
app.get('/uploads/:Key', (req, res) => {
	const key = req.params.Key;
	const file = downloadFile(key);
	file.pipe(res)
})

app.post("/upload", async (req, res) => {
	const file = req.files.uploadImage;
	console.log(file);
	const fileName = uuidV4().toString() + path.extname(file.name);
	const result = await uploadFile(file.data, fileName);
	console.log("AWS RESULT", result);
	return res.redirect(`/uploads/${result.Key}`);
});
app.listen(3000, () => console.log(`localhost on ${3000}`));
