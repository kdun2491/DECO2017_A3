// Hide and Show DOM elements based on what 'page' click in sidebar
function show(show1) {
    // Grab all page elements that can be shown or hidden, and hide them
    var toHide = document.getElementsByClassName("hideable");
    for(let i2 = 0; i2 < toHide.length; i2++)toHide[i2].style.display = "none";
    // Grab the page elements meant to be currently visible, and show only those
    var toShow = document.getElementsByClassName(show1 + "Show");
    for(let i1 = 0; i1 < toShow.length; i1++)toShow[i1].style.display = "block";
/*if (show == "taskBlock")
  {
    var alsoShow = document.getElementsByClassName('aside taskListShow');
    for (let i = 0; i < alsoShow.length; i++)
    {
      alsoShow[i].style.display='block';
    }
  }*/ }
// Toggle the Aside in and out when at medium view, by adding and removing .activeAside to .container by clicking #toggle
document.getElementById("toggle").children[1].addEventListener("click", (e)=>{
    if (e.target !== e.currentTarget) return;
    document.getElementById("container").classList.toggle("activeAside");
    if (document.getElementById("container").classList.contains("activeAside")) document.getElementById("toggle").children[1].textContent = "\u25B6";
    else document.getElementById("toggle").children[1].textContent = "\u25C0";
});
// Toggle floating window off by clicking outside
document.getElementById("floating").addEventListener("click", (e)=>{
    if (e.target !== e.currentTarget) return;
    document.getElementById("floating").classList.add("hidden");
    let asides = document.getElementsByClassName("aside");
    for(let i3 = 0; i3 < asides.length; i3++)asides[i3].classList.remove("floatingVisible");
});
// Show add task form
let addTasks = document.getElementsByClassName("addTasks");
for(let i = 0; i < addTasks.length; i++)addTasks[i].addEventListener("click", (e)=>{
    document.getElementById("floating").classList.remove("hidden");
    document.getElementById("newTaskForm").style.display = "flex";
    document.getElementById("addTaskButton").style.display = "block";
    document.getElementById("modifyTaskButton").style.display = "none";
    document.getElementById("newTaskForm").reset();
    // adjust form to local time when opening window
    document.getElementById("inputTitleValue").setAttribute("value", "");
    document.getElementById("inputDescriptionValue").setAttribute("value", "");
    document.getElementById("inputSubtasksValue").setAttribute("value", "");
    document.getElementById("inputDueDateValue").setAttribute("value", new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8));
    document.getElementById("inputDurationValue").setAttribute("value", 15);
    document.getElementById("inputImportanceValue").setAttribute("value", 50);
    document.getElementById("inputCompletionValue").setAttribute("value", 0);
    // Reset indicators
    updateSuffix();
    formImportance(document.getElementById("inputImportanceValue").value);
    formCompletion(document.getElementById("inputCompletionValue").value);
});
// Show edit task form
document.getElementById("highLightListEdit").addEventListener("click", (e)=>{
    hideAsideOnNarrow();
    document.getElementById("floating").classList.remove("hidden");
    document.getElementById("addTaskButton").style.display = "none";
    document.getElementById("modifyTaskButton").style.display = "block";
    document.getElementById("newTaskForm").reset();
    let id = document.getElementById("highlightListCheckmark").dataset.id;
    document.getElementById("modifyTaskButton").setAttribute("data-id", id);
    let subtaskString = "";
    for(let i4 = 0; i4 < taskList[indexOf(id)].subtasks.length; i4++){
        if (i4 > 0) subtaskString += ", ";
        subtaskString += taskList[indexOf(id)].subtasks[i4][0];
    }
    document.getElementById("inputTitleValue").setAttribute("value", taskList[indexOf(id)].title);
    document.getElementById("inputDescriptionValue").setAttribute("value", taskList[indexOf(id)].description);
    document.getElementById("inputSubtasksValue").setAttribute("value", subtaskString);
    document.getElementById("inputDueDateValue").setAttribute("value", new Date(taskList[indexOf(id)].dueDate).toISOString().slice(0, -8));
    document.getElementById("inputDurationValue").setAttribute("value", taskList[indexOf(id)].duration);
    document.getElementById("inputImportanceValue").setAttribute("value", taskList[indexOf(id)].importance);
    document.getElementById("inputCompletionValue").setAttribute("value", taskList[indexOf(id)].completion);
    // Reset indicators
    updateSuffix();
    formImportance(taskList[indexOf(id)].importance);
    formCompletion(taskList[indexOf(id)].completion);
});

//# sourceMappingURL=index.174bc0f7.js.map
