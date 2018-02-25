function openSection(evt, sectionName) {
  var tabContent, tabLinks;
  tabContent = document.getElementsByClassName("list__ul");
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("item");
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  document.getElementById(sectionName).style.display = "block";
  evt.currentTarget.className += " active";
}

window.onload = function () {
  document.getElementById('addTask').addEventListener('click', function() {
    var value = document.getElementById('valueTask').value;
    if (value) {
      addTask(value);
      document.getElementById('valueTask').value = '';
    }
  });
}

function addTask(text) {
  var list = document.getElementById('during');

  var task = document.createElement('li');
  task.className += 'list__elem';
  task.innerText = text;

  var buttons = document.createElement('div');
  buttons.className += 'actions';

  var complete = document.createElement('button');
  complete.className += 'action__btn';
  var completeIcon = document.createElement('i');
  completeIcon.className += 'icon check far fa-check-circle';
  complete.appendChild(completeIcon);

  complete.addEventListener('click', completeTask)

  var remove = document.createElement('button');
  remove.className += 'action__btn';
  var removeIcon = document.createElement('i');
  removeIcon.className += 'icon trash far fa-trash-alt';
  remove.appendChild(removeIcon);

  remove.addEventListener('click', removeTask);

  buttons.appendChild(complete);
  buttons.appendChild(remove);
  task.appendChild(buttons);

  list.prepend(task);
}

function removeTask() {
  var task = this.parentNode.parentNode;
  var parentElem = task.parentNode;
  parentElem.removeChild(task);
}

function completeTask() {
  var task = this.parentNode.parentNode;
  var parentElem = task.parentNode;
  var id = parentElem.id;
  if (id === 'during') {
    var list = document.getElementById('completed');
    task.className += ' completed';
    list.prepend(task);
  } else {
    var list = document.getElementById('during');
    task.className ='list__elem';
    list.prepend(task);
  }
}
