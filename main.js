const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

let openDoor1;
let openDoor2;
let openDoor3;

let currentlyPlaying = true;

const currentStreak = document.getElementById('current-Streak');
const bestStreak = document.getElementById('best-Streak');
let countCurrentStreak = 0;
let countBestStreak = 0;

let resetBtn = document.getElementById('button');
let numOfClosedDoors = 3;

let getRandomDoorPath = () => {
    let randomNum = Math.floor(Math.random()*3);
    switch(randomNum) {
        case 0:
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 1:
            openDoor1 = beachDoorPath;
            openDoor2 = botDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 2:
            openDoor1 = spaceDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = botDoorPath;
            break;
    }
}


doorImage1.onclick = () => {
    if(!isClicked(doorImage1) && currentlyPlaying){
        doorImage1.src = openDoor1;
        playGame(doorImage1);
    }
}

doorImage2.onclick = () => {
    if(!isClicked(doorImage2) && currentlyPlaying){
        doorImage2.src = openDoor2;
        playGame(doorImage2);
    }
}

doorImage3.onclick = () => {
    if(!isClicked(doorImage3) && currentlyPlaying){
        doorImage3.src = openDoor3;
        playGame(doorImage3);
    }
}

resetBtn.onclick = () => {
    startRound();
}
const startRound = () => {
    if (!currentlyPlaying) {
        doorImage1.src = closedDoorPath;
        doorImage2.src = closedDoorPath;
        doorImage3.src = closedDoorPath;
        numOfClosedDoors = 3;
        resetBtn.innerHTML = '<button class="btn btn-info">Good Luck! Start</button>';
        currentlyPlaying = true;
        getRandomDoorPath();
    }
}

let isBot = doorBot => {
    if(doorBot.src === botDoorPath){
        return true;
    }
    else {
        return false;
    }
}

let isClicked = door => {
    if(door.src === closedDoorPath){
        
        return false;
    }
    else {
        return true;
    }
}

const playGame = door => {
    numOfClosedDoors--;
    if(numOfClosedDoors === 0){
        gameOver('win');
    }
    else if(isBot(door)) {
        gameOver();
    }
}

const gameOver = status => {
    if(status === 'win'){
        resetBtn.innerHTML = '<button class="btn btn-success">You win! Play again?</button>';
        currentStreak.innerHTML = ++countCurrentStreak;
        if(countCurrentStreak > countBestStreak) {
            countBestStreak = countCurrentStreak;
            bestStreak.innerHTML = countBestStreak;
        }
    }
    else {
        resetBtn.innerHTML = '<button class="btn btn-danger">Game Over! Play again?</button>';
        countBestStreak = countBestStreak;
        countCurrentStreak = 0;
        currentStreak.innerHTML = countCurrentStreak;
    }
    currentlyPlaying = false;
}


getRandomDoorPath();
startRound();