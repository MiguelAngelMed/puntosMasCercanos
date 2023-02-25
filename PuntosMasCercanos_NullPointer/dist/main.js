
/*
Título: Algoritmo del par de puntos más cercanos por fuerza brura
Fecha: 21/12/2021
Versión:1.0
Descripción: 
  *El siguiente código es una implementación para mostrar el funcionamiento del
  *Algoritmo del par de puntos más cercanos por fuerza bruta con una animación
  *hecha con javascript.


Autores:
	-López Cedano Axel Adrián
	-Mancilla Sánchez Héctor Eduardo
	-Martínez Pérez Adal Daniel
	-Medina de Jesús Miguel Ángel.
*/

var i = 0;
var k=0,j=1;
var p = 0;
var q = 0;
var minDistancia=0;
var totpuntos=0;
var n = -1;
var X = [];
var Y = [];
var lineaMenor;
var lineaComparacion;


/**
 * Función obtenN
 * obtenN: obtiene el número de puntos que el usuario dibujara
 * recibe: nada
 * devuelve: nada
 */
function obtenN(){
    n = parseInt(document.getElementById("n").value);
    if (n<3)
        alert ("Ingresa al menos 3 puntos");
    else if (n > 8)
        alert ("Máximo 8 puntos");
    
    X = new Array (n);
    Y = new Array (n);
    let s = Snap("#svg")
    lineaMenor = s.line(0,0,0,0);
    lineaMenor.attr({
        fill: "#33FFEF",
        stroke: "#33FFEF",
        strokeWidth: 5
    });

    lineaComparacion = s.line(0,0,0,0);
    lineaComparacion.attr({
        fill: "#EC0000",
        stroke: "#EC0000",
        strokeWidth: 5
    });
}

/**
 * Función alerta
 * alerta: Se utiliza para manejar el evento de dar un click en el
 * svg de la pagina, el cual dibuja un punto donde el usuario haga click
 * recibe: event
 * devuelve: nada
 */
function alerta (event){
    var x = event.offsetX;
    var y = event.offsetY;

    let s = Snap("#svg");
    if (i<n){
        var myCircle = s.circle (x,y,7);
        myCircle.attr({
            fill: "#d6e8ee",
            stroke: "#001b48",
            strokeWidth: 3
        });
        guardaCoors(x,y);
        i++;
        totpuntos++;
    }

    else
        return;
}

/**
 * Función guardaCoors
 * guardaCoors: Guarda las cordenadas de el punto que
 * se dibuja en el arreglo de coordenas correspondiente
 * recibe: nada.
 * devuelve: nada
 */
function guardaCoors (x, y){
   X[i] = x;
   Y[i] = y;
}


/**
 * Función distanciaMenor
 * distanciaMenor: Es la funcion que al hacer click en el boton siguiente 
 * avanza un paso en la animación del algoritmo por fuerza bruta.  
 * recibe: nada.
 * devuelve: nada
 */
function distanciaMenor(){
    if(k==totpuntos-2){
        lineaComparacion.attr({
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0,
        });
        alert("La distancia minima es de : "+minDistancia.toFixed(2));
        document.estaforma.dist.value = "";
        document.estaforma.mindist.value = Number(minDistancia.toFixed(2));
    }
    else{

        //Cuando se termina iteración del primer for
        if(j==totpuntos){
            k++;
            j=k+1;
        }
        let distancia= (Math.sqrt( Math.pow(X[k]-X[j],2) + Math.pow(Y[k]-Y[j],2))/2.54);
        document.estaforma.dist.value = Number(distancia.toFixed(2));
        p++;
        document.estaforma.comparaciones.value = p;
        lineaComparacion.attr({
            x1 : X[k],
            y1 : Y[k],
            x2 : X[j],
            y2 : Y[j],
        });
    

        if(k==0 && j==1){
            minDistancia=distancia;
        

            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0,
            });

            lineaMenor.attr({
                x1 : X[k],
                y1 : Y[k],
                x2 : X[j],
                y2 : Y[j],
            });
            
            document.estaforma.mindist.value = Number(minDistancia.toFixed(2));
            
        }
        else if(distancia<=minDistancia){
            minDistancia=distancia;
            document.estaforma.mindist.value = Number(minDistancia.toFixed(2));
            q++;
           // document.estaforma.numdist.value = q;
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

            lineaMenor.attr({
                x1 : X[k],
                y1 : Y[k],
                x2 : X[j],
                y2 : Y[j]
            });    
            
            
        }    
        
         
        j++;
    }

}


/**
 * Función borrar
 * borrar: Se utiliza para borrar los puntos dibujados y las lineas 
 * dibujadas en la animación. De modo que el usuario puede probar la
 * animacion con otros algoritmos
 * recibe: nada.
 * devuelve: nada
 */
function borrar(){
    let s = Snap("#svg");
    s.clear();
    i = 0;
    k=0,j=1;
    minDistancia=0;
    totpuntos=0;
    p=0;
    n = -1;
    document.estaforma.mindist.value = "";
    document.estaforma.comparaciones.value = "";
    document.estaforma.dist.value = "";
}
