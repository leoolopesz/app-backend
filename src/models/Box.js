const mongoose = require('mongoose');

const Box = new mongoose.Schema(
    {
// registro é obrigatório(require:true) ter um titulo do tipo(type) String 
    title: {
        type: String,
        required: true
    },
    files:[
        {type: mongoose.Schema.Types.ObjectId, ref:"File"}]
    },
    {
    timestamps: true //armazena a data de criacao e edicao de um registro
    }
);

module.exports = mongoose.model ("Box", Box);