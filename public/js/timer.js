var workTime = 25; // Amount of minutes to work before small break
var breakTime = 5; // Amount of minutes for small break
var repCount = 4; // Amount of work reps before large rest
var restTime = 30; // Amount of mintues for large rest

var first = true;

var currentPomodoroMilliseconds = 0; // milliseconds of pomodoro time done
var currentRepCount = 0; // Rep number out of repCount + 1 for restTime;
var lastRepCount = 0;
var currentRepPercent = 0; // Percentage of Rep
var currentSetPercent = 0; // Percentage of total set
var pomodoroPaused = true;
var onBreak = false;
var lastOnBreak = true;

var stopWatchTime = 0;
var stopWatchLaps = new Array();
var stopWatchPaused = true;

// Stopwatch dom Elements
var stopWatchStartStopButtons = document.getElementsByClassName("stopWatchStartStopButton");
var stopWatchLapResetButtons = document.getElementsByClassName("stopWatchLapResetButton");
var stopWatchTimeDisplays = document.getElementsByClassName("stopWatchTimeDisplay");
var stopWatchLapLists = document.getElementsByClassName("stopWatchLapList");

pomodoroForm = document.getElementById("pomodoroForm");

elementWedgeContainer = document.getElementById("wedgeContainer");
eggInner = document.getElementById("eggInner");
eggClock = document.getElementById("eggClock");

// Pomodoro settings to save
class Pomodoro {
  constructor (workTimeToSave, breakTimeToSave, repCountToSave, restTimeToSave, currentPomodoroMillisecondsToSave, currentRepCountToSave, lastRepCountToSave, currentRepPercentToSave, currentSetPercentToSave, pomodoroPausedToSave, onBreakToSave, lastOnBreakToSave, currentLocalTime)
  {
    this.workTime = workTimeToSave;
    this.breakTime = breakTimeToSave;
    this.repCount = repCountToSave;
    this.restTime = restTimeToSave;

    this.currentPomodoroMilliseconds = currentPomodoroMillisecondsToSave;
    this.currentRepCount = currentRepCountToSave;
    this.lastRepCount = lastRepCountToSave;
    this.currentRepPercent = currentRepPercentToSave;
    this.currentSetPercent = currentSetPercentToSave;
    this.pomodoroPaused = pomodoroPausedToSave;
    this.onBreak = onBreakToSave;
    this.lastOnBreak = lastOnBreakToSave;
    this.lastSavedTime = currentLocalTime;
  }
}
// stopwatch settings to save
class Stopwatch {
  constructor(stopWatchTimeToSave, stopWatchLapsToSave, stopWatchPausedToSave)
  {
    this.time = stopWatchTimeToSave;
    this.laps = stopWatchLapsToSave;
    this.paused = stopWatchPausedToSave;
  }
}

// Play stopwatch
function stopWatchStart()
{
  stopWatchPaused = false;
  updateStopWatch();
}

// Pause stopwatch
function stopWatchStop()
{
  stopWatchPaused = true;
  updateStopWatch();
}

// Save a new lap since last lap
function stopWatchLap()
{
  let preLappedTime = 0;
  for (let i = 0; i < stopWatchLaps.length; i++)
  {
    preLappedTime += stopWatchLaps[i];
  }
  stopWatchLaps.unshift(stopWatchTime - preLappedTime);
  updateStopWatch();
}

// Clear all laps and reset time to zero
function stopWatchReset()
{
  stopWatchTime = 0;
  deleteLap(-1);
  updateStopWatch();
}

// delete all laps or specific lap
function deleteLap(index)
{
  if (index < 0)
  {
    stopWatchLaps = new Array();
  }
  else {
    stopWatchLaps.splice(index, 1);
  }
  updateStopWatch();
}

// Update DOM elements for stopwatch(es)
function updateStopWatch()
{
  // update button
  if (!stopWatchPaused) // If currently playing
  {
    for (let i = 0; i < stopWatchStartStopButtons.length; i++)
    {
      stopWatchStartStopButtons[i].textContent = "Stop";
    }

    for (let i = 0; i < stopWatchLapResetButtons.length; i++)
    {
      stopWatchLapResetButtons[i].textContent = "Lap";
    }
  } else {  // If currently paused
    for (let i = 0; i < stopWatchStartStopButtons.length; i++)
    {
      stopWatchStartStopButtons[i].textContent = "Start";
    }

    for (let i = 0; i < stopWatchLapResetButtons.length; i++)
    {
      stopWatchLapResetButtons[i].textContent = "Reset";
    }
  }
  // update time display
  for (let i = 0; i < stopWatchTimeDisplays.length; i++)
  {
    stopWatchTimeDisplays[i].textContent = toSWTime(stopWatchTime);
  }

  // update lap lists
  let lapsString = "";
  for (let i = 0; i < stopWatchLaps.length; i++)
  {
    lapsString += "<li>" + toSWTime(stopWatchLaps[i]) + "</li>";
  }
  for (let i = 0; i < stopWatchLapLists.length; i++)
  {
    stopWatchLapLists[i].innerHTML = lapsString;
  }

  saveTimers();
}

