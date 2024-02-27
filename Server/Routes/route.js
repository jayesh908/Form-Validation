const AssignController = require("../controller/Submit")
const upload = require("../middleware/multer_middleware")
const route = require("express").Router()


route.post("/upload",upload.fields([
    {
        name:"file1",
        maxCount:1
    },
    {
        name:"file2",
        maxCount:1
    }
]),AssignController.Upload)
route.get("/uploaded", AssignController.getdata)


module.exports = route