var mongoose = require('mongoose');

var movimientosSchema = mongoose.Schema({
    movimiento:{
        type: String,
        required: true
    },
    monto:{
        type: Number,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now,
        required: true
    },
    tipo:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    }
});

var Movimiento = module.exports = mongoose.model('Movimiento', movimientosSchema);

//Get all Movimientos
module.exports.getMovimientos = function(callback){
    Movimiento.find(callback);
};

//Get Movimiento by ID
module.exports.getMovimientoById = function(id, callback){
    Movimiento.findById(id, callback);
};

//Get Movimientos by Tipo
module.exports.getMovimientoByTipo = function(tipo,callback){
    var query = {tipo: tipo}
    Article.find(query,callback);
};

//Add a Movimientos
module.exports.createMovimiento = function(newMovimiento, callback){
  newMovimiento.save(callback);  
};

//Update a Movimiento
module.exports.updateMovimiento = function(id,data,callback){
    var movimiento = data.movimiento;
    var monto = data.monto;
    var tipo = data.tipo;
    var categoria = data.categoria
    
    var query = {_id: id};
    
    Movimiento.findById(id,function(err,movimiento){
        if(!movimiento){
            return next(new Error("Could not load Movimiento"));
        }
        else{
            //Update
            movimiento.movimiento = movimiento;
            movimiento.monto = monto;
            movimiento.tipo = tipo;
            movimiento.categoria = categoria;
            
            movimiento.save(callback);
        }
    });
    
};

//Remove an article
module.exports.removeMovimiento = function(id,callback){
    Movimiento.find({_id:id}).remove(callback);
};