// Global event
var justUpdatedTaskList = false;

// Task object
class Task {
  constructor(id, title, description, subtasks, dueDate, importance, duration, completion, done)
  {
    this.id = id; // Task ID;
    this.title = title; // Task Title (string)
    this.description = description; // Task Description (string)
    this.subtasks = subtasks; // Task Subtasks
    this.dueDate = dueDate; // Task Due Date (date)
    this.importance = importance; // Task Importance (number percentage of 100)
    this.duration = duration; // Task Duration (number of minutes to fully complete task)
    this.completion = completion; // Task Completion (number percentage of full task completion)
    this.done = done; // Crossed off
  }
}

// Empty array to add new tasks to
var taskList = new Array();


// Range indicators on floating form
var importanceIndicator = document.getElementById('importanceIndicator');
var completionIndicator = document.getElementById('completionIndicator');

function formImportance(value) {
      let blend = value / 100 * 4 - Math.floor(value / 100 * 4);
      blend *= blend;
      blend *= blend;
      blend *= blend;

      let r = document.querySelector(':root');
      switch(Math.floor(value / 100 * 4))
      {
        case 0:
          importanceIndicator.textContent = "!";
          importanceIndicator.style.color = blendHex("#FFFFFF00", "#75D000FF", blend);
          r.style.setProperty('--formImportanceColor', blendHex("#C4C4C4FF", "#75D000FF", blend));
          break;
        case 1:
          importanceIndicator.textContent = "!";
          importanceIndicator.style.color = blendHex("#75D000FF", "#FFB800FF", blend);
          r.style.setProperty('--formImportanceColor', blendHex("#75D000FF", "#FFB800FF", blend));
          break;
        case 2:
          importanceIndicator.textContent = "!!";
          importanceIndicator.style.color = blendHex("#FFB800FF", "#FF0000FF", blend);
          r.style.setProperty('--formImportanceColor', blendHex("#FFB800FF", "#FF0000FF", blend));
          break;
        case 3:
          importanceIndicator.textContent = "!!!";
          importanceIndicator.style.color = blendHex("#FF0000FF", "#DD0000FF", blend);
          r.style.setProperty('--formImportanceColor', blendHex("#FF0000FF", "#DD0000FF", blend));
          break;
        case 4:
          importanceIndicator.textContent = "!!!";
          importanceIndicator.style.color = "#DD0000FF";
          r.style.setProperty('--formImportanceColor', "#DD0000FF");
          break;
      }
}

function formCompletion(value) {
  if (value < 50)
  {
    let r = document.querySelector(':root').style.setProperty('--formCompletionColor', blendHex("#C4C4C4FF", "#FFA800FF", Math.min(1, (value - 1) / 100 * 4) ));
  } else {
    let r = document.querySelector(':root').style.setProperty('--formCompletionColor', blendHex("#FFA800FF", "#75D000FF", Math.max(0, Math.min(1, (value - 1) / 100 * 10 - 9))));
  }
  completionIndicator.textContent = Math.round(value) + "%";
}

formImportance(document.getElementById('inputImportanceValue').value);
formCompletion(document.getElementById('inputCompletionValue').value);

// Range indicators on aside
var importanceIndicatorList = document.getElementById('importanceIndicatorList');
var importanceIndicatorBlock = document.getElementById('importanceIndicatorBlock');
var completionIndicatorList = document.getElementById('completionIndicatorList');
var completionIndicatorBlock = document.getElementById('completionIndicatorBlock');

