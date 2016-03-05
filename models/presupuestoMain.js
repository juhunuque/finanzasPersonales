var mongoose = require('mongoose');

var presupuestoMainSchema = mongoose.Schema({
    descripcion:{
        type: String,
        required: true
    },
    fecha_inicio:{
        type: Date,
        required: true
    },
    fecha_final:{
        type: Date,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    valor_categoria:{
        type: Number,
        required: true
    },
    detalles:{
        type: String,
        default: ''
    },
    tipos:{
        type: String,
        default: ''
    }
});

var PresupuestoMain = module.exports = mongoose.model('PresupuestoMain', presupuestoMainSchema);

//Get all Movimientos
module.exports.getPresupuestoMain = function(callback){
    PresupuestoMain.find(callback).sort({_id: -1});
};

//Get Movimiento by ID
module.exports.getPresupuestoMainById = function(id, callback){
    PresupuestoMain.findById(id, callback);
};

//Add a Movimientos
module.exports.createPresupuestoMain = function(newPresupuesto, callback){
  newPresupuesto.save(callback);  
};

//Update a Movimiento
module.exports.updatePresupuestoMain = function(id,data,callback){
    var descripcion = data.descripcion;
    var fecha_inicio = data.fecha_inicio;
    var fecha_final = data.fecha_final;
    var categoria = data.categoria;
    var valor_categoria = data.valor_categoria;
    var detalles = data.detalles;
    var tipos = data.tipos;
    
    var query = {_id: id};
    
    PresupuestoMain.findById(id,function(err,presupuesto){
        if(!presupuesto){
            return next(new Error("Could not load Presupuesto"));
        }
        else{
            //Update
            presupuesto.descripcion = descripcion;
            presupuesto.fecha_inicio = fecha_inicio;
            presupuesto.fecha_final = fecha_final;
            presupuesto.categoria = categoria;
            presupuesto.valor_categoria = valor_categoria;
            presupuesto.detalles = detalles;
            presupuesto.tipos = tipos;
            
            presupuesto.save(callback);
        }
    });
    
};

//Remove an article
module.exports.removePresupuestoMain = function(id,callback){
    PresupuestoMain.find({_id:id}).remove(callback);
};