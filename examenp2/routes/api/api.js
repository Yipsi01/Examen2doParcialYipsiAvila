var express= require('express');
var router = express.Router();

function initApi(db){
  var exaRoutes = require('./api/incidentes')(db);
  router.use('/incidentes', exaRoutes);
  return router;
}

module.exports = initApi;