function asideImportance(value) {
  if (taskList.length == 0) return;
  let r = document.querySelector(':root');

  taskList[indexOf(highlighted)].importance = value;
  let blend = value / 100 * 4 - Math.floor(value / 100 * 4);
  blend *= blend;
  blend *= blend;
  blend *= blend;
  switch(Math.floor(value / 100 * 4))
  {
    case 0:
      importanceIndicatorList.textContent = "!";
      importanceIndicatorList.style.color = blendHex("#FFFFFF00", "#75D000FF", blend);
      importanceIndicatorBlock.textContent = "!";
      importanceIndicatorBlock.style.color = blendHex("#FFFFFF00", "#75D000FF", blend);
      r.style.setProperty('--asideImportanceColor', blendHex("#C4C4C4FF", "#75D000FF", blend));
      break;
    case 1:
      importanceIndicatorList.textContent = "!";
      importanceIndicatorList.style.color = blendHex("#75D000FF", "#FFB800FF", blend);
      importanceIndicatorBlock.textContent = "!";
      importanceIndicatorBlock.style.color = blendHex("#75D000FF", "#FFB800FF", blend);
      r.style.setProperty('--asideImportanceColor', blendHex("#75D000FF", "#FFB800FF", blend));
      break;
    case 2:
      importanceIndicatorList.textContent = "!!";
      importanceIndicatorList.style.color = blendHex("#FFB800FF", "#FF0000FF", blend);
      importanceIndicatorBlock.textContent = "!!";
      importanceIndicatorBlock.style.color = blendHex("#FFB800FF", "#FF0000FF", blend);
      r.style.setProperty('--asideImportanceColor', blendHex("#FFB800FF", "#FF0000FF", blend));
      break;
    case 3:
      importanceIndicatorList.textContent = "!!!";
      importanceIndicatorList.style.color = blendHex("#FF0000FF", "#DD0000FF", blend);
      importanceIndicatorBlock.textContent = "!!!";
      importanceIndicatorBlock.style.color = blendHex("#FF0000FF", "#DD0000FF", blend);
      r.style.setProperty('--asideImportanceColor', blendHex("#FF0000FF", "#DD0000FF", blend));
      break;
    case 4:
      importanceIndicatorList.textContent = "!!!";
      importanceIndicatorList.style.color = "#FF0000FF";
      importanceIndicatorBlock.textContent = "!!!";
      importanceIndicatorBlock.style.color = "#FF0000FF";
      r.style.setProperty('--asideImportanceColor', "#FF0000FF");
      break;
  }
  saveTasks();
  updateTaskList();
}

function asideCompletion(value) {
  if (taskList.length == 0) return;
  if (value < 50)
  {
    let r = document.querySelector(':root').style.setProperty('--asideCompletionColor', blendHex("#C4C4C4FF", "#FFA800FF", Math.min(1, (value - 1) / 100 * 4) ));
  } else {
    let r = document.querySelector(':root').style.setProperty('--asideCompletionColor', blendHex("#FFA800FF", "#75D000FF", Math.max(0, Math.min(1, (value - 1) / 100 * 10 - 9))));
  }
  taskList[indexOf(highlighted)].completion = value;

  completionIndicatorList.textContent = Math.round(value) + "%";
  completionIndicatorBlock.textContent = Math.round(value) + "%";
  saveTasks();
  updateTaskList();
  updateTimeRemaining(indexOf(highlighted));
  partialCrossOff();
}

asideImportance(document.getElementById('inputImportanceValue').value);
asideCompletion(document.getElementById('inputCompletionValue').value);

// https://coderwall.com/p/z8uxzw/javascript-color-blender
function blendHex (hexA, hexB, blend)
{
  rgbA = [parseInt(hexA[1] + hexA[2], 16), parseInt(hexA[3] + hexA[4], 16), parseInt(hexA[5] + hexA[6], 16), parseInt(hexA[7] + hexA[8], 16)];
  rgbB = [parseInt(hexB[1] + hexB[2], 16), parseInt(hexB[3] + hexB[4], 16), parseInt(hexB[5] + hexB[6], 16), parseInt(hexB[7] + hexB[8], 16)];
  rgbC = [rgbA[0] + (rgbB[0] - rgbA[0]) * blend, rgbA[1] + (rgbB[1] - rgbA[1]) * blend, rgbA[2] + (rgbB[2] - rgbA[2]) * blend, rgbA[3] + (rgbB[3] - rgbA[3]) * blend]
  return '#' + intToHex(rgbC[0]) + intToHex(rgbC[1]) + intToHex(rgbC[2]) + intToHex(rgbC[3]);
}
function intToHex(num)
{
    var hex = Math.round(num).toString(16);
    if (hex.length == 1)
        hex = '0' + hex;
    return hex;
}

// Form event that adds a new task to the task list, upon clicking the submit button
var form = document.getElementById("newTaskForm");
var add = document.getElementById("addTaskButton");
add.addEventListener("click", function(event){
  fillForm(0);
});

