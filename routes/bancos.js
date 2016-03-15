var express = require('express');
var router = express.Router();

var Banco = require('../models/banco');

router.get('/', function(req, res, next) {
  Banco.getBancos(function(err,bancos){
      if(err){
          console.log(err);
      }
      res.json(bancos);
  });  
});

// If you want a parameter, you just need to declare it in the URL(Example: :id)
router.get('/:id', function(req, res, next) {
  Banco.getBancoById(req.params.id,function(err,banco){
      if(err){
          console.log(err);
      }
      res.json(banco);
  });  
});


router.post("/",function(req, res, next){
    //Get Form Values
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;

    
    var newBanco = new Banco({
        nombre: nombre,
        descripcion: descripcion
    })
    
    Banco.createBanco(newBanco, function(err,banco){
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
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };
    
    Banco.updateBanco(id, data, function(err, banco){
       if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

router.delete("/:id",function(req, res, next){
    var id = req.params.id;
    
    Banco.removeBanco(id,function(err, banco){
        if(err){
           console.log(err);
           res.status(500).json({status:500,error:err});
       } 
        
        res.status(200).json({status:200});
    });
});

module.exports = router;
