var mongoose = require('mongoose');

var bancosSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String
    }
});

var Banco = module.exports = mongoose.model('Banco', bancosSchema);

//Get all Bancos
module.exports.getBancos = function(callback){
    Banco.find(callback).sort({_id: -1});
};

//Get Banco by ID
module.exports.getBancoById = function(id, callback){
    Banco.findById(id, callback);
};


//Add a Bancos
module.exports.createBanco = function(newBanco, callback){
  newBanco.save(callback);  
};

//Update a Banco
module.exports.updateBanco = function(id,data,callback){
    var nombre = data.nombre;
    var descripcion = data.descripcion;
    
    var query = {_id: id};
    
    Banco.findById(id,function(err,banco){
        console.log(banco);
        if(!banco){
            return next(new Error("Could not load Banco"));
        }
        else{
            //Update
            banco.nombre = nombre;
            banco.descripcion = descripcion;
            
            banco.save(callback);
        }
    });
    
};

//Remove an article
module.exports.removeBanco = function(id,callback){
    Banco.find({_id:id}).remove(callback);
};