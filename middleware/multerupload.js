const multer = require('multer')
const path = require('path')
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let filename = Date.now() + '-' + path.extname(file.originalname)
        cb(null,filename)
    }
})
const imageonly = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    }
    else {
        cb(new Error('only image upload'), false)
    }
}
const upload = multer({
    storage: storage,
    limit: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: imageonly
})
module.exports = { upload }