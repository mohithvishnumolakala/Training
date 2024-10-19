const totalFloors = 5;
let currentFloor = 0;
let isMoving = false;
let queue = [];

const liftElement = document.getElementById("lift");
const statusElement = document.getElementById("status");
const directionElement = document.getElementById("direction");
const logElement = document.getElementById("matter");

function requestLift() {
    const requestedFloor = parseInt(document.getElementById("floorInput").value);
    
    if (isNaN(requestedFloor) || requestedFloor < 0 || requestedFloor > totalFloors) {
        updateLog("Invalid floor number! Enter a number between 0 and " + totalFloors + ".");
        return;
    }
    
    if (requestedFloor === currentFloor) {
        updateLog(`Lift is already on floor ${requestedFloor}.`);
        return;
    }

    queue.push(requestedFloor);
    updateLog(`Request added for floor ${requestedFloor}.`);
    
    if (!isMoving) {
        processQueue();
    }
}

function processQueue() {
    if (queue.length > 0) {
        const nextFloor = queue.shift();
        moveToFloor(nextFloor);
    }
}

function moveToFloor(floor) {
    isMoving = true;
    updateDirection(floor);
    updateStatus(`Lift moving to floor ${floor}.`);

    const moveTime = Math.abs(currentFloor - floor) * 1000;
    setTimeout(() => {
        currentFloor = floor;
        liftElement.style.bottom = `${floor * 100}px`;

        updateStatus(`Lift arrived at floor ${floor}. Opening doors...`);
        updateLog(`Lift doors opening at floor ${floor}.`);
        
        setTimeout(() => {
            updateLog(`Lift doors closing at floor ${floor}.`);
            updateStatus("Lift is stationary.");
            isMoving = false;
            updateDirection(null);
            processQueue();
        }, 2000);
        
    }, moveTime);
}

function updateDirection(targetFloor) {
    if (targetFloor === null) {
        directionElement.innerText = "Direction: Stopped";
    } else if (targetFloor > currentFloor) {
        directionElement.innerText = "Direction: Up";
    } else {
        directionElement.innerText = "Direction: Down";
    }
}

function updateStatus(message) {
    statusElement.innerText = message;
}

function updateLog(message) {
    logElement.innerHTML += `<p>${message}</p>`;
    logElement.scrollTop = logElement.scrollHeight;
}
