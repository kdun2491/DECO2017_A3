// Task object
class Task {
  constructor(id, title, description, subtasks, dueDate, importance, duration, completion)
  {
    this.id = id; // Task ID;
    this.title = title; // Task Title (string)
    this.description = description; // Task Description (string)
    this.subtasks = subtasks; // Task Subtasks
    this.dueDate = dueDate; // Task Due Date (date)
    this.importance = importance; // Task Importance (number percentage of 100)
    this.duration = duration; // Task Duration (number of minutes to fully complete task)
    this.completion = completion; // Task Completion (number percentage of full task completion)
  }
}

// Empty array to add new tasks to
var taskList = new Array();

// Form event that adds a new task to the task list, upon clicking the submit button
var form = document.getElementById("newTaskForm");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  let title = form.elements.inputTitle.value;
  let description = form.elements.inputDescription.value;
  let subtasks = form.elements.inputSubtasks.value;
  let dueDate = form.elements.inputDueDate.value;
  let importance = form.elements.inputImportance.value;
  let duration = form.elements.inputDuration.value;
  let completion = form.elements.inputCompletion.value;

  addTask(title, description, subtasks, dueDate, importance, duration, completion);
  saveTasks();
  // Updates the Task List element on the page
  updateTaskList();
  document.getElementById('floating').classList.toggle('hidden');
});

form.addEventListener("reset", function(event) {
  clearTasks();
  document.getElementById('floating').classList.toggle('hidden');
});

// The Task List element
var taskListElement = document.getElementById("taskList");

// Adds Task to taskList based on given paramaters
function addTask(title, description, subtasksString, dueDateString, importance, duration, completion)
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
  let dueDate = new Date;
  dueDate.setFullYear(dueDateString.substr(0, 4));
  dueDate.setMonth(dueDateString.substr(5, 2));
  dueDate.setDate(dueDateString.substr(8, 2));
  dueDate.setHours(dueDateString.substr(11, 2), dueDateString.substr(14, 2), 00);

  // Clamp Importance between 0 and 100, and round to nearest integer
  importance = Math.round(Math.max(0,Math.min(100, importance)));

  // Ensure duration is positive
  duration = Math.max(0, duration);

  // Clamp Completion between 0 and 100, and round to nearest integer
  Math.round(Math.max(0,Math.min(100, completion)));

  // Create new Task object, and set the paramaters
  let task = new Task(
    Date.now().toString(), // ID
    title.toString(),
    description.toString(),
    subtasks,
    dueDate,
    importance,
    duration,
    completion);

  // Pushes new Task to Task List
  taskList.push(task);
}

// Delete a Task from Task List at a given index
function deleteTask(index)
{
  if (index < taskList.length)
    taskList.splice(index, 1);
  saveTasks();
  updateTaskList();
}

// Clear entore task list
function clearTasks()
{
  console.log("Cleared task list.");
  taskList = new Array();
  saveTasks();
  updateTaskList();
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

function highlightTask(id)
{
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

  for (let i = 0 ; i < taskList.length; i++)
  {
    if (taskList[i].id == id)
    {
      console.log("Highlighted: " + id);
      document.getElementById('highlightTitle').textContent = taskList[i].title;
      document.getElementById('highlightDescription').textContent = taskList[i].description;
      document.getElementById('highlightSubtasks').innerHTML = "";
      for (let j = 0; j < taskList[i].subtasks.length; j++)
      {
        document.getElementById('highlightSubtasks').innerHTML += "<li onclick='markSubtask(" + j + ")'><div class='dot'></div><div class='line'></div>" + taskList[i].subtasks[j][0] + "<span" + (taskList[i].subtasks[j][1] ? "" : " class='uncomplete'") + ">✔</span>" + "</li>";
      }
    }
  }
}

function markSubtask (subtask)
{
  let elements = document.getElementById('taskList').children;
  let id = 0;
  for (let i = 0 ; i < elements.length; i++)
  {
    if (elements[i].classList.contains('highlighted'))
    {
      for (let j = 0; j < taskList.length; j++)
      {
        if (elements[i].dataset.id == taskList[j].id)
        {
          id = taskList[j].id;
          taskList[j].subtasks[subtask][1] = !taskList[j].subtasks[subtask][1];
        }
      }
    }
  }

  saveTasks();
  updateTaskList();
  highlightTask(id);
}

// Update the Task List element on the page
function updateTaskList()
{
  taskList = loadTasks();

  // Clear existing Task List
  taskListElement.innerHTML = "";

  // Hide or display Empty Task List messages
  let displays = document.getElementsByClassName("emptyTasks");
  for (let i = 0; i < displays.length; i++)
  {
    if (taskList.length > 0)
    {
      displays[i].style.display = "none";
    } else {
      displays[i].style.display = "block";
    }
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
    <li data-id=" + taskList[i].id + " onclick='highlightTask(" + taskList[i].id + ")'>\
    <div class='title'><h2>" + taskList[i].title + "</h2></div>\
    <div class='rating" + rating + "</div>\
    <div class='span description" + (taskList[i].description.length == 0 ? " hidden" : "") + "'>" + taskList[i].description + "</div>\
    <div class='split remaining'>" + (remainingHours > 0 ? remainingHours + "h " : "") + (remainingHours > 0 && remainingMinutes == 0 ? "" : remainingMinutes + "min") + " remaining</div>\
    <div class='split date'>" + dateString(taskList[i].dueDate) + "</div>\
    </li>";
  }
}

// Log each Task in taskList to console
function printTasks()
{
  for (let i = 0; i < taskList.length; i++)
  {
   console.log(taskList[i]);
  }
}

// Converts date to readable string when adding to element
function dateString(date)
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

  return str;
}

updateTaskList();
highlightTask(taskList[0].id);