function toSWTime(milliseconds)
{
  let seconds = Math.floor(milliseconds / 1000);
  let millies = Math.floor(milliseconds / 10) - Math.floor(milliseconds / 1000) * 100;
  return (Math.floor(seconds / 60) < 10 ? "0" : "") + Math.floor(seconds / 60) + ":" + (Math.round(seconds % 60) < 10 ? "0" : "") + Math.round(seconds % 60) + ":" + (millies < 10 ? "0" : "") + millies;
}

function stopWatchStartStopClick()
{
  if (stopWatchPaused) // If currently paused
  {
    stopWatchStart();
  } else { // If currently playing
    stopWatchStop();
  }
}

function stopWatchLapResetClick()
{
    if (stopWatchPaused) // If currently paused
    {
      stopWatchReset();
    } else { // If currently playing
      stopWatchLap();
    }
}

loadPomodoro();
loadStopwatch();

adjustPomodoroSettings();
playPomodoro();

updateStopWatch();

function pomodoroSettings()
{
  pausePomodoro();

  let floating = document.getElementById('floating');
  for (let j = 0; j < floating.children.length; j++)
  {
    floating.children[j].style.display = "none";
  }

  document.getElementById('floating').classList.remove('hidden');
  pomodoroForm.style.display = "flex";

  pomodoroForm.elements.pomodoroWorkInput.style.borderColor = "#C4C4C4";
  pomodoroForm.elements.pomodoroBreakInput.style.borderColor = "#C4C4C4";
  pomodoroForm.elements.pomodoroRepsInput.style.borderColor = "#C4C4C4";
  pomodoroForm.elements.pomodoroRestInput.style.borderColor = "#C4C4C4";

  pomodoroForm.elements.pomodoroWorkInput.value = workTime;
  pomodoroForm.elements.pomodoroBreakInput.value = breakTime;
  pomodoroForm.elements.pomodoroRepsInput.value = repCount;
  pomodoroForm.elements.pomodoroRestInput.value = restTime;
}

// Submit pomodoro setting form
pomodoroForm.addEventListener("submit", function(event){
  event.preventDefault();
  document.getElementById('floating').classList.add('hidden');
  pomodoroForm.style.display = "none";
  modifiedPomodoroSettings();
  saveTimers();
});

function pomodoroInputsChanged()
{
  pomodoroForm.elements.pomodoroWorkInput.value = Math.max(Math.min(pomodoroForm.elements.pomodoroWorkInput.value, 60), 1);  // Clamp workTime between 1 and 60
  pomodoroForm.elements.pomodoroBreakInput.value = Math.max(Math.min(pomodoroForm.elements.pomodoroBreakInput.value, pomodoroForm.elements.pomodoroWorkInput.value), 1);  // Clamp breakTime between 1 and workTime
  pomodoroForm.elements.pomodoroRepsInput.value = Math.max(Math.min(pomodoroForm.elements.pomodoroRepsInput.value, 25), 1);  // Clamp reps between 1 and 25
  pomodoroForm.elements.pomodoroRestInput.value = Math.max(Math.min(pomodoroForm.elements.pomodoroRestInput.value, 60), 1);  // Clamp restTime between 1 and 60


    let workNew = parseInt(pomodoroForm.elements.pomodoroWorkInput.value.toString());
    let breakNew = parseInt(pomodoroForm.elements.pomodoroBreakInput.value.toString());
    let repsNew = parseInt(pomodoroForm.elements.pomodoroRepsInput.value.toString());
    let restNew = parseInt(pomodoroForm.elements.pomodoroRestInput.value.toString());

    pomodoroForm.elements.pomodoroWorkInput.style.borderColor = "#C4C4C4";
    pomodoroForm.elements.pomodoroBreakInput.style.borderColor = "#C4C4C4";
    pomodoroForm.elements.pomodoroRepsInput.style.borderColor = "#C4C4C4";
    pomodoroForm.elements.pomodoroRestInput.style.borderColor = "#C4C4C4";
    if (workNew >= 60 || workNew <= 1) pomodoroForm.elements.pomodoroWorkInput.style.borderColor = "#5242B5";
    if (breakNew >= workNew || breakNew <= 1) pomodoroForm.elements.pomodoroBreakInput.style.borderColor = "#5242B5";
    if (repsNew >= 25 || repsNew <= 1) pomodoroForm.elements.pomodoroRepsInput.style.borderColor = "#5242B5";
    if (restNew >= 60 || restNew <= 1) pomodoroForm.elements.pomodoroRestInput.style.borderColor = "#5242B5";
}

