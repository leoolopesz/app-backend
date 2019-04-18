const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
// registro é obrigatório(require:true) ter um titulo do tipo(type) String 
        title: {
            type: String,
            required: true
        },

        path: {
            type:String,
            required:true
            }
        },
        {
            timestamps: true, //armazena a data de criacao e edicao de um registro
            toObject: { virtuals: true },
            toJSON: { virtuals: true }
        }
);

File.virtual('url').get(function(){
   const url = process.env.URL || 'http://localhost:3333/';
    
   return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model ("File", File);