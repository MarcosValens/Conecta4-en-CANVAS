var x;
var y;
document.getElementById('yellow1').addEventListener("click", function () {
    x = document.getElementById("yellow1").value;
    var compara = document.querySelectorAll(".j2 input");
    if (compara[0].checked) {
        alert("Has elejido el amarillo para ambos jugadores")
    }
    localStorage.setItem("color1", x);
});
document.getElementById('blue1').addEventListener("click", function () {
    x = document.getElementById("blue1").value;
    var compara = document.querySelectorAll(".j2 input");
    if (compara[1].checked) {
        alert("Has elejido el azul para ambos jugadores")
    }
    localStorage.setItem("color1", x);
});
document.getElementById('red1').addEventListener("click", function () {
    x = document.getElementById("red1").value;
    var compara = document.querySelectorAll(".j2 input");
    if (compara[2].checked) {
        alert("Has elejido el rojo para ambos jugadores")
    }
    localStorage.setItem("color1", x);
});
document.getElementById('pink1').addEventListener("click", function () {
    x = document.getElementById("pink1").value;
    var compara = document.querySelectorAll(".j2 input");
    if (compara[3].checked) {
        alert("Has elejido el rosa para ambos jugadores")
    }
    localStorage.setItem("color1", x);
});
document.getElementById('yellow2').addEventListener("click", function () {
    y = document.getElementById("yellow2").value;
    var compara = document.querySelectorAll(".j1 input");
    if (compara[0].checked) {
        alert("Has elejido el amarillo para ambos jugadores")
    }
    localStorage.setItem("color2", y);
});
document.getElementById('blue2').addEventListener("click", function () {
    y = document.getElementById("blue2").value;
    var compara = document.querySelectorAll(".j1 input");
    if (compara[1].checked) {
        alert("Has elejido el azul para ambos jugadores")
    }
    localStorage.setItem("color2", y);
});
document.getElementById('red2').addEventListener("click", function () {
    y = document.getElementById("red2").value;
    var compara = document.querySelectorAll(".j1 input");
    if (compara[2].checked) {
        alert("Has elejido el rojo para ambos jugadores")
    }
    localStorage.setItem("color2", y);
});
document.getElementById('pink2').addEventListener("click", function () {
    y = document.getElementById("pink2").value;
    var compara = document.querySelectorAll(".j1 input");
    if (compara[3].checked) {
        alert("Has elejido el rosa para ambos jugadores")
    }
    localStorage.setItem("color2", y);
});

