
/**
 * Variable Global para manejar las colecciones del Juego
 */
 var coleccion = {
 	"Ediciones": [
 		{	
 			"Id":"1", 
 			"Nombre":"Furia",
 			"Cartas": [
			    {"Id":"1", "Nombre":"Arturo de Camelot"},
				{"Id":"2", "Nombre":"Zeus"},
				{"Id":"3", "Nombre":"Thor"},
				{"Id":"4", "Nombre":"Devastador"},
				{"Id":"5", "Nombre":"Xolotl"},
				{"Id":"6", "Nombre":"Anubis"},
				{"Id":"7", "Nombre":"Thanatos "},
				{"Id":"8", "Nombre":"Percival"},
				{"Id":"9", "Nombre":"Pryderi"},
				{"Id":"10", "Nombre":"Bola de Fuego"}
			],
 		},
 		{
 			"Id":"2", 
 			"Nombre":"Furia Extensión",
 			"Cartas": [
			    {"Id":"1", "Nombre":"Arturo de Camelot"},
				{"Id":"2", "Nombre":"Zeus"},
				{"Id":"3", "Nombre":"Thor"},
				{"Id":"4", "Nombre":"Devastador"},
				{"Id":"5", "Nombre":"Xolotl"}
			],
 		}
	],	
	"totalFuria": 190,
	"totalFuriaExtension": 90
}

/**
 * Variables Globales de la Aplicación
 */
var myl;
var cartas_en_castillo = 10;
var cartas_en_mano = 4;

//Objeto principal del Juego
myl = new Myl();


myl.llenarColeccion();

/**
 * Función que da Inicio del Juego
 */
function comenzar(){
	//Inicializo el Castillo, la mano y los indicadores
/*	myl.Castillo.generarCastilloAleatorio(50);
	myl.Mano.generarMano(8);
	myl.Indicadores.mostrarIndicadores();

	myl.pintarColecciones();
	myl.Mano.pintarMano(mano);*/
}


/**
 * Class Myl
 * Clase principal del Juego
 */
function Myl(){
	this.Colecciones = coleccion;
	this.Castillo = new Castillo();
	this.Mano = new Mano();
	this.Indicadores = new Indicadores();
	this.totalCartas = function(){
		return (this.Colecciones.totalFuria + this.Colecciones.totalFuriaExtension);
	};
	this.pintarColecciones = function(){
		var result = '';
		myl.Colecciones.Ediciones.forEach(function(edicion, index){
			result += '<p>' + edicion.Nombre + '</p>';
			edicion.Cartas.forEach(function(carta, index){
				result += '<div class="carta_coleccion">' + carta.Nombre + '</div>';					
			});
		});		
		document.getElementById('colecciones').innerHTML = result;
	};
	this.Coleccion = [];
	this.llenarColeccion = function(){
		myl.Colecciones.Ediciones.forEach(function(edicion, index){
			edicion.Cartas.forEach(function(carta, index){
				myl.Coleccion.push(carta);				
			});
		});		
	};
}
/**
 * Fin Class Myl
 */

/**
 * Class Castillo
 */
function Castillo(){
	this.Cartas = [];
	this.generarCastilloAleatorio = function(numeroCartas){
		for (var i = 0; i <= numeroCartas - 1; i++){
			var carta = myl.Colecciones.Furia.randomElement();
			this.Cartas.push(carta);	
		}
	};
	/**
	 * Función que agrega carta al Castillo.
	 */
	this.agregarCarta = function(){
		if (this.cartasEnCastillo() < cartas_en_castillo){
			myl.Castillo.Cartas.push(myl.Coleccion.randomElement());
		} else{
			console.log('Castillo armado!');
		}
	};
	this.cartasEnCastillo = function(){
		return myl.Castillo.Cartas.length;
	};
}
/**
 * Fin Class Castillo
 */

/**
 * Class Mano
 */
