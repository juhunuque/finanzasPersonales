var mongoose = require('mongoose');

var tipoMovimientosSchema = mongoose.Schema({
    descripcion:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true
    }
});

var TipoMovimiento = module.exports = mongoose.model('TipoMovimiento', tipoMovimientosSchema);

//Get all Movimientos
module.exports.getTiposMovimientos = function(callback){
    TipoMovimiento.find(callback).sort({_id: -1});
};

//Get Movimiento by ID
module.exports.getTipoMovimientoById = function(id, callback){
    TipoMovimiento.findById(id, callback);
};

//Get Movimientos by Tipo
module.exports.getTiposMovimientosByTipo = function(tipo,callback){
    var query = {tipo: tipo}
    TipoMovimiento.find(query,callback);
};

//Add a Movimientos
module.exports.createTipoMovimiento = function(newMovimiento, callback){
  newMovimiento.save(callback);  
};

//Update a Movimiento
module.exports.updateTipoMovimiento = function(id,data,callback){
    var descripcion = data.descripcion;
    var tipo = data.tipo;
    
    var query = {_id: id};
    
    TipoMovimiento.findById(id,function(err,tipoMovimiento){
        console.log(tipoMovimiento);
        if(!tipoMovimiento){
            return next(new Error("Could not load Movimiento"));
        }
        else{
            //Update
            tipoMovimiento.descripcion = descripcion;
            tipoMovimiento.tipo = tipo;
            
            tipoMovimiento.save(callback);
        }
    });
    
};

//Remove an article
module.exports.removeTipoMovimiento = function(id,callback){
    TipoMovimiento.find({_id:id}).remove(callback);
};