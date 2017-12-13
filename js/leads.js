/* ############################################ MAIN ############################################ */
$(document).ready(function() {
  // Variable que habilita los logs
  const DEBUGGING = true;

  // Inicializa los steps
  var steps = new Steps();

  // Inicializa el grid
  var grid = new Grid();
  
  // Inicializa el DBProvider
  var dbProvider = new DBProvider(DEBUGGING);

  // Callback de cambio de step
  function changeCallback(stepIndex){
    dbProvider.log(stepIndex);
  }

  var sectores = [];
  // Obtiene los sectores
  dbProvider.getSectores().then((data, mensaje) => {
    dbProvider.log("success sectores");
    var gridHTML = "";
    // Genera html de los sectores
    for(let i in data){
      sectores.push(dbProvider.toSector(data[i]));
      gridHTML += sectores[i].toGridItem(i);
      if((parseInt(i) + 1) % 3  == 0)
        gridHTML += dbProvider.separator();
    }
    // Carga html en la pagina
    $("#gridPreferences").html(gridHTML).promise().done(()=>{
      // Inicializa los steps
      steps.initializeSteps(changeCallback);
      // Inicializa el grid de sectores
      grid.initializeGrid(sectores).then(()=>{
        $("#loader").slideUp();
        $("#leadsContent").slideDown();
      });
    });
  }).catch((error) => dbProvider.log(error));

  var acciones = [];
  // Obtiene los acciones
  dbProvider.getAcciones().then((data, mensaje) => {
    dbProvider.log("success acciones");
    for(let i in data){
      acciones.push(dbProvider.toAccion(data[i]));
    }
    dbProvider.log(acciones);
  });
});

