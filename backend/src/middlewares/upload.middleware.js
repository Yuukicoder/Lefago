import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb) =>{
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
})
const fileFilter = (req, file, cb) =>{
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    if(!isImage || isVideo){
        cb(new Error("Only video or image files are allowed"), false);
    }
    cb(null, true);
}
export const upload = multer({
    storage, 
    fileFilter
})