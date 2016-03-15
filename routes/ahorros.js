var express = require('express');
var router = express.Router();

var Ahorro = require('../models/ahorro');

router.get('/', function(req, res, next) {
  Ahorro.getAhorros(function(err,ahorros){
      if(err){
          console.log(err);
      }
      res.json(ahorros);
  });  
});

// If you want a parameter, you just need to declare it in the URL(Example: :id)
router.get('/:id', function(req, res, next) {
  Ahorro.getAhorroById(req.params.id,function(err,ahorro){
      if(err){
          console.log(err);
      }
      res.json(ahorro);
  });  
});

router.get('/movimientos/:id', function(req, res, next) {
  Ahorro.getAhorroById(req.params.id,function(err,ahorro){
      if(err){
          console.log(err);
      }
      res.json(ahorro.movimientos || {});
  });  
});


router.post("/",function(req, res, next){
    //Get Form Values
    var numeroCuenta = req.body.numeroCuenta;
    var banco = req.body.banco;
    var descripcion = req.body.descripcion;
    var saldo = req.body.saldo;
    var tasa = req.body.tasa;
    var movimientos = req.body.movimientos;
    var intereses = req.body.intereses;
    
    var newAhorro = new Ahorro({
        numeroCuenta: numeroCuenta,
        banco: banco,
        descripcion: descripcion,
        saldo: saldo,
        tasa: tasa,
        movimientos: movimientos,
        intereses: intereses
        
    })
    
    Ahorro.createAhorro(newAhorro, function(err,ahorro){
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
        numeroCuenta: req.body.numeroCuenta,
        banco: req.body.banco,
        descripcion: req.body.descripcion,
        saldo: req.body.saldo,
        tasa: req.body.tasa,
        movimientos: req.body.movimientos,
        intereses: req.body.intereses
    };
    
    Ahorro.updateAhorro(id, data, function(err, ahorro){
       if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

router.delete("/:id",function(req, res, next){
    var id = req.params.id;
    
    Ahorro.removeAhorro(id,function(err, ahorro){
        if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

module.exports = router;
