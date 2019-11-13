var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


function initExa(db){
    var exaColl = db.collection('exa');
  router.get('/', (req, res, next)=>{
    incidentesColl.find().toArray((err, incidentes)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"Error al extraer Exa de la base de datos"});
      }
      return res.status(200).json(exa);
    });
  }); // get all

  
  router.get('/:id', (req, res, next)=>{
    var id = new ObjectID(req.params.id);
    incidentesColl.findOne({"_id": id} , (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"No se Puede Obtener Exa Intente de Nuevo"});
      }
      return res.status(200).json(doc);
    });//findOne
  }); // /:id
  


  
  router.post('/', (req, res, next)=>{
    var newexa = Object.assign(
      {},
      
       {
    "Nombre":"",
    "Autor":"",
    "PaisOrigen":"",
    "NumeroTomos": 0,
    "Estado": [],
    "KeyWords": [],
    "Categorias":[]
  },
      req.body 
    );
    exaColl.insertOne(newexa, (err, rslt)=>{
      if(err){
          //
        console.log(err);
        return res.status(404).json({"error":"No se pudo agregar nuevo exa"});
      }
      if(rslt.ops.length===0){
        console.log(rslt);
        return res.status(404).json({ "error": "No se pudo agregar nuevo exa" });
      }
      return res.status(200).json(rslt.ops[0]);
    });
  });//post

  

  router.put('/asign/:id', (req, res, next)=>{
    var query = {"_id":new ObjectID(req.params.id)};
    var update = {"$inc":{"usuarioAsignado":"abre", "estado":"Asignado", "fechaAsignacion": new Date().getTime()}};

    exaColl.updateOne(query, update, (err, rslt)=>{
      if (err) {
        console.log(err);
        return res.status(404).json({ "error": "No se pudo modificar exa" });
      }
      
      return res.status(200).json(rslt);
    })
  }); // put asign



  router.put('/close/:id', (req, res, next)=>{
    var query = {"_id":new ObjectID(req.params.id)};
    var update = {"$inc":{"usuarioAsignado":"cierre", "estado":"Cerrado", "fechaHoraCerrado": new Date().getTime()}};

    exaColl.updateOne(query, update, (err, rslt)=>{
      if (err) {
        console.log(err);
        return res.status(404).json({ "error": "No se pudo modificar exa" });
      }
      
      return res.status(200).json(rslt);
    })
  }); // put close

  router.delete('/:id', (req, res, next) => {
    var query = { "_id": new ObjectID(req.params.id) };
    exaColl.removeOne(query, (err, rslt) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ "error": "No se pudo eliminar exa" });
      }

      return res.status(200).json(rslt);
    })
  }); // delete

  return router;

}

module.exports = initexa
  