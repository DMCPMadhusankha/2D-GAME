var runSoundClip = new Audio("run.wav");
var backgroundSoundClip = new Audio("music.mp3");
var wSoundClip = new Audio("wolf.wav");
var jumpSoundClip = new Audio("jumpp.mp3");
var painSoundClip = new Audio("pain.wav");
var knifeSoundClip = new Audio("knife.mp3");
var alertSoundClip = new Audio("alert.wav");
var evilSoundClip = new Audio("evil.mp3");
var winSoundClip = new Audio("cheer.wav");

winSoundClip.loop = false;
evilSoundClip.loop = false;
alertSoundClip.loop = false;
painSoundClip.loop = false;
knifeSoundClip.loop = false;
runSoundClip.loop = true;
wSoundClip.loop = true;
backgroundSoundClip.loop = true;
jumpSoundClip.loop = false;

function key(event) {
    if (event.which == 13) {
        document.getElementById("main").style.visibility = "hidden";
        if (runWorker == 0) {
            runWorker = setInterval(run, 100);
            runSoundClip.play();
            backgroundSoundClip.play();
            wSoundClip.play();
            backgroundWorker = setInterval(background, 100);
            scoreWorker = setInterval(score,250);
            boxId = skull();
            boxWorker = setInterval(move, 100);
        }
    }
    if (event.which == 32) {
        document.getElementById("main").style.visibility = "hidden";
        if (jumpWorker == 0) {
            clearInterval(runWorker);
            runWorker = -1;
            jumpWorker = setInterval(jump, 100);
            jumpSoundClip.play();
            backgroundSoundClip.play();
            wSoundClip.play();
            runSoundClip.pause();
        }
    }
}

var runWorker = 0;
var runImage = 1;
function run() {
    runImage = runImage + 1;
    if (runImage == 11) {
        runImage = 1;
    }
    document.getElementById("sprite").src = "Run (" + runImage + ").png";
}

var backgroundWorker = 0;
var bimage = 0;
function background() {
    bimage = bimage - 15;
    document.getElementById("background").style.backgroundPositionX = bimage + "px";
}

var scoreWorker = 0;
var sNumber = 0;
function score() {
    sNumber = sNumber + 1;
    if (sNumber == 300) {
        clearInterval(runWorker);
        runWorker = -1;
        clearInterval(jumpWorker);
        jumpWorker = -1;
        clearInterval(scoreWorker);
        scoreWorker = -1;
        clearInterval(backgroundWorker);
        backgroundWorker = -1;
        die = setInterval(died, 100);
        jumpSoundClip.pause();
        backgroundSoundClip.pause();
        wSoundClip.pause();
        runSoundClip.pause();
        winSoundClip.play();
        die = setInterval(died, 100);
        clearInterval(boxWorker);
        document.getElementById("win").style.visibility = "visible";
    }
    document.getElementById("number").innerHTML = sNumber;
}

var jumpWorker = 0;
var jumpImage = 1;
var bmt = 500;

function jump() {
    if (jumpImage <= 5) {
        bmt = bmt - 80;
        document.getElementById("sprite").style.marginTop = bmt + "px";
    }
    if (jumpImage >= 6) {
        bmt = bmt + 80;
        document.getElementById("sprite").style.marginTop = bmt + "px";
    }
    jumpImage = jumpImage + 1;
    if (jumpImage == 11) {
        jumpImage = 1;
        clearInterval(jumpWorker);
        runWorker = setInterval(run, 100);
        runSoundClip.play();
        jumpWorker = 0;
        if (backgroundWorker == 0) {
            backgroundWorker = setInterval(background, 100);
        }
        if (scoreWorker == 0) {
            scoreWorker = setInterval(score, 250);
        }
        if (boxId == 0) {
            boxId = skull();
        }
        if (boxWorker == 0) {
            boxWorker = setInterval(move, 100)
        }
    }
    document.getElementById("sprite").src = "jumpAttack (" + jumpImage + ").png";
}

var boxId = 0;
var bml = 200;
function skull() {
    for (var b = 0; b < 10; b++) {
        var skull = document.createElement("div");
        skull.className = "skull";
        skull.id = "skull" + b;
        if (b <= 5) {
            bml = bml + 1500;
        }
        if (b >= 6) {
            bml = bml + 1000;
        }
        skull.style.marginLeft = bml + "px";
        document.getElementById("background").appendChild(skull);
    }
}

var die = 0;
var kill = 1;
function died() {
    kill = kill + 1;
    if (kill == 11) {
        kill = 10;
        document.getElementById("sprite").style.marginTop = "500px";
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = sNumber;
    }
    document.getElementById("sprite").src = "Dead (" + kill + ").png";

}
var boxWorker = 0;
function move() {
    for (var b = 0; b < 50; b++) {
        var x = getComputedStyle(document.getElementById("skull" + b));
        var y = parseInt(x.marginLeft) - 20;
        document.getElementById("skull" + b).style.marginLeft = y + "px";
        //alert(y);
        if (y >= 80 & y <= 180) {
            if (bmt > 360) {
                clearInterval(runWorker);
                runWorker = -1;
                clearInterval(jumpWorker);
                jumpWorker = -1;
                clearInterval(scoreWorker);
                scoreWorker = -1;
                clearInterval(backgroundWorker);
                backgroundWorker = -1;
                die = setInterval(died, 100);
                jumpSoundClip.pause();
                backgroundSoundClip.pause();
                wSoundClip.pause();
                runSoundClip.pause();
                painSoundClip.play();
                knifeSoundClip.play();
                alertSoundClip.play();
                evilSoundClip.play();
                die = setInterval(died, 100);
                clearInterval(boxWorker);
            }
        }
}
}

function r() {
    location.reload();
}

function q() {
    location.reload();
}

function rq() {
    location.reload();
}
