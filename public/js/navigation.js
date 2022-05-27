
// Hide and Show DOM elements based on what 'page' click in sidebar
function show(show) {

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
  document.getElementById('floating').classList.toggle('hidden');
});

// Show add task form
document.getElementById('addTask').addEventListener('click', e => {
  document.getElementById('floating').classList.toggle('hidden');
});
