import multer from 'multer';
import createHttpError from "http-errors";


const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/quicktime",
]
const fileFilter = (req, file, cb) =>{
    if(!allowedMimeTypes.includes(file.mimetype)){
        cb( createHttpError(400, "Only JPG, PNG, WebP, GIF, MP4, WebM and MOV files are allowed"), false);
    }
    cb(null, true);
}
// save file temporary in RAM 
const storage = multer.memoryStorage();
// ========== Storage ==============
// -------Memory storage-----------=
// req.file.buffer                 =
// req.file.mimetype               =
// req.file.originalname           =
// req.file.size                   =
// --------Disk storage------------=
// req.file.filename               =
// req.file.path                   =
// ========== Storage ==============
export const upload = multer({
    storage, 
    fileFilter, 
    limits: {
        fileSize: 20 * 1024 * 1024, // MAX: 20MB/1 file
        file: 1
    }
})