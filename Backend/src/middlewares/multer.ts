import multer from "multer";

const storageEngine = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({
    storage: storageEngine,
    fileFilter(req, file, cb) {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("only .png , .jpeg , .jpg formats are only allowed"))
        }
    }
})
export default upload