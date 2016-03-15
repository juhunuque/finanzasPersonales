var mongoose = require('mongoose');

var ahorroSchema = mongoose.Schema({
    numeroCuenta:{
        type: String,
        required: true
    },
    banco:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true
    },
    saldo:{
        type: Number,
        default: 0
    },
    tasa:{
        type: Number,
        required:true,
        default:0
    },
    movimientos:{
        type: String,
        default: ''
    },
    intereses:{
        type: String,
        default: ''
    }
});

var Ahorro = module.exports = mongoose.model('Ahorro', ahorroSchema);

//Get all Ahorros
module.exports.getAhorros = function(callback){
    Ahorro.find(callback).sort({_id: -1});
};

//Get Ahorro by ID
module.exports.getAhorroById = function(id, callback){
    Ahorro.findById(id, callback);
};


//Add a Ahorros
module.exports.createAhorro = function(newAhorro, callback){
  newAhorro.save(callback);  
};

//Update a Ahorro
module.exports.updateAhorro = function(id,data,callback){
    var numeroCuenta = data.numeroCuenta;
    var descripcion = data.descripcion;
    var banco = data.banco;
    var saldo = data.saldo;
    var tasa = data.tasa;
    var movimientos = data.movimientos;
    var intereses = data.intereses;
    
    var query = {_id: id};
    
    Ahorro.findById(id,function(err,ahorroVar){
        console.log(ahorroVar);
        if(!ahorroVar){
            return next(new Error("Could not load Ahorro"));
        }
        else{
            //Update
            ahorroVar.numeroCuenta = numeroCuenta;
            ahorroVar.descripcion = descripcion;
            ahorroVar.banco = banco;
            ahorroVar.saldo = saldo;
            ahorroVar.tasa = tasa;
            ahorroVar.movimientos = movimientos;
            ahorroVar.intereses = intereses;
            
            ahorroVar.save(callback);
        }
    });
    
};

//Remove an article
module.exports.removeAhorro = function(id,callback){
    Ahorro.find({_id:id}).remove(callback);
};