function pomodoroInputsChangedHighlight()
{
}

function modifiedPomodoroSettings()
{
  workTime = pomodoroForm.elements.pomodoroWorkInput.value;
  breakTime = pomodoroForm.elements.pomodoroBreakInput.value;
  repCount = pomodoroForm.elements.pomodoroRepsInput.value;
  restTime = pomodoroForm.elements.pomodoroRestInput.value;

  pomodoroPaused = true;
  resetPomodoro();
  adjustPomodoroSettings();
  playPomodoro();
}

function adjustPomodoroSettings()
{
  // Clamp reps between 1 and 25
  repCount = Math.max(Math.min(repCount, 25), 1);
  // Clamp workTime between 1 and 60
  workTime = Math.max(Math.min(workTime, 60), 1);
  // Clamp breakTime between 1 and workTime
  breakTime = Math.max(Math.min(breakTime, workTime), 1);
  // Clamp restTime between 1 and 60
  restTime = Math.max(Math.min(restTime, 60), 1);
  // Create the breakTime region on the main eggClock
  let breakDegrees = 180 - breakTime / (breakTime + workTime) * 360;
  document.querySelector(':root').style.setProperty('--breakDeg', String(breakDegrees) + "deg");
  // Create the Set Counters around the main clock
  elementWedgeContainer.innerHTML = "";
  // Size the Elements
  document.querySelector(':root').style.setProperty('--repDeg', String(360 / (repCount + 1) - 180) + "deg");
  document.querySelector(':root').style.setProperty('--rotDeg', String(360 / (repCount + 1)) + "deg");
  document.querySelector(':root').style.setProperty('--gapDeg', String(Math.min(1,Math.max(5, 25 / repCount))) + "deg");
  // Add the Elements
  for (let i = 0; i < repCount + 1; i++)
  {
    (i <= currentRepCount ? "100%" : "50%")
    elementWedgeContainer.innerHTML += "<div class='wedge" + (i == repCount ? " rest" : " done") + "' style='opacity:" + (i <= currentRepCount ? "100%" : "50%") + ";transform:rotate(calc(" + i + " * var(--rotDeg)));'><div></div><div></div></div>"
  }
  saveTimers();
}

// Play or Pause pomodoro
function pomodoroPlayPause()
{
  pomodoroPaused = !pomodoroPaused;

  if (pomodoroPaused)
  {
    pausePomodoro();
    document.getElementById("pomodoroPlayPauseButton").textContent = "Play Timer";
  } else {
    playPomodoro();
    document.getElementById("pomodoroPlayPauseButton").textContent = "Pause Timer";
  }
}

function playPomodoro()
{
    if (currentPomodoroMilliseconds > 0)
    {
      document.getElementById("pomodoroSetResetButton").textContent = "Reset Timer";
    } else {
      document.getElementById("pomodoroSetResetButton").textContent = "Set Timer";
    }


    if (pomodoroPaused)
    {
      document.getElementById("pomodoroPlayPauseButton").textContent = "Play Timer";
    } else {
      document.getElementById("pomodoroPlayPauseButton").textContent = "Pause Timer";
    }

  // Working
  onBreak = false;

  // Get current state of play in percentages
  let currentPomodoroMinutes = currentPomodoroMilliseconds / 60000;
  let fullRepMinutes = (workTime + breakTime);
  let fullSetMinutes = fullRepMinutes * repCount + restTime;

  if (currentRepCount == repCount)
  {
    currentRepPercent = (currentPomodoroMinutes % (fullRepMinutes * repCount)) / restTime * 100;
  } else {
    currentRepPercent = (currentPomodoroMinutes % fullRepMinutes) / fullRepMinutes * 100;
  }

  // Move up Rep
  currentRepCount = Math.min(Math.floor(currentPomodoroMinutes / fullRepMinutes), repCount);

  currentSetPercent = currentRepCount / (repCount + 1) * 100 + currentRepPercent / (repCount + 1);

  let smallHandDegree = 360 * currentRepPercent / 100;
  let bigHandDegree = 360 * currentSetPercent / 100;

  // On breaktime
  if (currentRepCount == repCount || currentRepPercent >= (100 - breakTime / (workTime + breakTime) * 100))
    onBreak = true;
  // Change break and time message
  if (onBreak != lastOnBreak || first)
  {
    if (onBreak)
    {
      eggInner.style.color = "red";
      document.getElementById("pomodoroMessage").textContent = "Relax!";
    } else {
      eggInner.style.color = "black";
      document.getElementById("pomodoroMessage").textContent = "Work!";
    }

    first = false;
  }
  let seconds = 0;
  if (onBreak)
  {
    seconds = Math.round((1 - currentRepPercent / 100) * (currentRepCount == repCount ? restTime : fullRepMinutes) * 60);
  } else {
    seconds = Math.round((1 - currentRepPercent / 100 - breakTime / (workTime + breakTime)) * (currentRepCount == repCount ? restTime : fullRepMinutes) * 60);
  }
  document.getElementById("pomodoroTime").textContent = (Math.floor(seconds / 60) < 10 ? "0" : "") + Math.floor(seconds / 60) + ":" + (Math.round(seconds % 60) < 10 ? "0" : "") + Math.round(seconds % 60);

  // Rotate Hands
  document.querySelector(':root').style.setProperty('--smallHandDeg', String(smallHandDegree) + "deg");
  document.querySelector(':root').style.setProperty('--bigHandDeg', String(bigHandDegree) + "deg");

  // Adjust Outside ring
  if (currentRepCount != lastRepCount)
    adjustPomodoroSettings();
  // Change Clock Face to red if in Rest
  if (currentRepCount == repCount)
  {
    eggClock.classList.add("break");
  } else {
    eggClock.classList.remove("break");
  }

  // Reset Set
  if (currentSetPercent >= 100)
  {
    resetPomodoro();
  }

  lastRepCount = currentRepCount;
  lastOnBreak = onBreak;

  saveTimers();
}

