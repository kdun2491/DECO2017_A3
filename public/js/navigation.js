

// Hide and Show DOM elements based on what 'page' click in sidebar
function show(show) {

  // Focus Sidebar Icon
  let sidebarList = document.getElementById("sidebarList").children;
  for (let i = 1; i < sidebarList.length; i++)
  {
    sidebarList[i].classList.remove("focused");
    if (sidebarList[i].classList.contains(show))
      sidebarList[i].classList.add("focused");
  }

  // Grab all page elements that can be shown or hidden, and hide them
  var toHide = document.getElementsByClassName("hideable");
  for (let i = 0; i < toHide.length; i++)
  {
    toHide[i].style.display='none';
  }

  // Grab the page elements meant to be currently visible, and show only those
  var toShow = document.getElementsByClassName(show + 'Show');
  for (let i = 0; i < toShow.length; i++)
  {
    toShow[i].style.display='block';
  }
  /*if (show == "taskBlock")
  {
    var alsoShow = document.getElementsByClassName('aside taskListShow');
    for (let i = 0; i < alsoShow.length; i++)
    {
      alsoShow[i].style.display='block';
    }
  }*/
}

// Toggle the Aside in and out when at medium view, by adding and removing .activeAside to .container by clicking #toggle
document.getElementById('toggle').children[1].addEventListener('click', e => {
  if (e.target !== e.currentTarget)
    return;
  document.getElementById('container').classList.toggle('activeAside');
  if (document.getElementById('container').classList.contains('activeAside')) {
    document.getElementById('toggle').children[1].textContent = "▶";
  } else {
    document.getElementById('toggle').children[1].textContent = "◀";
  }
});


// Toggle floating window off by clicking outside
document.getElementById('floating').addEventListener('click', e => {
  if (e.target !== e.currentTarget)
    return;

  let floating = document.getElementById('floating');

  floating.classList.add('hidden');

  let asides = document.getElementsByClassName('aside');
  for (let i = 0; i < asides.length; i++) asides[i].classList.remove('floatingVisible');

  //hide children
  for (let j = 0; j < floating.children.length; j++)
  {
    floating.children[j].style.display = "none";
  }
});

// Show add task form
let addTasks = document.getElementsByClassName('addTasks');
for (let i = 0; i < addTasks.length; i++)
{
  addTasks[i].addEventListener('click', e => {
    document.getElementById('floating').classList.remove('hidden');

    let floating = document.getElementById('floating');
    for (let j = 0; j < floating.children.length; j++)
    {
      floating.children[j].style.display = "none";
    }

    document.getElementById('newTaskForm').style.display = "flex";

    document.getElementById('addTaskButton').style.display = "block";
    document.getElementById('modifyTaskButton').style.display = "none";

    document.getElementById('newTaskForm').reset();

    // adjust form to local time when opening window
    document.getElementById('inputTitleValue').setAttribute("value", "");
    document.getElementById('inputDescriptionValue').setAttribute("value", "");
    document.getElementById('inputSubtasksValue').setAttribute("value", "");
    document.getElementById('inputDueDateValue').setAttribute("value", new Date(new Date() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, -8));
    document.getElementById('inputDurationValue').setAttribute("value", 15);
    document.getElementById('inputImportanceValue').setAttribute("value", 50);
    document.getElementById('inputCompletionValue').setAttribute("value", 0);

    // Reset indicators
    updateSuffix();
    formImportance(document.getElementById('inputImportanceValue').value);
    formCompletion(document.getElementById('inputCompletionValue').value);

  });
}



// Show edit task form
document.getElementById('highLightListEdit').addEventListener('click', e => {
  floatingEditWindow();
});
document.getElementById('highLightBlockEdit').addEventListener('click', e => {
  floatingEditWindow();
});

function floatingEditWindow ()
{
  hideAsideOnNarrow();
  document.getElementById('floating').classList.remove('hidden');

  let floating = document.getElementById('floating');
  for (let j = 0; j < floating.children.length; j++)
  {
    floating.children[j].style.display = "none";
  }

  document.getElementById('newTaskForm').style.display = "flex";

  document.getElementById('addTaskButton').style.display = "none";
  document.getElementById('modifyTaskButton').style.display = "block";

  document.getElementById('newTaskForm').reset();

  let id = document.getElementById('highlightListCheckmark').dataset.id;
  document.getElementById('modifyTaskButton').setAttribute("data-id", id);

  let subtaskString = ""
  for (let i = 0; i < taskList[indexOf(id)].subtasks.length; i++)
  {
    if (i > 0)
      subtaskString += ", ";
    subtaskString += taskList[indexOf(id)].subtasks[i][0];
  }

  document.getElementById('inputTitleValue').setAttribute("value", taskList[indexOf(id)].title);
  document.getElementById('inputDescriptionValue').setAttribute("value", taskList[indexOf(id)].description);
  document.getElementById('inputSubtasksValue').setAttribute("value", subtaskString);
  document.getElementById('inputDueDateValue').setAttribute("value", new Date(taskList[indexOf(id)].dueDate).toISOString().slice(0, -8));
  document.getElementById('inputDurationValue').setAttribute("value", taskList[indexOf(id)].duration);
  document.getElementById('inputImportanceValue').setAttribute("value", taskList[indexOf(id)].importance);
  document.getElementById('inputCompletionValue').setAttribute("value", taskList[indexOf(id)].completion);

  // Reset indicators
  updateSuffix();
  formImportance(taskList[indexOf(id)].importance);
  formCompletion(taskList[indexOf(id)].completion);
}
