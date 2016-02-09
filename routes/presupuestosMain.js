var express = require('express');
var router = express.Router();

var PresupuestoMain = require('../models/presupuestoMain');

router.get('/', function(req, res, next) {
  PresupuestoMain.getPresupuestoMain(function(err,presupuestos){
      if(err){
          console.log(err);
      }
      res.json(presupuestos);
  });  
});

// If you want a parameter, you just need to declare it in the URL(Example: :id)
router.get('/:id', function(req, res, next) {
  PresupuestoMain.getPresupuestoMainById(req.params.id,function(err,presupuesto){
      if(err){
          console.log(err);
      }
      res.json(presupuesto);
  });  
});


router.post("/",function(req, res, next){
    //Get Form Values
    var descripcion = req.body.descripcion;
    var fecha_inicio = req.body.fecha_inicio;
    var categoria = req.body.categoria;
    var valor_categoria = req.body.valor_categoria;
    var detalles = req.body.detalles;
    
    var newPresupuesto = new PresupuestoMain({
        descripcion: descripcion,
        fecha_inicio: fecha_inicio,
        categoria: categoria,
        valor_categoria: valor_categoria,
        detalles: detalles
        
    })
    
    PresupuestoMain.createPresupuestoMain(newPresupuesto, function(err,presupuesto){
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
        fecha_inicio: req.body.fecha_inicio,
        categoria: req.body.categoria,
        valor_categoria: req.body.valor_categoria,
        detalles: req.body.detalles
    };
    
    PresupuestoMain.updatePresupuestoMain(id, data, function(err, presupuesto){
       if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

router.delete("/:id",function(req, res, next){
    var id = req.params.id;
    
    PresupuestoMain.removePresupuestoMain(id,function(err, presupuesto){
        if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

module.exports = router;