function Mano(){
	this.Cartas = [];
	this.cartasEnMano = function(){
		return this.Cartas.length;
	};
	this.cambiarMano = function(){
		if (this.cartasEnMano() <= 1){
			console.log('No puede cambiar mano');
			return;
		}
		this.generarMano(this.cartasEnMano() - 1);
	};
	/**
	 * Gernera mano desde las cartas en Castillo.
     * @param {int} numeroCartas
     * @return {Genera la mano para comenzar el juego}
     */
	this.generarMano = function(cantidad){
		this.Cartas = [];
		if (myl.Castillo.cartasEnCastillo() == cartas_en_castillo){ 
			for (var i = 0; i <= cantidad - 1; i++){
				this.Cartas.push(myl.Castillo.Cartas.randomElement());	
			}
		} else{
			console.log('Complete las cartas en Castillo...');
		}
	};
	this.descartarCarta = function(){
		if (this.cartasEnMano() <= 0){
			console.log('No tienes cartas en mano');
			return;
		}
		this.Cartas.splice(0,1); //hacer el primer parámetro RANDOM, para que no se descarte siempre la mismo carta
	};
	/**
	 * Función que pinta las cartas en mano
	 */
	this.pintarMano = function pintarMano(){
		var result = '';
		myl.Mano.Cartas.forEach(function(carta, index){
			result += '<div class="col-md-1 carta bordes">' + carta.Nombre + '</div>';
		});
		document.getElementById('mano').innerHTML = result;
	};
}
/**
 * Fin Class Mano
 */

/**
 * Class Carta
 */
function Carta(nombre){
	this.Nombre = nombre;
	this.mover = function(origen, destino){
		console.log('Carta <' + this.Nombre + '> movida desde "' + origen + '" a "' + destino + '"');
	}
}
/**
 * Fin Class Carta
 */

/**
 * Class Oro
 */
function Oro(){

}

Oro.prototype = new Carta();
Oro.prototype.constructor = Oro;
/**
 * Fin Class Oro
 */

/**
 * Class Aliado
 */
function Aliado(coste, fuerza){
	this.Coste = coste;
	this.Fuerza = fuerza;
}

Aliado.prototype = new Carta();
Aliado.prototype.constructor = Aliado;

Aliado.prototype.atacar = function(){
	console.log('<' + this.Nombre + '>' + ' esta atacando...debe cambiar de posición');
}
/**
 * Fin Class Aliado
 */

 Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

/**
 * Función para cambiar la mano
 */
function cambiarMano(){
	myl.Mano.cambiarMano(myl.Mano.cartasEnMano() - 1);
	myl.Mano.pintarMano();
}

/**
 * Función para descartar una carta de la mano
 */
function descartarCarta(){
	myl.Mano.descartarCarta();
	pintarMano();
}

/**
 * Objeto que contiene los indicadores que se requieren en el Juego.
 */
 function Indicadores(){
 	this.cartasColeccion = function(){
 		return myl.totalCartas();
 	};
 	this.cartasEnCastillo = function(){
 		return myl.Castillo.cartasEnCastillo();
 	};
 	this.cartasEnMano = function(){
 		return myl.Mano.cartasEnMano();
 	}
 	this.mostrarIndicadores = function(){
 		//console.log(myl);
 		//console.log('Total cartas Mitos y Leyendas = ' + this.cartasColeccion());
 		console.clear();
 		console.log('Cartas en el Castillo = ' + this.cartasEnCastillo());
 		console.log('Cartas en la Mano = ' + this.cartasEnMano());
 		console.log(myl);
 	}
 }

$(document).ready(function(){
	$('#armarCastillo').on('click', function(){
		myl.pintarColecciones(); 
	});
	$('#agregarCarta').on('click', function(){
		myl.Castillo.agregarCarta(); 
	});
	$('#indicadores').on('click', function(){
		myl.Indicadores.mostrarIndicadores();
	});
	$('#comenzar').on('click', function(){
		myl.Mano.generarMano(cartas_en_mano);
		myl.Mano.pintarMano();
	});
	$('#cambiarMano').on('click', function(){
		cambiarMano();
	});
});