import {blendHex} from "./tasks.js";

var taskBlock = document.getElementById('taskBlock');
var taskSize = 80;

var taskAspects = new Array();
class Aspect {
  constructor(task)
  {
    this.task = task;
    this.urgency = (new Date(task.dueDate).getTime() - Date.now()) / 60000 - task.duration * (1 - task.completion / 100);
    this.importance = task.importance;

    this.globalUrgency = 1;
    this.globalImportance = 1;
  }
}






// Resize Taskblock height and adjust taskblock numbers
adjustBlockCount(false);
window.addEventListener('resize', function(event) {
    adjustBlockCount(true);
}, true);

// Rank tasks by importance and urgency (WHENEVER NEW TASK OR TASK MODIFIED)
function rankTasks()
{
  // Get details
  taskAspects = new Array();
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++)
  {
    taskAspects.push(new Aspect(tasks[i]));
  }

  // Find highest and lowest
  let mostUrgent = 0;
  let leastUrgent = 0;
  let mostImportant = 0;
  let leastImportant = 0;
  for (let i = 0; i < taskAspects.length; i++) //Math.min(mostUrgent, taskAspects[i].task)
  {
    if (i > 0)
    {
      // Check Most Urgent
      if (taskAspects[i].urgency < taskAspects[mostUrgent].urgency)
      {
        mostUrgent = i;
      } else if (taskAspects[mostUrgent].urgency == taskAspects[i].urgency) {
        if (taskAspects[i].task.dueDate < taskAspects[mostUrgent].task.dueDate) mostUrgent = i;
      }
      // Check Least Urgent
      if (taskAspects[i].urgency > taskAspects[leastUrgent].urgency)
      {
        leastUrgent = i;
      } else if (taskAspects[leastUrgent].urgency == taskAspects[i].urgency) {
        if (taskAspects[i].task.dueDate > taskAspects[leastUrgent].task.dueDate) leastUrgent = i;
      }
      // Check Most Important
      if (taskAspects[i].importance > taskAspects[mostImportant].importance)
      {
        mostImportant = i;
      } else if (taskAspects[mostImportant].importance == taskAspects[i].importance) {
        if (taskAspects[i].urgency < taskAspects[mostImportant].urgency) mostImportant = i;
      }
      // Check Least Important
      if (taskAspects[i].importance < taskAspects[leastImportant].importance)
      {
        leastImportant = i;
      } else if (taskAspects[leastImportant].importance == taskAspects[i].importance) {
        if (taskAspects[i].urgency > taskAspects[leastImportant].urgency) leastImportant = i;
      }
    }
  }

  // Get Global Rank 1 = most, 0 = least
  for (let i = 0; i < taskAspects.length; i++)
  {
    taskAspects[i].globalUrgency = (taskAspects[i].urgency - taskAspects[leastUrgent].urgency) / (taskAspects[mostUrgent].urgency - taskAspects[leastUrgent].urgency);
    taskAspects[i].globalImportance = (taskAspects[i].importance - taskAspects[leastImportant].importance) / (taskAspects[mostImportant].importance - taskAspects[leastImportant].importance);
  }
}






// Distribute tasks across blocks
function distributeTasks(x, y)
{
  let distributedArray = new Array(x);
  for (let i = 0; i < x; i++)
  {
    distributedArray[i] = new Array(y);
  }

  for (let i = 0; i < taskAspects.length; i++)
  {
    let toX = Math.floor((1 - taskAspects[i].globalUrgency) * (x - 1));
    let toY = Math.floor((1 - taskAspects[i].globalImportance) * (y - 1));
    if (distributedArray[toX][toY] == null)
      distributedArray[toX][toY] = taskAspects[i].task;

/*
    if (distributedArray[toX][toY] == null)
    {
      distributedArray[toX][toY] = taskAspects[i].task;
    } else if (distributedArray[toX + 1][toY] == null)
    {
      distributedArray[toX + 1][toY] = taskAspects[i].task;
    } else if (distributedArray[toX][toY + 1] == null)
    {
      distributedArray[toX][toY + 1] = taskAspects[i].task;
    } else if (distributedArray[toX + 1][toY + 1] == null)
    {
      distributedArray[toX + 1][toY + 1] = taskAspects[i].task;
    } else {
      Console.log("Clash");
    }
*/

  }

  return distributedArray;
}






export function adjustBlockCount(resized)
{
  if (!resized)
    rankTasks();

  let width = taskBlock.clientWidth;
  let taskCount = JSON.parse(localStorage.getItem('tasks')).length;

  // Add a "comfortable" amount of tasks onto the block
  let upperTaskCount = Math.max(Math.ceil(taskCount / Math.floor(width / taskSize)) * Math.floor(width / taskSize), Math.max(Math.floor(window.innerHeight / taskSize) - 2, 1) * Math.floor(width / taskSize));

  document.querySelector(':root').style.setProperty('--taskSize', Math.floor(width / Math.floor(width / taskSize)) + "px");

  taskBlock.innerHTML = "";

  let xSize = Math.floor(width / taskSize);
  let ySize = upperTaskCount / xSize;

  let grid = distributeTasks(xSize, ySize);

  for (let y = 0; y < ySize; y++)
  {
    for (let x = 0; x < xSize; x++)
    {
      let task = grid[x][y];

      // Task color
      let linear = ((x + y) / 2) / ((xSize + ySize - 2) / 2);
      let corner = Math.pow(1 - (Math.max(x / xSize * ySize,y) - Math.min(x / xSize * ySize,y)) / Math.max(xSize, ySize), 3);
      let half = (x / xSize * ySize >= y ? 1 : 0) / (x / xSize * ySize == y ? 2 : 1);
      let colorB = blendHex("#00C2FFFF", "#00C2FF00", x / xSize);
      let colorY = blendHex("#FFB800FF", "#FFB80000", y / ySize);
      let colorG = blendHex("#00cc00FF", "#00cc0000", linear);
      let colorBG = blendHex(colorB, colorG, corner);
      let colorYG = blendHex(colorY, colorG, corner);
      let colorBY = blendHex(colorBG, colorYG, half);
      let color = blendHex("#F6F6F600", colorBY, (task != null ? 1 : 0.5));

      taskBlock.innerHTML += "<div style='background-color:" + color + ";'>(" + x + "," + y + ")<br>" + (task != null ? task.title : "") + "</div>"
    }
  }

  // Adjust TaskBlock height
  let height = width / Math.floor(width / taskSize) * Math.ceil(upperTaskCount / Math.floor(width / taskSize));
  taskBlock.style.height = height + "px";
}
