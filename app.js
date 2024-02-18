let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["green", "yellow", "blue", "red"];

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Starts");
        started = true;
    }

    levelUp();
})

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200)
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200)
}

function levelUp() {
    userSeq = [];
    ``
    level++;
    h2.innerHTML = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4);

    let randColor = btns[randIndex];
    let randButton = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randButton);
}

function checkAns(idx) {
    console.log(level);

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000); // Removed parentheses from levelUp
        }
    }
    else {
        // Play game over sound effect
        playGameOverSound();

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"
        }, 100);

        h2.innerHTML = `Game Over! Your score is ${level} <br> Press any to start`;
        reset();
    }
}

function btnPress() {
    let btn = this;
    console.log(btn);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// game over sound
function playGameOverSound() {
    var sound = document.getElementById("gameOverSound");
    sound.play();
}
