import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// })
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
})

// const upload = multer({
//     storage: storage,
// });

export default upload;