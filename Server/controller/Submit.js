const Assignuser = require("../Model/User")
// const uploadOnCloudinary = require("../utils/fileupload")
const AssignController = {
    Upload: async (req, res) => {
        const { firstname, lastname, email, dob, Rstreet1, Rstreet2, Pstreet1, Pstreet2, filename1,
            typefile,
            filename2,
            typefile2 } = req.body;

        try {
            if (!(firstname && lastname && email && dob && Rstreet1 && Rstreet2 && Pstreet1 && Pstreet2)) {
                res.status(400).json({
                    message: "all things are required"
                })
                return
            }
            
            const matched = await Assignuser.findOne({ email })
            if (matched) {
                res.status(404).json({
                    message: "already exist"
                })
                return
            }
            
            const file1localpath = req.files && req.files.file1 && req.files.file1[0] ? req.files.file1[0].path : null;
            const file2localpath = req.files && req.files.file2 && req.files.file2[0] ? req.files.file2[0].path : null;
            if(!file1localpath){
                res.status(404).json({
                    message:"image is required"
                })
                return
            }
            if(!file2localpath){
                res.status(404).json({
                    message:"image is required"
                })
                return
            }
            const Asign = await Assignuser.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                dob: dob,
                Rstreet1: Rstreet1,
                Rstreet2: Rstreet2,
                Pstreet1: Pstreet1,
                Pstreet2: Pstreet2,
                file1: file1localpath,
                file2: file2localpath?.url || "",
                filename1: filename1,
                typefile: typefile,
                filename2: filename2,
                typefile2: typefile2
            })
            const users = await Asign.save()

            res.status(200).json({
                succes: true,
                users: users
            })


        } catch (error) {
            console.log(error)
        }


    },

    getdata : async(req,res)=>{
       const alldoc =  await Assignuser.find({})
       res.status(200).json({
        message:"all the images and user",
        data:alldoc
       })
    }
}

module.exports = AssignController