// Form event that edits a task in the task list, upon clicking the button
var modify = document.getElementById("modifyTaskButton");
modify.addEventListener("click", function(){
  fillForm(modify.dataset.id);
});

function fillForm(modifiedTaskId)
  {
  let title = form.elements.inputTitle.value;
  let description = form.elements.inputDescription.value;
  let subtasks = form.elements.inputSubtasks.value;
  let dueDate = form.elements.inputDueDate.value;
  let importance = form.elements.inputImportance.value;
  let duration = form.elements.inputDuration.value;
  let completion = form.elements.inputCompletion.value;

  if (title.trim().length === 0)
    title = "Untitled";
  else
    title = title.trim();

  if (description.trim().length === 0)
    description = "";
  else
    description = description.trim();

  duration = Math.max(duration, 0);

  if (dueDate == "")
  {
    return;
  }

// Create new task or modify existing
  if (modifiedTaskId == 0)
  {
    addTask(Date.now().toString(), title, description, subtasks, dueDate, importance, duration, completion, false);
  } else {
    let done = taskList[indexOf(modifiedTaskId)].done;
    addTask(modifiedTaskId, title, description, subtasks, dueDate, importance, duration, completion, done);
  }
  saveTasks();
  // Updates the Task List element on the page
  updateTaskList();
  if (taskList.length > 0)
  {
    highlightTask(taskList[0].id);
  } else {
    highlightTask(0);
  }

  document.getElementById('floating').classList.add('hidden');
}

function updateTimeRemaining(i)
{
  let remainingMinutes = Math.round(taskList[i].duration / 100 * (100 - taskList[i].completion) % 60);
  let remainingHours = Math.floor(taskList[i].duration / 100 * (100 - taskList[i].completion) / 60);
  let totalMinutes = taskList[i].duration % 60;
  let totalHours = taskList[i].duration / 60;
  document.getElementById('highlightListDuration').innerHTML = "<span style='font-weight:bold;font-style:normal;'>" + (remainingHours > 0 ? Math.floor(remainingHours) + "h " : "") + (remainingHours > 0 && remainingMinutes == 0 ? "" : Math.floor(remainingMinutes)) + "min</span><span style='color:#0000007D;font-weight:normal;font-style:italic;'>/ " + (Math.floor(totalHours)  > 0 ? Math.floor(totalHours) + "h " : "") + (totalHours > 0 && totalMinutes == 0 ? "" : Math.floor(totalMinutes)) + "min</span>";
  document.getElementById('highlightBlockDuration').innerHTML = "<span style='font-weight:bold;font-style:normal;'>" + (remainingHours > 0 ? Math.floor(remainingHours) + "h " : "") + (remainingHours > 0 && remainingMinutes == 0 ? "" : Math.floor(remainingMinutes)) + "min</span><span style='color:#0000007D;font-weight:normal;font-style:italic;'>/ " + (Math.floor(totalHours)  > 0 ? Math.floor(totalHours) + "h " : "") + (totalHours > 0 && totalMinutes == 0 ? "" : Math.floor(totalMinutes)) + "min</span>";
}

// highlight incorrect date
function redDate()
{
  let val = document.getElementById('inputDueDateValue').value;
  if (val == "")
  {
      document.getElementById('inputDueDate').classList.add('wrong');
  }
  else {
      document.getElementById('inputDueDate').classList.remove('wrong');
  }
}

// The Task List element
var taskListElement = document.getElementById("taskList");

