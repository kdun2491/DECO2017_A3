// Task object
class Task {
    constructor(id, title, description, subtasks, dueDate, importance, duration, completion, done){
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
var importanceIndicator = document.getElementById("importanceIndicator");
var completionIndicator = document.getElementById("completionIndicator");
function formImportance(value) {
    switch(Math.floor(value / 100 * 4)){
        case 0:
            importanceIndicator.textContent = "!";
            importanceIndicator.style.color = "#FFFFFF00";
            break;
        case 1:
            importanceIndicator.textContent = "!";
            importanceIndicator.style.color = "#75D000";
            break;
        case 2:
            importanceIndicator.textContent = "!!";
            importanceIndicator.style.color = "#FFB800";
            break;
        case 3:
            importanceIndicator.textContent = "!!!";
            importanceIndicator.style.color = "#FF0000";
            break;
        case 4:
            importanceIndicator.textContent = "!!!";
            importanceIndicator.style.color = "#FF0000";
            break;
    }
}
function formCompletion(value) {
    completionIndicator.textContent = Math.round(value) + "%";
}
formImportance(document.getElementById("inputImportanceValue").value);
formCompletion(document.getElementById("inputCompletionValue").value);
// Form event that adds a new task to the task list, upon clicking the submit button
var form = document.getElementById("newTaskForm");
var add = document.getElementById("addTaskButton");
add.addEventListener("click", function(event) {
    fillForm(0);
});
// Form event that edits a task in the task list, upon clicking the button
var modify = document.getElementById("modifyTaskButton");
modify.addEventListener("click", function() {
    fillForm(modify.dataset.id);
});
function fillForm(modifiedTaskId) {
    let title = form.elements.inputTitle.value;
    let description = form.elements.inputDescription.value;
    let subtasks = form.elements.inputSubtasks.value;
    let dueDate = form.elements.inputDueDate.value;
    let importance = form.elements.inputImportance.value;
    let duration = form.elements.inputDuration.value;
    let completion = form.elements.inputCompletion.value;
    if (title.trim().length === 0) title = "Untitled";
    else title = title.trim();
    if (description.trim().length === 0) description = "";
    else description = description.trim();
    duration = Math.max(duration, 0);
    if (dueDate == "") return;
    // Create new task or modify existing
    if (modifiedTaskId == 0) addTask(Date.now().toString(), title, description, subtasks, dueDate, importance, duration, completion, false);
    else {
        let done = taskList[indexOf(modifiedTaskId)].done;
        addTask(modifiedTaskId, title, description, subtasks, dueDate, importance, duration, completion, done);
    }
    saveTasks();
    // Updates the Task List element on the page
    updateTaskList();
    if (taskList.length > 0) highlightTask(taskList[0].id);
    else highlightTask(0);
    document.getElementById("floating").classList.toggle("hidden");
}
// highlight incorrect date
function redDate() {
    let val = document.getElementById("inputDueDateValue").value;
    console.log(val);
    if (val == "") document.getElementById("inputDueDate").classList.add("wrong");
    else document.getElementById("inputDueDate").classList.remove("wrong");
}
// The Task List element
var taskListElement = document.getElementById("taskList");
// Adds Task to taskList based on given paramaters
function addTask(id, title, description, subtasksString, dueDateString, importance, duration, completion, done) {
    // Return if errors
    if (dueDateString == "") {
        console.log("Wrong date format.");
        return;
    }
    // Split subtasks into trimmed array
    let subtasksSplit = new Array(0);
    let subtasks = new Array(0);
    if (subtasksString != "") {
        subtasksSplit = subtasksString.split(",");
        for(let i = 0; i < subtasksSplit.length; i++)subtasks[i] = new Array(subtasksSplit[i].trim(), false);
    }
    // Ensure proper Date format
    let dueDate = new Date();
    let offset = new Date().getTimezoneOffset() / 60;
    dueDate.setFullYear(parseInt(dueDateString.substr(0, 4)));
    dueDate.setMonth(parseInt(dueDateString.substr(5, 2)) - 1);
    dueDate.setDate(parseInt(dueDateString.substr(8, 2)));
    dueDate.setHours(parseInt(dueDateString.substr(11, 2)) - offset, parseInt(dueDateString.substr(14, 2)), 0);
    dueDate.setMilliseconds(0);
    // Clamp Importance between 0 and 100, and round to nearest integer
    importance = Math.round(Math.max(0, Math.min(100, importance)));
    // Ensure duration is positive
    duration = Math.max(0, duration);
    let newTask = true;
    for(let i = 0; i < taskList.length; i++)if (taskList[i].id == id) newTask = false;
    if (newTask) {
        // Create new Task object, and set the paramaters
        let task = new Task(id, title.toString(), description.toString(), subtasks, dueDate, importance, duration, completion, done);
        // Pushes new Task to Task List
        taskList.push(task);
    } else {
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
}
// Delete a Task from Task List at a given index
function deleteTask(id) {
    let index = indexOf(id);
    if (index < taskList.length) taskList.splice(index, 1);
    saveTasks();
    updateTaskList();
    if (taskList.length > 0) highlightTask(taskList[Math.min(index, taskList.length - 1)].id);
    else highlightTask();
}
function indexOf(id) {
    for(let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id) return i;
    }
}
// Clear entore task list
function clearTasks() {
    console.log("Cleared task list completely.");
    taskList = new Array();
    saveTasks();
    updateTaskList();
    highlightTask();
}
// Save task to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}
// Update Tasklist from localStorage
function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks"));
}
// Currently highlightedTask
var highlighted = 0;
// Show highlighted task details on the aside
function highlightTask(id) {
    highlighted = 0;
    // Reset empty message
    let found = false;
    document.getElementById("taskListAside").children[0].style.display = "block";
    document.getElementById("taskBlockAside").children[0].style.display = "block";
    document.getElementById("taskListAside").children[1].style.display = "none";
    document.getElementById("taskBlockAside").children[1].style.display = "none";
    for(let i = 0; i < taskList.length; i++)if (taskList[i].id == id) {
        found = true;
        highlighted = id;
        document.getElementById("highlightListTitle").textContent = taskList[i].title;
        document.getElementById("highlightBlockTitle").textContent = taskList[i].title;
        document.getElementById("highlightListCheckmark").setAttribute("data-id", taskList[i].id);
        document.getElementById("highlightBlockCheckmark").setAttribute("data-id", taskList[i].id);
        if (taskList[i].done) {
            document.getElementById("highlightListCheckmark").classList.add("done");
            document.getElementById("highlightBlockCheckmark").classList.add("done");
        } else {
            document.getElementById("highlightListCheckmark").classList.remove("done");
            document.getElementById("highlightBlockCheckmark").classList.remove("done");
        }
        document.getElementById("highlightListDescription").textContent = taskList[i].description;
        document.getElementById("highlightBlockDescription").textContent = taskList[i].description;
        if (taskList[i].description.length > 0 && taskList[i].description != " ") {
            document.getElementById("highlightListDescription").parentElement.style.display = "block";
            document.getElementById("highlightBlockDescription").parentElement.style.display = "block";
        } else {
            document.getElementById("highlightListDescription").parentElement.style.display = "none";
            document.getElementById("highlightBlockDescription").parentElement.style.display = "none";
        }
        if (taskList[i].subtasks.length > 0) {
            document.getElementById("highlightListSubtasks").parentElement.style.display = "block";
            document.getElementById("highlightBlockSubtasks").parentElement.style.display = "block";
        } else {
            document.getElementById("highlightListSubtasks").parentElement.style.display = "none";
            document.getElementById("highlightBlockSubtasks").parentElement.style.display = "none";
        }
        document.getElementById("highlightListSubtasks").innerHTML = "";
        document.getElementById("highlightBlockSubtasks").innerHTML = "";
        for(let j = 0; j < taskList[i].subtasks.length; j++){
            let append = "<li onclick='markSubtask(" + j + ")'" + (taskList[i].subtasks[j][1] ? "" : " class='uncomplete'") + "><div class='dot'></div><div class='line'></div><span class='sub'>" + taskList[i].subtasks[j][0] + "</span><span class='tick'>\u2714</span>" + "</li>";
            document.getElementById("highlightListSubtasks").innerHTML += append;
            document.getElementById("highlightBlockSubtasks").innerHTML += append;
        }
        document.getElementById("highLightListDelete").setAttribute("data-id", taskList[i].id);
        document.getElementById("highLightBlockDelete").setAttribute("data-id", taskList[i].id);
    }
    // Show empty message
    if (taskList.length == 0 || id == null || !found) {
        highlighted = 0;
        document.getElementById("taskListAside").children[0].style.display = "none";
        document.getElementById("taskBlockAside").children[0].style.display = "none";
        document.getElementById("taskListAside").children[1].style.display = "flex";
        document.getElementById("taskBlockAside").children[1].style.display = "flex";
        return;
    }
    let elements = document.getElementById("taskList").children;
    for(let i1 = 0; i1 < elements.length; i1++)if (elements[i1].dataset.id == id) elements[i1].classList.add("highlighted");
    else elements[i1].classList.remove("highlighted");
}
function markSubtask(subtask) {
    let elements = document.getElementById("taskList").children;
    let id = 0;
    for(let i = 0; i < elements.length; i++)if (elements[i].classList.contains("highlighted")) {
        for(let j = 0; j < taskList.length; j++)if (elements[i].dataset.id == taskList[j].id) {
            id = taskList[j].id;
            taskList[j].subtasks[subtask][1] = !taskList[j].subtasks[subtask][1];
        }
    }
    saveTasks();
    updateTaskList();
    highlightTask(id);
}
// Update the Task List element on the page
function updateTaskList() {
    taskList = loadTasks();
    // Clear existing Task List
    taskListElement.innerHTML = "";
    // Hide or display Empty Task List messages
    let displays = document.getElementsByClassName("emptyTasks");
    for(let i = 0; i < displays.length; i++)if (taskList.length > 0) displays[i].style.display = "none";
    else displays[i].style.display = "block";
    // Sort via importance/urgency
    // Sort via date of creation
    function byDate(a, b) {
        if (a.id < b.id) return 1;
        if (a.id > b.id) return -1;
        return 0;
    }
    taskList.sort(byDate);
    // Sort Completed Tasks to bottom
    let completed = new Array();
    for(let i2 = taskList.length - 1; i2 >= 0; i2--)if (taskList[i2].done) {
        completed.unshift(taskList[i2]);
        taskList.splice(i2, 1);
    }
    for(let i3 = 0; i3 < completed.length; i3++)taskList.push(completed[i3]);
    // For each Task in Task List, add a new unordered list to the element
    for(let i4 = 0; i4 < taskList.length; i4++){
        // Subtask HTML string
        let subtaskString = "";
        for(let j = 0; j < taskList[i4].subtasks.length; j++)subtaskString += "<li>" + taskList[i4].subtasks[j] + "</li>";
        let rating = "";
        switch(Math.floor(taskList[i4].importance / 100 * 4)){
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
        let remainingHours = Math.floor(taskList[i4].duration / 100 * (100 - taskList[i4].completion) / 60);
        let remainingMinutes = Math.round(taskList[i4].duration / 100 * (100 - taskList[i4].completion) % 60);
        taskListElement.innerHTML += "    <li class='" + (taskList[i4].done ? "done" : "") + "' data-id=" + taskList[i4].id + " onclick='highlightTask(" + taskList[i4].id + ")'>    <div class='title'><h2>" + taskList[i4].title + "</h2></div>    <div class='rating" + rating + "</div>    <div class='span description" + (taskList[i4].description.length == 0 ? " hidden" : "") + "'>" + taskList[i4].description + "</div>    <div class='split remaining'>" + (remainingHours > 0 ? remainingHours + "h " : "") + (remainingHours > 0 && remainingMinutes == 0 ? "" : remainingMinutes + "min") + " remaining</div>    <div class='split date'>" + dateString(taskList[i4].dueDate) + "</div>    </li>";
    }
}
// Converts date to readable string when adding to element
function dateString(date) {
    date = new Date(date);
    let str = "";
    let day = "";
    switch(date.getDay()){
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
    switch(date.getMonth()){
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
    if (date.getFullYear() != new Date().getFullYear()) {
        str += month.substr(0, 3); // Month
        str += " ";
        str += date.getFullYear().toString(); //.slice(-2); // Year
    } else str += month; // Month
    // str += ", ";
    // str += date.getHours() + ":" + (parseInt(date.getMinutes()) >= 10 ? date.getMinutes() : "0" + date.getMinutes());
    return str;
}
updateTaskList();
highlightTask(taskList.length > 0 ? taskList[0].id : "");
// Click Checkmark to cross off highlighted
document.getElementById("highlightListCheckmark").addEventListener("click", (e)=>{
    if (e.target !== e.currentTarget) return;
    crossOff(document.getElementById("highlightListCheckmark").dataset.id);
});
document.getElementById("highlightBlockCheckmark").addEventListener("click", (e)=>{
    if (e.target !== e.currentTarget) return;
    crossOff(document.getElementById("highlightBlockCheckmark").dataset.id);
});
// Set delete button
document.getElementById("highLightListDelete").addEventListener("click", (e)=>{
    if (e.target !== e.currentTarget) return;
    deleteTask(document.getElementById("highLightListDelete").dataset.id);
});
// Set delete button
document.getElementById("highLightBlockDelete").addEventListener("click", (e)=>{
    if (e.target !== e.currentTarget) return;
    deleteTask(document.getElementById("highLightBlockDelete").dataset.id);
});
function titleOf(id) {
    for(let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id) return taskList[i].title;
    }
}
// Cross the task off the list
function crossOff(id) {
    for(let i = 0; i < taskList.length; i++)if (taskList[i].id == id) {
        taskList[i].done = !taskList[i].done;
        let elements = document.getElementById("taskList").children;
        for(let j = 0; j < elements.length; j++)if (elements[j].dataset.id == id) elements[j].classList.toggle("done");
        saveTasks();
        //      updateTaskList();
        if (highlighted = id) highlightTask(highlighted);
    }
}

//# sourceMappingURL=index.dbb0b877.js.map
