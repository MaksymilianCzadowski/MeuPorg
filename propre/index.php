<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="node_modules/three/build/three.js"></script>
    <script src="node_modules/three/examples/js/controls/OrbitControls.js"></script>
    <script src="node_modules/three/examples/js/controls/PointerLockControls.js"></script>
    <script src="node_modules/three/examples/js/loaders/GLTFLoader.js"></script>
    <script src="../build/cannon.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>MeuPorg</title>
</head>
<body>
    <div id="blocker">
        <div id="instructions">
            <span style="font-size: 40px;">Click to play</span>
            <br />
            (Z,Q,S,D = Move, SPACE = Jump, MOUSE = Look, CLICK = Shoot)
        </div>
    </div>
    <div class="crosshair">+</div>
    <div class="score">
        <p id="score">Score : </p>
    </div>
    <!-- <button id="button1">press me</button> -->
    <p id="ammo" class="ammo">Mun : </p>
    <p id="life" class="life">Vie : </p>
    <script type="module" src="js/main.js"></script>
</body>
</html>