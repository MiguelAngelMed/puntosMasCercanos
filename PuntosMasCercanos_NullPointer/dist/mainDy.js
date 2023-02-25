/*
Título: Algoritmo del par de puntos más cercanos por divide y venceras
Fecha: 21/12/2021
Versión:1.0
Descripción: 
  *El siguiente código es una implementación para mostrar el funcionamiento del
  *Algoritmo del par de puntos más cercanos por divide y venceras con una animación
  *hecha con javascript.


Autores:
	-López Cedano Axel Adrián
	-Mancilla Sánchez Héctor Eduardo
	-Martínez Pérez Adal Daniel
	-Medina de Jesús Miguel Ángel.
*/



var puntos = [];
var rectangulos = []; 
var lineasMin = [];
var i = 0;
var n = -1;
var totpuntos=0;

var lineaMenor;
var lineaComparacion;
var rectangulo;


    
    



/**
 * Función distancia
 * distancia: Calcula la distancia euclidiana entre dos puntos dados
 * recibe:
 *   x1: cordenada en x del punto 1
 *   y1: cordenada en y del punto 1
 *   x2: cordenada en x del punto 2
 *   y2: cordenada en y del punto 2
 * devuelve: la distancia entre los dos puntos
 */
function distancia(x1,y1,x2,y2){
    return (Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2))/2.54);
}

/**
 * Función obtenN
 * obtenN: obtiene el número de puntos que el usuario dibujara
 * recibe: nada
 * devuelve: nada
 */
function obtenN(){
    n = parseInt(document.getElementById("nDy").value);
    if (n<3)
        alert ("Ingresa al menos 3 puntos");
    else if (n > 8)
        alert ("Máximo 8 puntos");
    
    
    let s = Snap("#svg");

    for(let m=0; m<9; m++){
        rectangulos[m] = s.rect(0,0,0,0);
        rectangulos[m].attr({
            fill: "#97CADB",
        });
    }
    
    for(let m=0; m<7; m++){
        lineasMin[m] = s.line(0,0,0,0);
        lineasMin[m].attr({
            fill: "#33FFEF",
            stroke: "#33FFEF",
            strokeWidth: 5
        });
    }
    
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
        puntos.push(s.circle (x,y,7));
        puntos[i].attr({
            fill: "#d6e8ee",
            stroke: "#001b48",
            strokeWidth: 3
        });
        i++;
        totpuntos++;

        if(totpuntos==n){
            quicksort(0,n-1);
            /*
            for(let k=0; k<puntos.length ; k++){
                alert(puntos[k]);
            }*/
        }
    }

    else
        return;
}


/**
 * Función quicksort
 * quicksort: Se utiliza para ordenar el arreglo de puntos
 * el cual es global respecto a la cordenada x
 * recibe: 
 *     low: primer indice del arreglo.
 *     hight: ultimo indice del arreglo.
 * devuelve: nada
 */
function quicksort(low,high){
    if( low < high){
        // pi --> índice de la particion, arr[pi] == New high
        pi = partition(low,high);

        // Antes de pi
        quicksort(low,pi-1);

        // Despues de pi
        quicksort(pi+1,high);
    }
}

/**
 * Función partitition
 * partition: Se utiliza para obtener el pivote del algoritmo
 * quicksort. 
 * recibe: 
 *     low: primer indice del arreglo.
 *     hight: ultimo indice del arreglo.
 * devuelve: 
 *     pivot: pivote seleccionado. 
 */
function partition(low,high){
    let pivot = parseInt(puntos[high].attr("cx"));
    let l = (low - 1);  // El menor indice de la parte
   
    
    
    for (let m=low; m <= (high-1); m++){
        
        if(parseInt(puntos[m].attr("cx")) < pivot){
            l++;
            let auxC = puntos[l];
            puntos[l] = puntos[m];
            puntos[m] = auxC;

            
        }
        
    }

    let auxC = puntos[l+1];
    puntos[l+1] = puntos[high];
    puntos[high] = auxC;
    

    return (l+1);

}


/**
 * Función delay
 * delay: Se utiliza para que la animación espere un segundo
 * recibe: nada
 * devuelve: nada
 */
function delay(){
    return new Promise(function(resolve){
        setTimeout(resolve,1500);
    });
}

