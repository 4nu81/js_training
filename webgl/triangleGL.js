window.onload = function () {

    var
        canvas, // canvas ist die "Leinwand" auf die gezeichnet werden kann
        gl, // DAS WebGL-Objekt (wird vom Browser abgefragt, falls dieser WebGL unterstützt
        webGLProgramObject, // "GPU-Programm", das zur Berechnung der Grafik verwendet wird
        vShaderQuellcode, // String des Vertex-Shader Quellcodes
        vShader,          // der Shader selbst
        fShaderQuellcode, // String des Fragment-Shader Quellcodes
        fShader,          // der Shader selbst
        vertexAttribLoc,  // Verknüpfung zwischen JavaScript und Vertex-Shader
        vVertices,        // Array der Dreieckskoordinaten
        vertexPosBufferObjekt; // Der WebGL-Buffer, der die Dreieckskoordinaten aufnimmt

    canvas = window.document.getElementById("canvas");

    try {
        gl = canvas.getContext("experimental-webgl");
    } catch (e) { }
    if (!gl) {
        window.alert("Fehler: WebGL-Context nicht gefunden");
    }

    webGLProgramObject = gl.createProgram();

    vShaderQuellcode =
        'attribute vec4 vPosition; \n\
        void main() {\n\
            gl_Position = vPosition; \n\
        } \n';

    vShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShader, vShaderQuellcode);
    gl.compileShader(vShader);
    gl.attachShader(webGLProgramObject, vShader);

    fShaderQuellcode =
        'precision mediump float;\n\
        void main()  \n\
        {     \n\
            gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);\n\
        } \n';

    fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShader, fShaderQuellcode);
    gl.compileShader(fShader);
    gl.attachShader(webGLProgramObject, fShader);

    gl.linkProgram(webGLProgramObject);
    gl.useProgram(webGLProgramObject);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    vertexAttribLoc = gl.getAttribLocation(webGLProgramObject, "vPosition");
    vVertices = new Float32Array([
        0.0, 0.1, 0.0,
        -0.1, -0.1, 0.0,
        0.1, -0.1, 0.0,
        0.1, 0.1, 0.0,
        0.2, 0.2, 0.0
    ]);

    vertexPosBufferObjekt = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBufferObjekt);
    gl.bufferData(gl.ARRAY_BUFFER, vVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexAttribLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttribLoc);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


    vVertices = new Float32Array([
        0.1, -0.1, 0.0,
        0.1, 0.1, 0.0,
        0.2, 0.2, 0.0
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexAttribLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttribLoc);
    gl.drawArrays(gl.LINE_STRIP, 0, 3);
};