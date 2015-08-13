window.onload = function () {
    canvas = window.document.getElementById("canvas");

    try {
        gl = canvas.getContext("experimental-webgl");
    } catch (e) { }
    if (!gl) {
        window.alert("Fehler: WebGL-Context nicht gefunden");
    }
};