// Adds Task to taskList based on given paramaters
function addTask(id, title, description, subtasksString, dueDateString, importance, duration, completion, done)
{
  // Return if errors
  if (dueDateString == "")
  {
    console.log("Wrong date format.")
    return;
  }

  // Split subtasks into trimmed array
  let subtasksSplit = new Array(0);
  let subtasks = new Array(0);
  if (subtasksString != "")
  {
    subtasksSplit = subtasksString.split(",");
    for (let i = 0; i < subtasksSplit.length; i++)
    {
      subtasks[i] = new Array (subtasksSplit[i].trim(), false);
    }
  }

  // Ensure proper Date format
  let dueDate = new Date();
  let offset = new Date().getTimezoneOffset() / 60;

  dueDate.setFullYear(parseInt(dueDateString.substr(0, 4)));
  dueDate.setMonth(parseInt(dueDateString.substr(5, 2))-1);
  dueDate.setDate(parseInt(dueDateString.substr(8, 2)));
  dueDate.setHours(parseInt(dueDateString.substr(11, 2)), parseInt(dueDateString.substr(14, 2)), 0);
  dueDate.setMilliseconds(0);

  // Clamp Importance between 0 and 100, and round to nearest integer
  importance = Math.round(Math.max(0,Math.min(100, importance)));

  // Ensure duration is positive
  duration = Math.max(0, duration);

  // Clamp Completion between 0 and 100, and round to nearest integer
  Math.round(Math.max(0,Math.min(100, completion)));

  let newTask = true;

  for (let i = 0; i < taskList.length; i++)
  {
    if (taskList[i].id == id)
    {
      newTask = false;
    }
  }
  if (newTask)
  {
    // Create new Task object, and set the paramaters
    let task = new Task(
      id, // ID
      title.toString(),
      description.toString(),
      subtasks,
      dueDate,
      importance,
      duration,
      completion,
      done);

    // Pushes new Task to Task List
    taskList.push(task);
  }
  else {
    let index = indexOf(id);

    taskList[index].title = title.toString();
    taskList[index].description = description.toString();
    taskList[index].subtasks = subtasks;
    taskList[index].dueDate = dueDate;
    taskList[index].importance = importance;
    taskList[index].duration = duration;
    taskList[index].completion = completion;
    taskList[index].done = done;
  }
  hideAsideOnNarrow();
}

// Delete a Task from Task List at a given index
function deleteTask(id)
{
  let index = indexOf(id);

  if (index < taskList.length)
    taskList.splice(index, 1);
  saveTasks();
  updateTaskList();
  if (taskList.length > 0)
    highlightTask(taskList[Math.min(index, taskList.length - 1)].id);
  else
    highlightTask();
  hideAsideOnNarrow();
}

function indexOf(id)
{
  for (let i = 0; i < taskList.length; i++)
  {
    if (taskList[i].id == id)
    {
      return i;
    }
  }
}

// Clear entore task list
function clearTasks()
{
  console.log("Cleared task list completely.");
  taskList = new Array();
  saveTasks();
  updateTaskList();
  highlightTask();
}

