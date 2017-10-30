var h1 = document.getElementsByTagName('h1')[0],
start = document.getElementById('start'),
stop = document.getElementById('stop'),
reset = document.getElementById('reset'),
seconds = 0, minutes = 0, hours = 0,
startTable = document.getElementById("History Table Start"),
stopTable = document.getElementById("History Table Stop"),
lat,
long,
totalTimeElapsed,
t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}



/* get longitude and latitude */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getCoordinates(position) {
    lat = position.coords.latitude.toFixed(2);
    long = position.coords.long.toFixed(2);
    }
/* Start button */

start.onclick = function(){
    row = startTable.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell1.innerHTML = h1.textContent;
    getLocation();
    cell3.innerHTML = lat;
    cell4.innerHTML = long;
    add();
    
}
function timeElapsed(){
    var startTime = startTable.rows.item(1).cells.item(0).innerHTML;
    var stopTime = stopTable.rows.item(1).cells.item(0).innerHTML;
    var startTimeString = startTime.toString();
    var stopTimeString = stopTime.toString();
    var startHours = startTimeString.slice(0,2);
    var startMinutes = startTimeString.slice(3,5);
    var startSeconds = startTimeString.slice(6);
    var stopHours = stopTimeString.slice(0,2);
    var stopMinutes = stopTimeString.slice(3,5);
    var stopSeconds = stopTimeString.slice(6);
    var startTimeinSec = (Number.parseInt(startHours) * 3600) + (Number.parseInt(startMinutes) * 60) + Number.parseInt(startSeconds);
    var stopTimeinSec = (Number.parseInt(stopHours) * 3600) + (Number.parseInt(stopMinutes) * 60) + Number.parseInt(stopSeconds);
    totalTimeElapsed = Math.abs(stopTimeinSec - startTimeinSec) + " " + "seconds";
}

/* Stop button */

stop.onclick = function() {
    clearTimeout(t);
    row = stopTable.insertRow(1);
    cell5 = row.insertCell(0);
    cell6 = row.insertCell(1);
    cell7 = row.insertCell(2);
    cell8 = row.insertCell(3);
    cell9 = row.insertCell(4);
    cell5.innerHTML = h1.textContent;
    getLocation();
    cell7.innerHTML = lat;
    cell8.innerHTML = long;
    timeElapsed();
    cell9.innerHTML = totalTimeElapsed;
}


/* Reset button */
reset.onclick = function() {
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    for(int i = 1; i < startTable.rows.length; i++){
        startTable.deleteRow(i);
        stopTable.deleteRow(i);
    }
}
