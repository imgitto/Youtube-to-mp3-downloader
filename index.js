let express = require("express");
let ytdl = require("ytdl-core");

let app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/videoInfo", async function(req,res){
	let videoURL = req.query.videoURL;
	let info = await ytdl.getInfo(videoURL);
	res.status(200).json(info);
});

app.get("/download", function(req,res){
	let videoURL = req.query.videoURL;
	let itag = req.query.itag;
	let filename = req.query.filename.replace(/[^a-zA-Z0-9_\. ]/g, "-");
	res.setHeader("Content-Disposition", 'attachment;\ filename="'+filename+'"');
	ytdl(videoURL, {
		filter: format => format.itag == itag
	}).pipe(res);
});

app.listen(5000);