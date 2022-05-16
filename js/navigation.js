function show(show) {
  var toHide = document.getElementsByClassName("hideable");

  for (let i = 0; i < toHide.length; i++)
  {
    toHide[i].style.display='none';
  }

  var toShow = document.getElementsByClassName(show);

  for (let i = 0; i < toShow.length; i++)
  {
    toShow[i].style.display='block';
  }

  return false;
}

function activeAsideToggle() {
  document.getElementById('container').classList.toggle('activeAside');
}

document.getElementById('toggle').addEventListener('click', activeAsideToggle);
