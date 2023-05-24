// import multer from "multer";

// const DIR = "../images"
// const storageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR)
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('_')
//         cb(null, fileName)
//     }
// })

// const upload = multer({
//     storage: storageEngine,
//     fileFilter(req, file, cb) {
//         if (file.mimetype === "image/jpeg" || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {

//             cb(null, true)
//         } else {
//             cb(null, false)
//             return cb(new Error("only .png , .jpg, .jpeg formats are allowed"))
//         }
//     },
// })

// export default upload
