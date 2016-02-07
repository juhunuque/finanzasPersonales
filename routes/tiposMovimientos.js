var express = require('express');
var router = express.Router();

var TipoMovimiento = require('../models/tipoMovimiento');

router.get('/', function(req, res, next) {
  TipoMovimiento.getTiposMovimientos(function(err,movimientos){
      if(err){
          console.log(err);
      }
      res.json(movimientos);
  });  
});

// If you want a parameter, you just need to declare it in the URL(Example: :id)
router.get('/:id', function(req, res, next) {
  TipoMovimiento.getTipoMovimientoById(req.params.id,function(err,movimiento){
      if(err){
          console.log(err);
      }
      res.json(movimiento);
  });  
});

router.get('/tipo/:tipo', function(req, res, next) {
  TipoMovimiento.getTiposMovimientosByTipo(req.params.tipo,function(err,movimientos){
      if(err){
          console.log(err);
      }
      res.json(movimientos);
  });  
});

router.post("/",function(req, res, next){
    //Get Form Values
    var descripcion = req.body.descripcion;
    var tipo = req.body.tipo;
    
    var newMovimiento = new TipoMovimiento({
        descripcion: descripcion,
        tipo: tipo
    })
    
    TipoMovimiento.createTipoMovimiento(newMovimiento, function(err,movimiento){
       if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});

    });
});

router.put("/",function(req,res,next){
    var id = req.body.id;
    var data = {
        descripcion: req.body.descripcion,
        tipo: req.body.tipo
    };
    
    TipoMovimiento.updateTipoMovimiento(id, data, function(err, movimiento){
       if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

router.delete("/:id",function(req, res, next){
    var id = req.params.id;
    
    TipoMovimiento.removeTipoMovimiento(id,function(err, movimiento){
        if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

module.exports = router;
