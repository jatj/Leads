/* ############################################ CLASSES ############################################ */
/* ------- Clase para visualizar el sector ------- */
class Sector{
	constructor(id, name, description, img, iconClass){
		this.id = id;
		this.name = name;
		this.img = img;
		this.iconClass = iconClass;
		this.description = description;
		this.selected = false;
	}

	toGridItem(index){
		return `
		<div class="col-xs-4 col-sm-4">
		  <div data-id="${this.id}" data-index="${index}" class="pic">
		   <img src="${this.img}" class="img-rounded img-responsive" alt="${this.name}">
		   <div class="overlay img-rounded">
		      <p class="name" >${this.name}</p>
		      <div class="iconoGrid">
		        <i class="fa ${this.iconClass}" aria-hidden="true"></i>
		      </div>
		      <div class="botonera">
		        <button class="btn izquierdo"><i class="fa ${this.iconClass}" aria-hidden="true"></i></button>
		        <button class="btn derecho"><i class="fa fa-question" aria-hidden="true"></i></button>
		      </div>
		   </div>
		  </div>
		</div>
		`;
	}
}
/* ------- Clase para visualizar la accion ------- */
class Accion{
	constructor(id, idSector, name, description, conditions, nameSector, img, iconClass){
		this.id = id;
		this.idSector = idSector;
		this.name = name;
		this.description = description;
		this.conditions = conditions;
		this.nameSector = nameSector;
		this.img = img;
		this.iconClass = iconClass;
		this.selected = false;
	}

	toGridItem(index){
		return `
		<div class="col-xs-4 col-sm-4">
		  <div data-id="${this.id}" data-index="${index}" class="pic">
		   <img src="${this.img}" class="img-rounded img-responsive" alt="${this.name}">
		   <div class="overlay img-rounded">
		      <p class="name" >${this.name}</p>
		      <div class="iconoGrid">
		        <i class="fa ${this.iconClass}" aria-hidden="true"></i>
		      </div>
		      <div class="botonera">
		        <button class="btn izquierdo"><i class="fa ${this.iconClass}" aria-hidden="true"></i></button>
		        <button class="btn derecho"><i class="fa fa-question" aria-hidden="true"></i></button>
		      </div>
		   </div>
		  </div>
		</div>
		`;
	}
}

/* ############################################ PROVIDERS ############################################ */
/* ------- Provider base ------- */
class Provider{
	constructor(debug){
		this.debug = debug;
	}

	toProduction(){
		this.debug = false;
	}

	toDevelopment(){
		this.debug = true;
	}

	log(str){
    if(this.debug)
    	console.log(str);
	}
}
/* ------- Clase para visualizar obtener datos de la base de datos ------- */
class DBProvider extends Provider{
	constructor(debug){
		super(debug);
	}
	
	// Obtiene los datos de los sectores
	getSectores(){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `php/getSectores.php`,
        action: 'POST',
       	data: {},
        async: true,
        success: (data) => {
          // this.log(data);
          resolve(JSON.parse(data));
        },
        cache: false,
        contentType: false,
        processData: false
      }).catch((error) => reject(error));
    });
	}

	// Convierte de un arreglo asociativo a la clase sector
	toSector(row){
		return new Sector(row["idSectores"],row["nombre"],row["descripcion"],row["imagen"],row["logo"]);
	}

	// Obtiene los datos de los acciones
	getAcciones(){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `php/getAcciones.php`,
        action: 'POST',
       	data: {},
        async: true,
        success: (data) => {
          // this.log(data);
          resolve(JSON.parse(data));
        },
        cache: false,
        contentType: false,
        processData: false
      }).catch((error) => reject(error));
    });
	}

	// Convierte de un arreglo asociativo a la clase accion
	toAccion(row){
		return new Accion(row["idAcciones"],row["fkSectores"],row["nombre"],row["descripcion"],row["condiciones"],row["nombreSector"],row["imagenSector"],row["logoSector"]);
	}

	separator(){
		return `<div class="col-xs-12 separador"></div>`;
	}
}

/* ############################################ FUNCTIONS ############################################ */
/* ------- Funcion que busca en un arreglo una proiedad dada con un valor dado ------- */
function searchKey(){

}