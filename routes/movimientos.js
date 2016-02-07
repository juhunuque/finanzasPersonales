var express = require('express');
var router = express.Router();

var Movimiento = require('../models/movimiento');

router.get('/', function(req, res, next) {
  Movimiento.getMovimientos(function(err,movimientos){
      if(err){
          console.log(err);
      }
      res.json(movimientos);
  });  
});

// If you want a parameter, you just need to declare it in the URL(Example: :id)
router.get('/:id', function(req, res, next) {
  Movimiento.getMovimientoById(req.params.id,function(err,movimiento){
      if(err){
          console.log(err);
      }
      res.json(movimiento);
  });  
});

router.get('/tipo/:tipo', function(req, res, next) {
  Movimiento.getMovimientoByTipo(req.params.tipo,function(err,movimientos){
      if(err){
          console.log(err);
      }
      res.json(movimientos);
  });  
});

router.post("/",function(req, res, next){
    //Get Form Values
    var movimiento = req.body.movimiento;
    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var categoria = req.body.categoria;

    var newMovimiento = new Movimiento({
        movimiento: movimiento,
        monto: monto,
        tipo: tipo,
        categoria: categoria
    })
    
    Movimiento.createMovimiento(newMovimiento, function(err,movimiento){
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
        movimiento: req.body.movimiento,
        monto: req.body.monto,
        tipo: req.body.tipo
    };
    
    Movimiento.updateMovimiento(id, data, function(err, movimiento){
       if(err){
           console.log(err);
       } 
        
        res.location('/movimientos');
        res.redirect('/movimientos');
    });
});

router.delete("/:id",function(req, res, next){
    var id = req.params.id;
    
    Movimiento.removeMovimiento(id,function(err, movimiento){
        if(err){
            console.log(err);
        }
        
        res.location("/movimientos");
        res.redirect("/movimientos");
    });
});

module.exports = router;