function pausePomodoro()
{
  document.getElementById("pomodoroPlayPauseButton").textContent = "Play Timer";
  pomodoroPaused = true;
//  clearInterval(pomodoro);
  saveTimers();
}

function resetPomodoro()
{
  currentPomodoroMilliseconds = 0;
  currentRepCount = 0;
  currentRepPercent = 0;
  currentSetPercent = 0;
  adjustPomodoroSettings();
  saveTimers();
}

// Count Pomodoro Timer by seconds
var pomodoro = window.setInterval(function(){
  if (!pomodoroPaused)
  {
  currentPomodoroMilliseconds += 100;
  playPomodoro();
  }
}, 100);

// Count Stopwatch Timer by 10 milliseconds
var stopWatch = window.setInterval(function(){
  if (!stopWatchPaused)
  {
    stopWatchTime += 10;
    updateStopWatch();
  }
}, 10);

// Save pomodoro and stopwatch to localStorage
function saveTimers()
{
  let pomodoroSettings = new Pomodoro(workTime, breakTime, repCount, restTime, currentPomodoroMilliseconds, currentRepCount, lastRepCount, currentRepPercent, currentSetPercent, pomodoroPaused, onBreak, lastOnBreak, Date.now());
  let stopwatchSettings = new Stopwatch(stopWatchTime, stopWatchLaps, stopWatchPaused);
  localStorage.setItem('pomodoro', JSON.stringify(pomodoroSettings));
  localStorage.setItem('stopwatch', JSON.stringify(stopwatchSettings));
}

// Update pomodoro from localStorage
function loadPomodoro()
{
  pomodoroForm.elements.pomodoroWorkInput.value = workTime;
  pomodoroForm.elements.pomodoroBreakInput.value = breakTime;
  pomodoroForm.elements.pomodoroRepsInput.value = repCount;
  pomodoroForm.elements.pomodoroRestInput.value = restTime;

  let loaded = JSON.parse(localStorage.getItem('pomodoro'));
  if (loaded == null) return;

  let elapsedTime = 0;
  if (loaded.lastSavedTime != null && !loaded.pomodoroPaused)
  {
    elapsedTime = Date.now() - loaded.lastSavedTime;
  }

  workTime = loaded.workTime;
  breakTime = loaded.breakTime;
  repCount = loaded.repCount;
  restTime = loaded.restTime;

  pomodoroForm.elements.pomodoroWorkInput.value = workTime;
  pomodoroForm.elements.pomodoroBreakInput.value = breakTime;
  pomodoroForm.elements.pomodoroRepsInput.value = repCount;
  pomodoroForm.elements.pomodoroRestInput.value = restTime;

  currentPomodoroMilliseconds = loaded.currentPomodoroMilliseconds + elapsedTime;
  currentRepCount = loaded.currentRepCount;
  lastRepCount = loaded.lastRepCount;
  currentRepPercent = loaded.currentRepPercent;
  currentSetPercent = loaded.currentSetPercent;
  pomodoroPaused = loaded.pomodoroPaused;
  onBreak = loaded.onBreak;
  lastOnBreak = loaded.lastOnBreak;
}
// Update stopwatch from localStorage
function loadStopwatch()
{
  let loaded = JSON.parse(localStorage.getItem('stopwatch'));
  if (loaded == null) return;

  stopWatchTime = loaded.time;
  stopWatchLaps = loaded.laps;
  stopWatchPaused = loaded.paused;
}