// Save task to localStorage
function saveTasks()
{
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Update Tasklist from localStorage
function loadTasks()
{
  return JSON.parse(localStorage.getItem('tasks'));
}

// Currently highlightedTask
var highlighted = 0;

// Show highlighted task details on the aside
function highlightTask(id)
{
  highlighted = 0;

  // Reset empty message
  let found = false;
  document.getElementById('taskListAside').children[0].style.display = "block";
  document.getElementById('taskBlockAside').children[0].style.display = "block";
  document.getElementById('taskListAside').children[1].style.display = "none";
  document.getElementById('taskBlockAside').children[1].style.display = "none";

  for (let i = 0 ; i < taskList.length; i++)
  {
    if (taskList[i].id == id)
    {
      found = true;
      highlighted = id;

      document.getElementById('highlightListTitle').textContent = taskList[i].title;
      document.getElementById('highlightBlockTitle').textContent = taskList[i].title;

      document.getElementById('highlightListCheckmark').setAttribute("data-id", taskList[i].id);
      document.getElementById('highlightBlockCheckmark').setAttribute("data-id", taskList[i].id);

      if (taskList[i].done)
      {
        document.getElementById('highlightListCheckmark').classList.add('done');
        document.getElementById('highlightBlockCheckmark').classList.add('done');
      } else {
        document.getElementById('highlightListCheckmark').classList.remove('done');
        document.getElementById('highlightBlockCheckmark').classList.remove('done');
      }
      document.getElementById('highlightListDescription').textContent = taskList[i].description;
      document.getElementById('highlightBlockDescription').textContent = taskList[i].description;
      if (taskList[i].description.length > 0 && taskList[i].description != " ")
      {
        document.getElementById('highlightListDescription').parentElement.style.display = "block";
        document.getElementById('highlightBlockDescription').parentElement.style.display = "block";
      } else {
        document.getElementById('highlightListDescription').parentElement.style.display = "none";
        document.getElementById('highlightBlockDescription').parentElement.style.display = "none";
      }
      if (taskList[i].subtasks.length > 0)
      {
        document.getElementById('highlightListSubtasks').parentElement.style.display = "block";
        document.getElementById('highlightBlockSubtasks').parentElement.style.display = "block";
      } else {
        document.getElementById('highlightListSubtasks').parentElement.style.display = "none";
        document.getElementById('highlightBlockSubtasks').parentElement.style.display = "none";
      }
      document.getElementById('highlightListSubtasks').innerHTML = "";
      document.getElementById('highlightBlockSubtasks').innerHTML = "";
      for (let j = 0; j < taskList[i].subtasks.length; j++)
      {
        let append = "<li onclick='markSubtask(" + j + ")'" + (taskList[i].subtasks[j][1] ? "" : " class='uncomplete'") + "><div class='dot'></div><div class='line'></div><span class='sub'>" + taskList[i].subtasks[j][0] + "</span><span class='tick'>✔</span>" + "</li>";
        document.getElementById('highlightListSubtasks').innerHTML += append;
        document.getElementById('highlightBlockSubtasks').innerHTML += append;
      }

      let ddString = dateString(new Date(taskList[i].dueDate), true);
      document.getElementById('highlightListDueDate').innerHTML = ddString;
      document.getElementById('highlightBlockDueDate').innerHTML = ddString;

      updateTimeRemaining(i);

      asideImportance(taskList[i].importance);
      inputImportanceValueAsideList.value = taskList[i].importance;
      inputImportanceValueAsideBlock.value = taskList[i].importance;
      asideCompletion(taskList[i].completion);
      inputCompletionValueAsideList.value = taskList[i].completion;
      inputCompletionValueAsideBlock.value = taskList[i].completion;

      document.getElementById('highLightListDelete').setAttribute("data-id", taskList[i].id);
      document.getElementById('highLightBlockDelete').setAttribute("data-id", taskList[i].id);
    }
  }

  partialCrossOff();

  // Show empty message
  if ((taskList.length == 0 || id == null) || !found)
  {
    highlighted = 0;

    document.getElementById('taskListAside').children[0].style.display = "none";
    document.getElementById('taskBlockAside').children[0].style.display = "none";
    document.getElementById('taskListAside').children[1].style.display = "flex";
    document.getElementById('taskBlockAside').children[1].style.display = "flex";

    return;
  }

  let elements = document.getElementById('taskList').children;

  for (let i = 0 ; i < elements.length; i++)
  {
    if (elements[i].dataset.id == id)
    {
      elements[i].classList.add('highlighted');
    }
    else
    {
      elements[i].classList.remove('highlighted');
    }
  }
}

function markSubtask (subtask)
{
  let elements = document.getElementById('taskList').children;
  for (let i = 0; i < taskList.length; i++)
  {
    if (highlighted == taskList[i].id)
    {
      taskList[i].subtasks[subtask][1] = !taskList[i].subtasks[subtask][1];
    }
  }




  saveTasks();
  updateTaskList();
  highlightTask(highlighted);
  partialCrossOff();

}



// Update the Task List element on the page
function updateTaskList()
{
  taskList = loadTasks();
  justUpdatedTaskList = true;

  // Clear existing Task List
  taskListElement.innerHTML = "";

  // Hide or display Empty Task List messages
  let displays = document.getElementsByClassName("emptyTasks");
  for (let i = 0; i < displays.length; i++)
  {
    if (taskList.length > 0)
    {
      displays[i].style.display = "none";
      document.getElementById("taskBlockContainer").style.display = "flex";
    } else {
      displays[i].style.display = "block";
      document.getElementById("taskBlockContainer").style.display = "none";
    }
  }

  // Sort via importance/urgency

  // Sort via date of creation
  function byDate( a, b ) {
    if ( a.id < b.id ){
      return 1;
    }
    if ( a.id > b.id ){
      return -1;
    }
    return 0;
  }
  taskList.sort(byDate);

  // Sort Completed Tasks to bottom
  let completed = new Array();
  for (let i = taskList.length - 1; i >= 0; i--)
  {
    if (taskList[i].done)
    {
      completed.unshift(taskList[i]);
      taskList.splice(i, 1);
    }
  }
  for (let i = 0; i < completed.length; i++)
  {
    taskList.push(completed[i]);
  }

  // For each Task in Task List, add a new unordered list to the element
  for (let i = 0; i < taskList.length; i++)
  {
    // Subtask HTML string
    let subtaskString = "";
    for(let j = 0; j < taskList[i].subtasks.length; j++)
    {
      subtaskString += "<li>" + taskList[i].subtasks[j] + "</li>";
    }

    let rating = "";

    switch(Math.floor(taskList[i].importance / 100 * 4))
    {
      case 0:
        rating = "'>";
        break;
      case 1:
        rating = " low'>!";
        break;
      case 2:
        rating = " medium'>!!";
        break;
      case 3:
        rating = " high'>!!!";
        break;
      case 4:
        rating = " high'>!!!";
        break;
    }

    let remainingHours = Math.floor(taskList[i].duration / 100 * (100 - taskList[i].completion) / 60);
    let remainingMinutes = Math.round(taskList[i].duration / 100 * (100 - taskList[i].completion) % 60);

    taskListElement.innerHTML += "\
    <li class='" + (taskList[i].done ? "done" : "") + (taskList[i].id == highlighted ? " highlighted" : "") + "' data-id=" + taskList[i].id + " onclick='clickedHighlight(" + taskList[i].id + ")'>\
    <div class='title'><h2>" + taskList[i].title + "</h2></div>\
    <div class='rating" + rating + "</div>\
    <div class='span description" + (taskList[i].description.length == 0 ? " hidden" : "") + "'>" + taskList[i].description + "</div>\
    <div class='split remaining'>" + (remainingHours > 0 ? remainingHours + "h " : "") + (remainingHours > 0 && remainingMinutes == 0 ? "" : remainingMinutes + "min") + " remaining</div>\
    <div class='split date'>" + dateString(taskList[i].dueDate, false) + "</div>\
    </li>";
  }
}

// Converts date to readable string when adding to element
function dateString(date, inAside)
{
  date = new Date(date);

  let str = "";

  let day = "";
  switch(date.getDay())
  {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  let month = "";
  switch(date.getMonth())
  {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }

  if (inAside)
  {
    // str += day.substr(0, 3); // Day
    // str += " ";
    let pm = date.getHours() > 12;
    let today = false;
    let late = false;
    let d = new Date(date);
    let now = new Date();

    if (d < now) late = true;
    if (d.setHours(0, 0, 0, 0) == now.setHours(0, 0, 0, 0)) today = true;

    str += "<span style='";
    if (late)
    {
      str += "color:#FF0000;font-weight:bold;font-style:italic;";
    } else {
      if (!today)
      {
        str += "color:#0000007D;font-weight:normal;font-style:italic;";
      }
      else {
        str += "font-weight:bold;font-style:normal;";
      }
    }

    str +="'>";
    str += (pm ? date.getHours() - 12 : date.getHours());
    str += ":";
    if (date.getMinutes() < 10) str += "0";
    str += date.getMinutes();
    str += (pm ? "pm" : "am");
    str += "</span>"
    str += "<span style='";
    if (late)
    {
      str += "color:#FF0000;font-weight:bold;font-style:italic;";
    } else {
      if (today)
      {
        str += "color:#0000007D;font-weight:normal;font-style:italic;";
      }
      else {
        str += "font-weight:bold;font-style:normal;";
      }
    }
    str +="'>";
    str += date.getDate(); // Date
    str += " ";
    // str += month; // Month
    if(date.getFullYear() !=  new Date().getFullYear()) // If not this year
    {
      str += month.substr(0, 3); // Month
      str += " ";
      str += date.getFullYear().toString().slice(-2); // Year
    }
    else {
      str += month; // Month
    }
    str += "</span>"
    // str += ", ";
    // str += date.getHours() + ":" + (parseInt(date.getMinutes()) >= 10 ? date.getMinutes() : "0" + date.getMinutes());
  }
  else {
    // str += day.substr(0, 3); // Day
    // str += " ";
    str += date.getDate(); // Date
    str += " ";
    // str += month; // Month
    if(date.getFullYear() !=  new Date().getFullYear()) // If not this year
    {
      str += month.substr(0, 3); // Month
      str += " ";
      str += date.getFullYear().toString();//.slice(-2); // Year
    }
    else {
      str += month; // Month
    }
    // str += ", ";
    // str += date.getHours() + ":" + (parseInt(date.getMinutes()) >= 10 ? date.getMinutes() : "0" + date.getMinutes());
  }

  return str;
}

updateTaskList();

highlightTask(taskList.length > 0 ? taskList[0].id : "");

// Click Checkmark to cross off highlighted
document.getElementById('highlightListCheckmark').addEventListener('click', e => {
  if (e.target !== e.currentTarget)
    return;
  crossOff(document.getElementById('highlightListCheckmark').dataset.id);
});
document.getElementById('highlightBlockCheckmark').addEventListener('click', e => {
  if (e.target !== e.currentTarget)
    return;
    crossOff(document.getElementById('highlightBlockCheckmark').dataset.id);
});

// Set delete button
document.getElementById('highLightListDelete').addEventListener('click', e => {
  if (e.target !== e.currentTarget)
    return;
  deleteTask(document.getElementById('highLightListDelete').dataset.id);
});
// Set delete button
document.getElementById('highLightBlockDelete').addEventListener('click', e => {
  if (e.target !== e.currentTarget)
    return;
  deleteTask(document.getElementById('highLightBlockDelete').dataset.id);
});

function titleOf(id)
{
  for (let i = 0; i < taskList.length; i++)
  {
    if (taskList[i].id == id)
    {
      return taskList[i].title;
    }
  }
}

// Cross the task off the list
function crossOff(id)
{
  for (let i = 0 ; i < taskList.length; i++)
  {
    if (taskList[i].id == id)
    {
      taskList[i].done = !taskList[i].done;

      let elements = document.getElementById('taskList').children;
      for (let j = 0 ; j < elements.length; j++)
      {
        if (elements[j].dataset.id == id)
        {
          elements[j].classList.toggle('done');
        }
      }
    }
  }
  saveTasks();
  updateTaskList();

  if (highlighted = id)
    highlightTask(highlighted);
}

// Indicate if partially complete (ie not crossed off, but all subtasks or 100%)
function partialCrossOff()
{
  let elements = document.getElementById('taskList').children;
  for (let i = 0 ; i < elements.length; i++)
  {
    let id = elements[i].dataset.id;
    let subtasksDone = true;
    if (taskList[indexOf(id)].subtasks.length == 0) subtasksDone = false;

    for (let j = 0; j < taskList[indexOf(id)].subtasks.length; j++)
    {
      if (!taskList[indexOf(id)].subtasks[j][1])
        subtasksDone = false;
    }
    let comp = taskList[indexOf(id)].completion;

    if (subtasksDone || comp >= 100)
    {
      elements[i].classList.add('partialDone');
      if (id == highlighted)
      {
        document.getElementById('highlightListCheckmark').classList.add('partialDone');
        document.getElementById('highlightBlockCheckmark').classList.add('partialDone');
      }
    } else {
      elements[i].classList.remove('partialDone');
      if (id == highlighted)
      {
        document.getElementById('highlightListCheckmark').classList.remove('partialDone');
        document.getElementById('highlightBlockCheckmark').classList.remove('partialDone');
      }
    }
  }
}

function clickedHighlight(id)
{
  highlightTask(id);
  showAsideOnNarrow();
}

function showAsideOnNarrow()
{
  if (window.innerWidth < 760)
  {
  /// Show Floating aside if small screen
  let asides = document.getElementsByClassName('aside');
  for (let i = 0; i < asides.length; i++) asides[i].classList.add('floatingVisible');
  document.getElementById('floating').classList.remove('hidden');
  document.getElementById('newTaskForm').style.display = "none";
}
}

function windowChange() {
  if (window.innerWidth >= 760)
    hideAsideOnNarrow();
}

window.onresize = windowChange;

function hideAsideOnNarrow()
{
  let asides = document.getElementsByClassName('aside');
  for (let i = 0; i < asides.length; i++) asides[i].classList.remove('floatingVisible');
  document.getElementById('floating').classList.add('hidden');
  document.getElementById('newTaskForm').style.display = "flex";
}

let asides = document.getElementsByClassName('aside');
for (let i = 0; i < asides.length; i++) asides[i].classList.remove('floatingVisible');
