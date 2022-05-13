// Task object
class Task {
  constructor(title, description, subtasks, dueDate, importance, duration, completion)
  {
    this.title = title; // Task Title (string)
    this.description = description; // Task Description (string)
    this.subtasks = subtasks; // Task Subtasks (array of array[string, boolean])
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

  // Updates the Task List element on the page
  updateTaskList();
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
  let subtasks = new Array(0);
  if (subtasksString != "")
  {
    subtasks = subtasksString.split(",");
    for (i = 0; i < subtasks.length; i++)
    {
      subtasks[i] = subtasks[i].trim();
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
  updateTaskList();
}

// Update the Task List element on the page
function updateTaskList()
{
  // Clear existing Task List
  taskListElement.innerHTML = "";

  // For each Task in Task List, add a new unordered list to the element
  for (let i = 0; i < taskList.length; i++)
  {
    // Subtask HTML string
    let subtaskString = "";
    for(let j = 0; j < taskList[i].subtasks.length; j++)
    {
      subtaskString += "<li>" + taskList[i].subtasks[j] + "</li>";
    }

    taskListElement.innerHTML += "\
\
    <li>\
      <ul>\
        <li>Title: " + taskList[i].title + "</li>" +
        (taskList[i].description != "" ? "<li>Description: " + taskList[i].description + "</li>" : "") +
        (taskList[i].subtasks.length > 0 ? "<li>Subtasks: <ul>" + subtaskString + "</ul></li>" : "") +
        "<li>Due Date: " + dateString(taskList[i].dueDate) + "</li>\
        <li>Importance: " + taskList[i].importance + "</li>\
        <li>Duration: " + taskList[i].duration + " minute" + (taskList[i].duration != 1 ? "s" : "") + "</li>\
        <li>Completion: " + taskList[i].completion + "%</li>\
        <li><button type=\"button\" onclick=\"deleteTask(" + i + ");\">Delete this Task</button></li>\
      </ul>\
    </li>\
\
    ";
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

  str += day.substr(0, 3); // Day
  str += " ";
  str += date.getDate(); // Date
  str += " ";
  str += month; // Month
  if(date.getFullYear() !=  new Date().getFullYear()) // If not this year
  {
    str += " ";
    str += date.getFullYear().toString().slice(-2); // Year
  }
  str += ", ";
  str += date.getHours() + ":" + (parseInt(date.getMinutes()) >= 10 ? date.getMinutes() : "0" + date.getMinutes());

  return str;
}
