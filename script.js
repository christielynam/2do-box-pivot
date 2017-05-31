
$(document).ready(function() {
  showToDos(false, 10);
  reset();
});

$(document).on('input', enableSaveButton);
$(document).on('click', '.save-btn', saveToDo);
$(document).on('click', '.show-all-btn', showAllToDos);
$(document).on('click', '.clear-filter-btn', clearFilters);
$(document).on('click', '.show-more-btn', showMoreToDos);

$('.filter-input').on('input keydown', search);
$('.filter-btn-container').on('click', '.importance-btn', filterImportance);

$('.todo-container').on('click', '.complete-btn', toggleComplete);
$('.todo-container').on('click', '.delete-btn', deleteToDo);
$('.todo-container').on('click', '.up-vote-btn', changeImportance);
$('.todo-container').on('click', '.down-vote-btn', changeImportance);

$('.todo-container').on('blur input keydown', '.card-title', updateCardContent);
$('.todo-container').on('blur input keydown', '.task-content', updateCardContent);

//Constructor Function for ToDo
function ToDo(id, title, task) {
  this.id = id;
  this.title = title;
  this.task = task;
  this.importance = "normal";
  this.complete = false;
}

function buildNewCard(newToDo) {
  var strikethrough = (newToDo.complete)? "completed" : "";
  var activeCheckMark = (newToDo.complete)? "complete-active" : "";
  var todo = `<article class="todo-card" id="${newToDo.id}">
        <div class="card-top">
          <h2 class="card-title" data-role="title" contenteditable="true">${newToDo.title}<span class="strikeMe ${strikethrough}"></span></h2>
          <div class="top-btn-container">
            <button class="complete-btn ${activeCheckMark}"></button>
            <button class="delete-btn"></button>
          </div>
        </div>
        <p class="task-content" data-role="task" contenteditable="true">${newToDo.task}<span class="strikeMe ${strikethrough}"></span></p>
        <div class="card-bottom">
          <button class="up-vote-btn" data-changer="1"></button>
          <button class="down-vote-btn" data-changer="-1"></button>
          <p id="importance">importance: <span class="importance-level">${newToDo.importance}</span></p>
        </div>
      </article>`;
  return todo;
}

function addToLocal(arrayToSave) {
  var stringifiedToDo = JSON.stringify(arrayToSave);
  localStorage.setItem('toDoArray', stringifiedToDo);
}

function pullFromLocal() {
  var toDoArray = JSON.parse(localStorage.getItem('toDoArray')) || [];
  return toDoArray;
}

function showToDos(status, count) {
  var toDoArray = pullFromLocal();
  var displayCount = 0;
  if (!count) {
    count = toDoArray.length;
  }
  toDoArray.forEach(function(todo) {
    if (todo.complete === status && displayCount < count) {
      $('.todo-container').append(buildNewCard(todo));
      displayCount++;
    }
  });
}

function showAllToDos() {
  $('.todo-container').empty();
  showToDos(true);
  showToDos(false);
}

function showMoreToDos() {
  $('.todo-container').empty();
  showToDos(false);
}

function enableSaveButton() {
var title = $('.title-input').val();
var task = $('.task-input').val();
  if (title === "" || task === "") {
    $('.save-btn').prop('disabled', true);
  } else {
    $('.save-btn').prop('disabled', false);
  }
}

function saveToDo() {
  var toDoArray = pullFromLocal();
  var id = Date.now();
  var title = $('.title-input').val();
  var task = $('.task-input').val();
  var newToDo = new ToDo(id, title, task);
  toDoArray.unshift(newToDo);
  $('.todo-container').prepend(buildNewCard(newToDo));
  addToLocal(toDoArray);
  reset();
  enableSaveButton();
}

function search() {
  var toDoArray = pullFromLocal();
  var inputText = $('.filter-input').val().toUpperCase();
  var filteredArray = toDoArray.filter(function(todo) {
    if ((todo.title.toUpperCase().indexOf(inputText) !== -1) || (todo.task.toUpperCase().indexOf(inputText) !== -1)) {
      return true;
    }
  });
  showFilteredToDos(filteredArray, inputText);
}

function showFilteredToDos(filteredArray, filterText) {
  $('.todo-container').empty();
  $('.importance-btn').removeClass('importance-active');
  if (filterText.length == 0) {
    showToDos(false, 10);
  } else {
    filteredArray.forEach(function(todo) {
      $('.todo-container').append(buildNewCard(todo));
    });
  }
}

function filterImportance() {
  var toDoArray = pullFromLocal();
  var importance = $(this).text();
  $('.todo-container').empty();
  toDoArray.forEach(function(todo, index) {
    if (importance === todo.importance && !todo.complete) {
      $('.todo-container').append(buildNewCard(todo));
    }
  });
  reset();
  $(this).addClass('importance-active');
}

function updateCardContent(event){
  var toDoArray = pullFromLocal();
  if(event.keyCode == 13 || event.type == 'focusout') {
      var cardToUpdate = $(event.target).closest('.todo-card')[0];
      var propertyToUpdate = $(event.target).data('role');
      toDoArray.forEach(function(todo) {
        if(cardToUpdate.id == todo.id) {
          todo[propertyToUpdate] = $(event.target).text();
        }
      });
      addToLocal(toDoArray);
      $('.title-input').focus();
  }
}

function toggleComplete() {
  var toDoArray = pullFromLocal();
  var card = event.target.closest('.todo-card');
  var title = $(card).find('.card-title');
  var task = $(card).find('.task-content');
  toDoArray.forEach(function(todo) {
    if (todo.id == card.id) {
      todo.complete = !todo.complete
    }
  });
  $(this).toggleClass('complete-active')
  title.children('.strikeMe').toggleClass('completed');
  task.children('.strikeMe').toggleClass('completed');
  addToLocal(toDoArray);
}

function deleteToDo() {
  var toDoArray = pullFromLocal();
  var card = $(this).closest('.todo-card')[0];
   toDoArray.forEach(function(todo, index) {
    if (todo.id == card.id) {
      toDoArray.splice(index, 1);
    }
  });
  addToLocal(toDoArray);
  card.remove();
}

function changeImportance() {
  var toDoArray = pullFromLocal();
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  var card = $(event.target).closest('.todo-card')[0];
  var changer = $(event.target).data("changer");

   toDoArray.forEach(function(todo, index) {
    if (todo.id == card.id) {
      var currIndex = importanceArray.indexOf(todo.importance);
      if(currIndex == 0 && changer == -1) {
        currIndex++;
      }
      if(currIndex == importanceArray.length - 1 && changer == 1) {
        currIndex--;
      }
      todo.importance = importanceArray[currIndex + changer];
      updateImportanceLabel(event.target, todo.importance);
    }
  });
  addToLocal(toDoArray);
}

function updateImportanceLabel(targetControl, targetValue) {
  var domLabel = $(targetControl).parents('.todo-card').find('.importance-level')[0];
  domLabel.innerText = targetValue;
  flashText(domLabel);
}

function flashText(elementToFlash) {
  elementToFlash.classList.remove('flash');
  void elementToFlash.offsetWidth;
  elementToFlash.classList.add('flash');
}

function clearFilters() {
  $('.todo-container').empty();
  showToDos(false, 10);
  reset();
}

function reset(){
  $('.title-input').val('');
  $('.task-input').val('');
  $('.filter-input').val('');
  $('.title-input').focus();
  $('.importance-btn').removeClass('importance-active');
}