/**
 * Función distanciaDyv
 * distanciaDyv: Es la funcion que al hacer click inicia la animación
 * del algoritmo de divide y venceras con los puntos dibujados. 
 * recibe: nada.
 * devuelve: nada
 */
async function distancaDyv(){
   
    if(n==3){
        let c=0;
        let dFuerzaBruta=7000;


        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[2].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });
        for(let a=0; a<3;a++){
            for(let b=a+1; b<3; b++){
            
                lineaComparacion.attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                });
               
                
                let dCom = distancia(puntos[a].attr("cx"),puntos[a].attr("cy"),puntos[b].attr("cx"),puntos[b].attr("cy"));

                document.estaforma.dist.value = Number(dCom.toFixed(2));
                c++;
                document.estaforma.comparaciones.value = c;
                if(dFuerzaBruta > dCom){
                     
                    dFuerzaBruta = dCom;

                    
                    document.estaforma.mindist.value = Number(dFuerzaBruta.toFixed(2));
                    lineaComparacion.attr({
                        x1 : 0,
                        y1 : 0,
                        x2 : 0,
                        y2 : 0
                    });  


                    lineasMin[0].attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                    });  
                }
 
                await delay(5);
            }
        } 

        lineaComparacion.attr({
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0
        });  

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        alert("La distancia minima es de : "+dFuerzaBruta.toFixed(2));
    }
    else if(n==4){
         
        let numCompa=0;
        let dMin4=0.0;
        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[1].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });

        await delay(5);

        let dI = distancia(puntos[0].attr("cx"),puntos[0].attr("cy"),puntos[1].attr("cx"),puntos[1].attr("cy"));

        document.estaforma.dist.value = Number(dI.toFixed(2));
        
        lineasMin[0].attr({
            x1 : puntos[0].attr("cx"),
            y1 : puntos[0].attr("cy"),
            x2 : puntos[1].attr("cx"),
            y2 : puntos[1].attr("cy")
        }); 

        await delay(5);

        rectangulos[0].attr({
            x: puntos[2].attr("cx")-7,
            y: 0,
            width: puntos[3].attr("cx")-puntos[2].attr("cx")+12,
            height: 400
        
        });

        await delay(5);

        
        let dR = distancia(puntos[2].attr("cx"),puntos[2].attr("cy"),puntos[3].attr("cx"),puntos[3].attr("cy"));
        document.estaforma.dist.value = Number(dR.toFixed(2));
        lineasMin[1].attr({
            x1 : puntos[2].attr("cx"),
            y1 : puntos[2].attr("cy"),
            x2 : puntos[3].attr("cx"),
            y2 : puntos[3].attr("cy")
        });


        await delay(5);
        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dI<dR){
            dMin4=dI;
            lineasMin[1].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }else{
            dMin4=dR;
            lineasMin[0].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

        }

        document.estaforma.mindist.value = Number(dMin4.toFixed(2));

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        
        });

        await delay(5);
        

        let puntosMedio = [];
        let numMedio=0;
        for (let k=0; k<4; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[1].attr("cx")))/2.54 < dMin4){
                puntosMedio.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedio[0].attr("cx")-7,
                y: 0,
                width: puntosMedio[numMedio-1].attr("cx") - puntosMedio[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedio[a].attr("cx"),
                            y1 : puntosMedio[a].attr("cy"),
                            x2 : puntosMedio[b].attr("cx"),
                            y2 : puntosMedio[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedio[a].attr("cx"),puntosMedio[a].attr("cy"),puntosMedio[b].attr("cx"),puntosMedio[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin4 > dCom){

                        dMin4 = dCom;


                        document.estaforma.mindist.value = Number(dMin4.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  


                        lineasMin[0].attr({
                            x1 : puntosMedio[a].attr("cx"),
                            y1 : puntosMedio[a].attr("cy"),
                            x2 : puntosMedio[b].attr("cx"),
                            y2 : puntosMedio[b].attr("cy")
                        });  

                        lineasMin[1].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }
        
        alert("La distancia minima es de : "+dMin4.toFixed(2));

    }
    else if(n==5){
        let numCompa=0;
        let dMin5=0.0;

        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[2].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });

        await delay(5);
        
        let dI = 7000;
        for(let a=0; a<3;a++){
            for(let b=a+1; b<3; b++){
            
                lineaComparacion.attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                });
               
                
                let dCom= distancia(puntos[a].attr("cx"),puntos[a].attr("cy"),puntos[b].attr("cx"),puntos[b].attr("cy"));

                document.estaforma.dist.value = Number(dCom.toFixed(2));
                numCompa++;
                document.estaforma.comparaciones.value = numCompa;
                if(dI > dCom){
                     
                    dI = dCom;

                    
                    document.estaforma.mindist.value = Number(dI.toFixed(2));
                    lineaComparacion.attr({
                        x1 : 0,
                        y1 : 0,
                        x2 : 0,
                        y2 : 0
                    });  


                    lineasMin[0].attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                    });  
                }
 
                await delay(5);
            }
        } 

        lineaComparacion.attr({
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0
        });  

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        
        await delay(5);
        
        //mitad derecha

        
        let dR=0.0;

        rectangulos[0].attr({
            x: puntos[3].attr("cx")-7,
            y: 0,
            width: puntos[4].attr("cx")-puntos[3].attr("cx")+12,
            height: 400
        
        });

        await delay(5);

        dR = distancia(puntos[3].attr("cx"),puntos[3].attr("cy"),puntos[4].attr("cx"),puntos[4].attr("cy"));

        document.estaforma.dist.value = Number(dR.toFixed(2));
        
        lineasMin[1].attr({
            x1 : puntos[3].attr("cx"),
            y1 : puntos[3].attr("cy"),
            x2 : puntos[4].attr("cx"),
            y2 : puntos[4].attr("cy")
        }); 

        
        await delay(5);

        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dI<dR){
            dMin5=dI;
            lineasMin[1].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }else{
            dMin5=dR;
            lineasMin[0].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

        }

        document.estaforma.mindist.value = Number(dMin5.toFixed(2));
        

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });

        await delay(5);


        let puntosMedio = [];
        let numMedio=0;
        for (let k=0; k<5; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[2].attr("cx")))/2.54 < dMin5){
                puntosMedio.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedio[0].attr("cx")-7,
                y: 0,
                width: puntosMedio[numMedio-1].attr("cx") - puntosMedio[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedio[a].attr("cx"),
                            y1 : puntosMedio[a].attr("cy"),
                            x2 : puntosMedio[b].attr("cx"),
                            y2 : puntosMedio[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedio[a].attr("cx"),puntosMedio[a].attr("cy"),puntosMedio[b].attr("cx"),puntosMedio[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin5 > dCom){

                        dMin5 = dCom;


                        document.estaforma.mindist.value = Number(dMin5.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  


                        lineasMin[0].attr({
                            x1 : puntosMedio[a].attr("cx"),
                            y1 : puntosMedio[a].attr("cy"),
                            x2 : puntosMedio[b].attr("cx"),
                            y2 : puntosMedio[b].attr("cy")
                        });  

                        lineasMin[1].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }
        
        alert("La distancia minima es de : "+dMin5.toFixed(2));

        
    }
    else if(n==6){
        let dI = 7000;
        let numCompa=0;
        
        let dMin6=0.0;

        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[2].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });
        await delay(5);

        for(let a=0; a<3;a++){
            for(let b=a+1; b<3; b++){
            
                lineaComparacion.attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                });
               
                
                let dCom= distancia(puntos[a].attr("cx"),puntos[a].attr("cy"),puntos[b].attr("cx"),puntos[b].attr("cy"));

                document.estaforma.dist.value = Number(dCom.toFixed(2));
                numCompa++;
                document.estaforma.comparaciones.value = numCompa;
                if(dI > dCom){
                     
                    dI = dCom;

                    
                    //document.estaforma.mindist.value = Number(dI.toFixed(2));
                    lineaComparacion.attr({
                        x1 : 0,
                        y1 : 0,
                        x2 : 0,
                        y2 : 0
                    });  


                    lineasMin[0].attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                    });  
                }
 
                await delay(5);
            }
        } 

        lineaComparacion.attr({
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0
        });  

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        
        await delay(5);
        
        //mitad derecha
        rectangulos[0].attr({
            x: puntos[3].attr("cx")-7,
            y: 0,
            width: puntos[5].attr("cx")-puntos[3].attr("cx")+12,
            height: 400
        
        });
        await delay(5);

        let dR=7000;
        for(let a=3; a<6;a++){
            for(let b=a+1; b<6; b++){
            
                lineaComparacion.attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                });
               
                
                let dCom= distancia(puntos[a].attr("cx"),puntos[a].attr("cy"),puntos[b].attr("cx"),puntos[b].attr("cy"));

                document.estaforma.dist.value = Number(dCom.toFixed(2));
                numCompa++;
                document.estaforma.comparaciones.value = numCompa;
                if(dR > dCom){
                     
                    dR = dCom;

                    
                    //document.estaforma.mindist.value = Number(dI.toFixed(2));
                    lineaComparacion.attr({
                        x1 : 0,
                        y1 : 0,
                        x2 : 0,
                        y2 : 0
                    });  


                    lineasMin[1].attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                    });  
                }
 
                await delay(5);
            }
        } 

        lineaComparacion.attr({
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0
        });  

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        
        await delay(5);


        await delay(5);

        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dI<dR){
            dMin6=dI;
            lineasMin[1].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }else{
            dMin6=dR;
            lineasMin[0].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

        }

        document.estaforma.mindist.value = Number(dMin6.toFixed(2));

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });

        await delay(5);


        let puntosMedio = [];
        let numMedio=0;
        for (let k=0; k<6; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[3].attr("cx")))/2.54 < dMin6){
                puntosMedio.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedio[0].attr("cx")-7,
                y: 0,
                width: puntosMedio[numMedio-1].attr("cx") - puntosMedio[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedio[a].attr("cx"),
                            y1 : puntosMedio[a].attr("cy"),
                            x2 : puntosMedio[b].attr("cx"),
                            y2 : puntosMedio[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedio[a].attr("cx"),puntosMedio[a].attr("cy"),puntosMedio[b].attr("cx"),puntosMedio[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin6 > dCom){

                        dMin6 = dCom;


                        document.estaforma.mindist.value = Number(dMin6.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  


                        lineasMin[0].attr({
                            x1 : puntosMedio[a].attr("cx"),
                            y1 : puntosMedio[a].attr("cy"),
                            x2 : puntosMedio[b].attr("cx"),
                            y2 : puntosMedio[b].attr("cy")
                        });  

                        lineasMin[1].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }
        
        alert("La distancia minima es de : "+dMin6.toFixed(2));
    
    }
    else if(n==7){
        let numCompa=0;
        let dMin7=0.0;

        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[3].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });

        await delay(5);


        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[1].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });

        let dMin4I=0.0;
        
        await delay(5);

        let dI1 = distancia(puntos[0].attr("cx"),puntos[0].attr("cy"),puntos[1].attr("cx"),puntos[1].attr("cy"));

        document.estaforma.dist.value = Number(dI1.toFixed(2));
        
        lineasMin[0].attr({
            x1 : puntos[0].attr("cx"),
            y1 : puntos[0].attr("cy"),
            x2 : puntos[1].attr("cx"),
            y2 : puntos[1].attr("cy")
        }); 

        await delay(5);

        rectangulos[0].attr({
            x: puntos[2].attr("cx")-7,
            y: 0,
            width: puntos[3].attr("cx")-puntos[2].attr("cx")+12,
            height: 400
        
        });

        await delay(5);

        
        let dR1 = distancia(puntos[2].attr("cx"),puntos[2].attr("cy"),puntos[3].attr("cx"),puntos[3].attr("cy"));
        document.estaforma.dist.value = Number(dR1.toFixed(2));
        lineasMin[1].attr({
            x1 : puntos[2].attr("cx"),
            y1 : puntos[2].attr("cy"),
            x2 : puntos[3].attr("cx"),
            y2 : puntos[3].attr("cy")
        });


        await delay(5);
        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dI1<dR1){
            dMin4I=dI1;
            lineasMin[1].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }else{
            dMin4I=dR1;
            lineasMin[0].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

        }

        document.estaforma.mindist.value = Number(dMin4I.toFixed(2));

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        
        });

        await delay(5);
        
        /*Sacar medio izquierda*/
        let puntosMedioI = [];
        let numMedio=0;
        for (let k=0; k<4; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[1].attr("cx")))/2.54 < dMin4I){
                puntosMedioI.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedioI[0].attr("cx")-7,
                y: 0,
                width: puntosMedioI[numMedio-1].attr("cx") - puntosMedioI[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedioI[a].attr("cx"),
                            y1 : puntosMedioI[a].attr("cy"),
                            x2 : puntosMedioI[b].attr("cx"),
                            y2 : puntosMedioI[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedioI[a].attr("cx"),puntosMedioI[a].attr("cy"),puntosMedioI[b].attr("cx"),puntosMedioI[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin4I > dCom){

                        dMin4I = dCom;


                        document.estaforma.mindist.value = Number(dMin4I.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  


                        lineasMin[0].attr({
                            x1 : puntosMedioI[a].attr("cx"),
                            y1 : puntosMedioI[a].attr("cy"),
                            x2 : puntosMedioI[b].attr("cx"),
                            y2 : puntosMedioI[b].attr("cy")
                        });  

                        lineasMin[1].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }

        await delay(5);
        
        
        rectangulos[0].attr({
            x: puntos[4].attr("cx")-7,
            y: 0,
            width: puntos[6].attr("cx")-puntos[4].attr("cx")+12,
            height: 400
        
        });
        await delay(5);

        let dR2=7000.0;
        for(let a=4; a<7;a++){
            for(let b=a+1; b<7; b++){
            
                lineaComparacion.attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                });
               
                
                let dCom= distancia(puntos[a].attr("cx"),puntos[a].attr("cy"),puntos[b].attr("cx"),puntos[b].attr("cy"));

                document.estaforma.dist.value = Number(dCom.toFixed(2));
                numCompa++;
                document.estaforma.comparaciones.value = numCompa;
                if(dR2 > dCom){
                     
                    dR2 = dCom;

                    
                    //document.estaforma.mindist.value = Number(dI.toFixed(2));
                    lineaComparacion.attr({
                        x1 : 0,
                        y1 : 0,
                        x2 : 0,
                        y2 : 0
                    });  


                    lineasMin[2].attr({
                        x1 : puntos[a].attr("cx"),
                        y1 : puntos[a].attr("cy"),
                        x2 : puntos[b].attr("cx"),
                        y2 : puntos[b].attr("cy")
                    });  
                }
 
                await delay(5);
            }
        } 

        lineaComparacion.attr({
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0
        });  

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        
        await delay(5);
        
        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dMin4I <dR2){
            dMin7 = dMin4I;
            lineasMin[2].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }
        else{
            dMin7 = dR2;
            lineasMin[0].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

            lineasMin[1].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }
        document.estaforma.mindist.value = Number(dMin7.toFixed(2));

        await delay(5);

      
        /*Sacar mitad principal*/
        let puntosMedioP = [];
        numMedio=0;
        for (let k=0; k<7; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[3].attr("cx")))/2.54 < dMin7){
                puntosMedioP.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedioP[0].attr("cx")-7,
                y: 0,
                width: puntosMedioP[numMedio-1].attr("cx") - puntosMedioP[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedioP[a].attr("cx"),
                            y1 : puntosMedioP[a].attr("cy"),
                            x2 : puntosMedioP[b].attr("cx"),
                            y2 : puntosMedioP[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedioP[a].attr("cx"),puntosMedioP[a].attr("cy"),puntosMedioP[b].attr("cx"),puntosMedioP[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin7 > dCom){

                        dMin7 = dCom;


                        document.estaforma.mindist.value = Number(dMin7.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  


                        lineasMin[0].attr({
                            x1 : puntosMedioP[a].attr("cx"),
                            y1 : puntosMedioP[a].attr("cy"),
                            x2 : puntosMedioP[b].attr("cx"),
                            y2 : puntosMedioP[b].attr("cy")
                        });  

                        lineasMin[1].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });

                        lineasMin[2].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }


        alert("La distancia minima es de : "+Number(dMin7.toFixed(2)));
    }
    else if(n==8){
        let numCompa=0;
        let dMin8=0.0;

        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[3].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });

        await delay(5);


        rectangulos[0].attr({
            x: puntos[0].attr("cx")-7,
            y: 0,
            width: puntos[1].attr("cx")-puntos[0].attr("cx")+12,
            height: 400
        
        });

        let dMin4I=0.0;
        
        await delay(5);

        let dI1 = distancia(puntos[0].attr("cx"),puntos[0].attr("cy"),puntos[1].attr("cx"),puntos[1].attr("cy"));

        document.estaforma.dist.value = Number(dI1.toFixed(2));
        
        lineasMin[0].attr({
            x1 : puntos[0].attr("cx"),
            y1 : puntos[0].attr("cy"),
            x2 : puntos[1].attr("cx"),
            y2 : puntos[1].attr("cy")
        }); 

        await delay(5);

        rectangulos[0].attr({
            x: puntos[2].attr("cx")-7,
            y: 0,
            width: puntos[3].attr("cx")-puntos[2].attr("cx")+12,
            height: 400
        
        });

        await delay(5);

        
        let dR1 = distancia(puntos[2].attr("cx"),puntos[2].attr("cy"),puntos[3].attr("cx"),puntos[3].attr("cy"));
        document.estaforma.dist.value = Number(dR1.toFixed(2));
        lineasMin[1].attr({
            x1 : puntos[2].attr("cx"),
            y1 : puntos[2].attr("cy"),
            x2 : puntos[3].attr("cx"),
            y2 : puntos[3].attr("cy")
        });


        await delay(5);
        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dI1<dR1){
            dMin4I=dI1;
            lineasMin[1].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }else{
            dMin4I=dR1;
            lineasMin[0].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

        }

        document.estaforma.mindist.value = Number(dMin4I.toFixed(2));

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        
        });

        await delay(5);
        
        /*Sacar medio izquierda*/
        let puntosMedioI = [];
        let numMedio=0;
        for (let k=0; k<8; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[1].attr("cx")))/2.54 < dMin4I){
                puntosMedioI.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedioI[0].attr("cx")-7,
                y: 0,
                width: puntosMedioI[numMedio-1].attr("cx") - puntosMedioI[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedioI[a].attr("cx"),
                            y1 : puntosMedioI[a].attr("cy"),
                            x2 : puntosMedioI[b].attr("cx"),
                            y2 : puntosMedioI[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedioI[a].attr("cx"),puntosMedioI[a].attr("cy"),puntosMedioI[b].attr("cx"),puntosMedioI[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin4I > dCom){

                        dMin4I = dCom;


                        document.estaforma.mindist.value = Number(dMin4I.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  


                        lineasMin[0].attr({
                            x1 : puntosMedioI[a].attr("cx"),
                            y1 : puntosMedioI[a].attr("cy"),
                            x2 : puntosMedioI[b].attr("cx"),
                            y2 : puntosMedioI[b].attr("cy")
                        });  

                        lineasMin[1].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }

        await delay(5);


        /*Mitad derecha*/
        rectangulos[0].attr({
            x: puntos[4].attr("cx")-7,
            y: 0,
            width: puntos[7].attr("cx")-puntos[4].attr("cx")+12,
            height: 400
        
        });

        await delay(5);


        rectangulos[0].attr({
            x: puntos[4].attr("cx")-7,
            y: 0,
            width: puntos[5].attr("cx")-puntos[4].attr("cx")+12,
            height: 400
        
        });

        let dMin4R=0.0;
        
        await delay(5);

        let dI3 = distancia(puntos[4].attr("cx"),puntos[4].attr("cy"),puntos[5].attr("cx"),puntos[5].attr("cy"));

        document.estaforma.dist.value = Number(dI3.toFixed(2));
        
        lineasMin[2].attr({
            x1 : puntos[4].attr("cx"),
            y1 : puntos[4].attr("cy"),
            x2 : puntos[5].attr("cx"),
            y2 : puntos[5].attr("cy")
        }); 

        await delay(5);

        rectangulos[0].attr({
            x: puntos[6].attr("cx")-7,
            y: 0,
            width: puntos[7].attr("cx")-puntos[6].attr("cx")+12,
            height: 400
        
        });

        await delay(5);

        
        let dR3 = distancia(puntos[6].attr("cx"),puntos[6].attr("cy"),puntos[7].attr("cx"),puntos[7].attr("cy"));
        document.estaforma.dist.value = Number(dR3.toFixed(2));
        lineasMin[3].attr({
            x1 : puntos[6].attr("cx"),
            y1 : puntos[6].attr("cy"),
            x2 : puntos[7].attr("cx"),
            y2 : puntos[7].attr("cy")
        });


        await delay(5);
        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dI3<dR3){
            dMin4R=dI3;
            lineasMin[3].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }else{
            dMin4R=dR3;
            lineasMin[2].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

        }

        document.estaforma.mindist.value = Number(dMin4R.toFixed(2));

        rectangulos[0].attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        
        });

        await delay(5);
        
        /*Sacar medio derecha*/
        let puntosMedioR = [];
        numMedio=0;
        for (let k=0; k<8; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[5].attr("cx")))/2.54 < dMin4R){
                puntosMedioR.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedioR[0].attr("cx")-7,
                y: 0,
                width: puntosMedioR[numMedio-1].attr("cx") - puntosMedioR[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedioR[a].attr("cx"),
                            y1 : puntosMedioR[a].attr("cy"),
                            x2 : puntosMedioR[b].attr("cx"),
                            y2 : puntosMedioR[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedioR[a].attr("cx"),puntosMedioR[a].attr("cy"),puntosMedioR[b].attr("cx"),puntosMedioR[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin4R > dCom){

                        dMin4R = dCom;


                        //document.estaforma.mindist.value = Number(dMin4R.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  


                        lineasMin[2].attr({
                            x1 : puntosMedioR[a].attr("cx"),
                            y1 : puntosMedioR[a].attr("cy"),
                            x2 : puntosMedioR[b].attr("cx"),
                            y2 : puntosMedioR[b].attr("cy")
                        });  

                        lineasMin[3].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }

        await delay(5);
    
        numCompa++;
        document.estaforma.comparaciones.value = numCompa;
        if(dMin4R<dMin4I){
            dMin8 = dMin4R;

            lineasMin[1].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
            lineasMin[0].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });
        }else{
            dMin8=dMin4I;
            lineasMin[2].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

            lineasMin[3].attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });

        }

        document.estaforma.mindist.value = Number(dMin8.toFixed(2));
        
        await delay(5);
        
        /*Mitad principal*/
        let puntosMedioPri = [];
        numMedio=0;
        for (let k=0; k<8; k++){
            if( (Math.abs(puntos[k].attr("cx")-puntos[3].attr("cx")))/2.54 < dMin8){
                puntosMedioPri.push(puntos[k]);
                numMedio++;
            }
        }

        if(numMedio>1){
            rectangulos[0].attr({
                x: puntosMedioPri[0].attr("cx")-7,
                y: 0,
                width: puntosMedioPri[numMedio-1].attr("cx") - puntosMedioPri[0].attr("cx")+12,
                height: 400
            
            });
        
        

            for(let a=0; a<numMedio;a++){
                for(let b=a+1; b<numMedio; b++){
                
                    lineaComparacion.attr({
                            x1 : puntosMedioPri[a].attr("cx"),
                            y1 : puntosMedioPri[a].attr("cy"),
                            x2 : puntosMedioPri[b].attr("cx"),
                            y2 : puntosMedioPri[b].attr("cy")
                    });
                

                    let dCom = distancia(puntosMedioPri[a].attr("cx"),puntosMedioPri[a].attr("cy"),puntosMedioPri[b].attr("cx"),puntosMedioPri[b].attr("cy"));

                    document.estaforma.dist.value = Number(dCom.toFixed(2));
                    numCompa++;
                    document.estaforma.comparaciones.value = numCompa;
                    if(dMin8 > dCom){

                        dMin8 = dCom;


                        document.estaforma.mindist.value = Number(dMin8.toFixed(2));
                        lineaComparacion.attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });  

                      
                        lineasMin[0].attr({
                            x1 : puntosMedioPri[a].attr("cx"),
                            y1 : puntosMedioPri[a].attr("cy"),
                            x2 : puntosMedioPri[b].attr("cx"),
                            y2 : puntosMedioPri[b].attr("cy")
                        });  
                        
                        lineasMin[1].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });

                        lineasMin[2].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                        lineasMin[3].attr({
                            x1 : 0,
                            y1 : 0,
                            x2 : 0,
                            y2 : 0
                        });
                    }
                
                    await delay(5);
                }
            } 


            await delay(5);
            lineaComparacion.attr({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0
            });  

            rectangulos[0].attr({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

        }

        document.estaforma.mindist.value = Number(dMin8.toFixed(2));

        alert("La distancia minima es de : "+Number(dMin8.toFixed(2)));
    
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
    puntos = [];
    rectangulos = []; 
    lineasMin = [];
    
    totpuntos=0;
    n = -1;
    document.estaforma.mindist.value = "";
    document.estaforma.comparaciones.value = "";
    document.estaforma.dist.value = "";
}

