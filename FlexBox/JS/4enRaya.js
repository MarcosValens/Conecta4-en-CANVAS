var canvas = document.querySelector('#conect4');
var c = canvas.getContext('2d');
var cont = 0;
var filaT = 6;
var columnaT = 7;
var turno = 0;

/*RECUPERA EL CANVAS*/
var image = new Image();
image.onload = function() {
    c.drawImage(image, 0, 0);
};
image.src = localStorage.getItem('canvas');

/*RECUPERA EL COLOR DE LAS FICHAS*/
var j1 = localStorage.getItem("color1");
console.log(j1);
if (j1 == null){
    j1 = 'yellow';
}
var j2 = localStorage.getItem("color2");
console.log(j1);
if (j2 == null){
    j2 = 'blue';
}

/*RECUPERA EL TABLERO LOGICO*/

var lsLog = localStorage.getItem("logica");
if (lsLog == null) {
    var tablero = [];
    for (var i = 0; i < filaT; i++) {
        var fila = [];
        for (var j = 0; j < columnaT; j++) {
            fila.push(0);
        }
        tablero.push(fila);
    }
} else {
    var tablero = JSON.parse(localStorage.getItem("logica"));
}

/*RECUPERA EL TABLERO PARA PINTAR*/

var lsPint = localStorage.getItem("arrayPintar");
if (!lsPint){
    var tableroPintado = [];
} else var tableroPintado = JSON.parse(localStorage.getItem("arrayPintar"));

/*RECUPERA EL CANVAS*/
/*var dataURL = localStorage.getItem("canvas");
if (dataURL !=null) {
    c.drawImage(JSON.parse(dataURL),0,0);
    /!*var img = new Image;
    img.src = dataURL;
    img.onload = function () {
        c.drawImage(img, 700, 600);*!/
}*/


for (var k = 0; k < (canvas.width + 100) / 100; k++) {
    c.moveTo(0, cont);
    c.lineTo(columnaT * 100, cont);
    cont = cont + 100;
    c.strokeStyle = "#5e68ff";
}
cont = 0;
for (var l = 0; l < (canvas.width + 100) / 100; l++) {
    c.moveTo(cont, 0);
    c.lineTo(cont, filaT * 100);
    cont = cont + 100;
}
var height = 50;
var width = 50;
c.stroke();
for (var m = 0; m < columnaT; m++) {
    for (var n = 0; n < filaT; n++) {
        c.fillStyle = "white";
        c.beginPath();
        c.arc(width, height, 50, 0, 2 * Math.PI);
        height = height + 100;
        c.fill();
        c.stroke();
    }
    height = 50;
    c.beginPath();
    c.arc(width, height, 50, 0, 2 * Math.PI);
    width = width + 100;
    c.stroke();
}

