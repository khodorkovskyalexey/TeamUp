const multer = require('@koa/multer')

const { AVATAR_FOLDER_PATH } = require('../configs/env')
const token_service = require('../services/token_service')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, AVATAR_FOLDER_PATH)
    },
    filename: (req, file, cb) => {
        const id = token_service.getIdInAccessTokenHeader(req.headers['authorization'])
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
        cb(null, id + ext)
    },
})

const upload = multer({ storage })

module.exports = upload.single('avatar')