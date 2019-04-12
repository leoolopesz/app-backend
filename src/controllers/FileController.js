const File = require ('../models/Files');
const Box = require ('../models/Box');


class BoxController {
    async store (req, res){
       const box = await box.findById(req.params.id)

       const file = await File.create({
           title:req.file.originalname,
           path: req.file.key,
       });

       box.files.push(file);

       await box.Save();

       req.io.sockets.in(box._id).emit('file', file);

       return res.json(file);
    }
}

module.exports = new BoxController();