function Ficha(width, height, color) {
    this.width = width;
    this.pintar = function () {
        c.fillStyle = color;
        c.beginPath();
        c.arc(width, height, 50, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
    }

}

canvas.addEventListener('click', function (e) {
    //PINTADO
    var pos = ajustar(e.clientX, e.clientY);
    turno++;
    var fila = 550;
    var columna = Math.ceil(pos.x / 100);
    var color;
    //DEFINICION DE COLOR PARA LAS FICHAS
    if (turno % 2 === 0) {
        color = "rojo"
    } else color = "azul";
    //MIRAR EN QUE FILA VA LA FICHA
    if (tableroPintado.length > 0) {
        for (var i = 0; i < tableroPintado.length; i++) {
            if (columna === tableroPintado[i].columna) {
                fila -= 100;
            }
        }
    }
    var Fichas = new FICHAS_TABLERO(fila, columna, color);
    tableroPintado.push(Fichas);

    lsPint = localStorage.setItem("arrayPintar", JSON.stringify(tableroPintado));
    if (Fichas.fila < 0) {
        alert("No caben mas fichas en esta columna");
        turno--;
    } else {

        if (turno % 2 === 0) {
            var f1 = new Ficha((columna * 100) - 50, fila, j2);
            f1.pintar();
        } else {
            var f2 = new Ficha((columna * 100) - 50, fila, j1);
            f2.pintar();
        }
    }
    localStorage.setItem("canvas", canvas.toDataURL());
    //LOGICA
    if (Math.floor(fila / 100) !== 0) {
        Fichas.fila = Math.floor(fila / 100) + 1;
    }
    else Fichas.fila = Math.floor(fila / 100);

    if (Fichas.fila === 0) {
        tablero[Fichas.fila][Fichas.columna - 1] = Fichas;
    } else tablero[Fichas.fila - 1][Fichas.columna - 1] = Fichas;

    lsLog = localStorage.setItem("logica", JSON.stringify(tablero));
    comprueba(tablero, Fichas, turno, tableroPintado)
});

function ajustar(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx - posCanvas.left;
    var y = yy - posCanvas.top;
    return {x: x, y: y};
}

function FICHAS_TABLERO(fila, columna, color) {
    this.fila = fila;
    this.columna = columna;
    this.color = color;
}

function comprueba(tablero, Fichas, turno) {
    var linea = 0;
    //COMPROBACION HORIZONTAL
    for (var i = 0; i < tablero.length; i++) {
        for (var j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j].color === Fichas.color) {
                linea++;
                if (linea === 4) {
                    if (turno % 2 === 0) {
                        alert("Gana jugador 2!");
                    } else alert("Gana el jugador 1!");
                    tablero = [];
                    for (var i = 0; i < filaT; i++) {
                        var fila = [];
                        for (var j = 0; j < columnaT; j++) {
                            fila.push(0);
                        }
                        tablero.push(fila);
                    }
                    localStorage.setItem("logica",JSON.stringify(tablero));
                    tableroPintado = [];
                    localStorage.setItem("arrayPintar",tableroPintado);
                    return null;
                }
            } else linea = 0;
        }
    }

    //COMPROBACION VERTICAL
    for (var k = 0; k < tablero.length; k++) {
        linea = 0;
        for (var l = 0; l < tablero.length; l++) {
            if (tablero[l][k].color === Fichas.color) {
                linea++;
                if (linea === 4) {
                    if (turno % 2 === 0) {
                        alert("Gana jugador 2!");
                    } else alert("Gana el jugador 1!");
                    tablero = [];
                    for (var i = 0; i < filaT; i++) {
                        fila = [];
                        for (var j = 0; j < columnaT; j++) {
                            fila.push(0);
                        }
                        tablero.push(fila);
                    }
                    localStorage.setItem("logica",JSON.stringify(tablero));
                    tableroPintado = [];
                    localStorage.setItem("arrayPintar",tableroPintado);
                    return null;
                }
            } else linea = 0;
        }
    }
    //COMPROBACION DIAGONAL DERECHA
    var aux = 0;
    for (var m = 0; m < tablero.length; m++) {
        aux = m;
        linea = 0;
        for (var n = 0; n < tablero[0].length - 1; n++) {
            if (tablero[aux][n].color === Fichas.color) {
                linea++;
                if (linea === 4) {
                    if (turno % 2 === 0) {
                        alert("Gana jugador 2!");
                    } else alert("Gana el jugador 1!");
                    tablero = [];
                    for (var i = 0; i < filaT; i++) {
                        fila = [];
                        for (var j = 0; j < columnaT; j++) {
                            fila.push(0);
                        }
                        tablero.push(fila);
                    }
                    localStorage.setItem("logica",JSON.stringify(tablero));
                    tableroPintado = [];
                    localStorage.setItem("arrayPintar",tableroPintado);
                    return null;
                }
            } else linea = 0;
            aux--;
            if (aux < 0) {
                break;
            }
        }
    }
    for (var p = 0; p < tablero[0].length; p++) {
        linea = 0;
        aux = p;
        for (var o = tablero.length - 1; o >= 0; o--) {
            if (tablero[o][aux].color === Fichas.color) {
                linea++;
                if (linea === 4) {
                    if (turno % 2 === 0) {
                        alert("Gana jugador 2!");
                    } else alert("Gana el jugador 1!");
                    tablero = [];
                    for (var i = 0; i < filaT; i++) {
                        fila = [];
                        for (var j = 0; j < columnaT; j++) {
                            fila.push(0);
                        }
                        tablero.push(fila);
                    }
                    localStorage.setItem("logica",JSON.stringify(tablero));
                    tableroPintado = [];
                    localStorage.setItem("arrayPintar",tableroPintado);
                    return null;
                }
            } else linea = 0;
            aux++;
            if (aux === tablero[0].length) {
                break;
            }
        }
    }
    //COMPROBACION DIAGONAL IZQUIERDA
    aux = 0;
    for (var q = 0; q < tablero.length; q++) {
        aux = q;
        linea = 0;
        for (var r = tablero[0].length - 1; r > 0; r--) {
            if (tablero[aux][r].color === Fichas.color) {
                linea++;
                if (linea === 4) {
                    if (turno % 2 === 0) {
                        alert("Gana jugador 2!");
                    } else alert("Gana el jugador 1!");
                    tablero = [];
                    for (var i = 0; i < filaT; i++) {
                        fila = [];
                        for (var j = 0; j < columnaT; j++) {
                            fila.push(0);
                        }
                        tablero.push(fila);
                    }
                    localStorage.setItem("logica",JSON.stringify(tablero));
                    tableroPintado = [];
                    localStorage.setItem("arrayPintar",tableroPintado);
                    return null;
                }
            } else linea = 0;
            aux--;
            if (aux < 0) {
                break;
            }
        }
    }
    for (var s = tablero[0].length - 1; s > 0; s--) {
        linea = 0;
        aux = s;
        for (var t = tablero.length - 1; t >= 0; t--) {
            if (tablero[t][aux].color === Fichas.color) {
                linea++;
                if (linea === 4) {
                    if (turno % 2 === 0) {
                        alert("Gana jugador 2!");
                    } else alert("Gana el jugador 1!");
                     tablero = [];
                    for (var i = 0; i < filaT; i++) {
                        fila = [];
                        for (var j = 0; j < columnaT; j++) {
                            fila.push(0);
                        }
                        tablero.push(fila);
                    }
                    localStorage.setItem("logica",JSON.stringify(tablero));
                    tableroPintado = [];
                    localStorage.setItem("arrayPintar",tableroPintado);
                    return null;
                } else linea = 0;
            }
            aux--;
            if (aux === 0) {
                break;
            }
        }
    }
}
