// NEED TO REMOVE GLOBAL VARS
var toDoArray = [];
var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];

$(document).on('input', function() {
  enableSaveButton();
  })

$(document).ready(function() {
  retrieveLocalStorage();
  reset();
});

$('.save-btn').on('click', function() {
  var id = Date.now();
  var title = $('.title-input').val();
  var task = $('.task-input').val();
  var newToDo = new ToDo(id, title, task);
  toDoArray.unshift(newToDo);
  $('.todo-container').prepend(buildNewCard(newToDo));
  addToLocal();
  reset();
});

//Up-Vote Event
$('.todo-container').on('click', '.up-vote-btn', changeImportance);

//Down-Vote Event
$('.todo-container').on('click', '.down-vote-btn', changeImportance);

$(document).on('click', '.show-completed-btn', showAllToDos);
$(document).on('click', '.clear-filter-btn', clearFilters);

$(document).on('click', '.show-more-btn', showMoreToDos);

// Filter importanceLevel
$('.filter-btn-container').on('click', '.importance-btn', filterImportance);

$('.todo-container').on('click', '.complete-btn', toggleComplete);

//Delete idea cards from DOM and localStorage
$('.todo-container').on('click', '.delete-btn', deleteToDo);

$('.filter-input').on('input keydown', search);

$('.todo-container').on('blur input keydown', '.card-title', updateCardContent);

$('.todo-container').on('blur input keydown', '.task-content', updateCardContent);

function updateCardContent(event){
  if(event.keyCode == 13 || event.type == 'focusout')
  {
      var cardToUpdate = $(event.target).closest('.todo-card')[0];
      var propertyToUpdate = $(event.target).data("role"); //this snags the role off the data-role in html
      console.log('role:', propertyToUpdate);
      toDoArray.forEach(function(todo){
        if(cardToUpdate.id == todo.id){
          todo[propertyToUpdate] = $(event.target).text();
        }
      });
      addToLocal();
      $('.title-input').focus();
  }
}

function showToDos(status, count) {
  var displayCount = 0;
  if (!count) {
    count = toDoArray.length;
  }
  toDoArray.forEach(function(todo){
    if (todo.complete === status && displayCount < count){
      $('.todo-container').append(buildNewCard(todo));
      displayCount++;
    }
  });
}

function showAllToDos() {
  //destroy
  $('.todo-container').empty();
  showToDos(true);
  showToDos(false);
};

function clearFilters() {
  // destroy
  $('.todo-container').empty();
  showToDos(false, 10);
  reset();
}

function showMoreToDos() {
  $('.todo-container').empty();
  showToDos(false);
}

function toggleComplete() {
  var card = event.target.closest('.todo-card');
  var title = $(this).closest('.todo-card').find('.card-title');
  var task = $(this).closest('.todo-card').find('.task-content');
  toDoArray.forEach(function(todo){
    if (todo.id == card.id) {
      todo.complete = !todo.complete
    }
  });
  $(this).toggleClass('complete-active')
  title.toggleClass('completed');
  task.toggleClass('completed');
  // card.classList.toggle('todo-card-complete');
  addToLocal();
}

function deleteToDo(){
  var card = $(this).closest('.todo-card')[0];
   toDoArray.forEach(function(todo, index){
    if (todo.id == card.id) {
      toDoArray.splice(index, 1);
    }
  });
  addToLocal();
  card.remove();
}


function ToDo(id, title, task){
  this.id = id;
  this.title = title;
  this.task = task;
  this.importance = "normal";
  this.complete = false;
}

//build a Card
function buildNewCard(newToDo){

  var completeClass = (newToDo.complete)? "todo-card-complete" : "";

  var todo = `<article class="todo-card ${completeClass}" id="${newToDo.id}">
        <div class="card-top">
          <h2 class="card-title" data-role="title" contenteditable="true">${newToDo.title}</h2>
          <div class="top-btn-container">
            <button class="complete-btn"></button>
            <button class="delete-btn"></button>
          </div>
        </div>
        <p class="task-content" data-role="task" contenteditable="true">${newToDo.task}</p>
        <div class="card-bottom">
          <button class="up-vote-btn" data-changer="1"></button>
          <button class="down-vote-btn" data-changer="-1"></button>
          <p id="importance">importance: <span class="importance-level">${newToDo.importance}</span></p>
        </div>
      </article>`;
  return todo;
}

//add object to localStorage function
function addToLocal(){
  var stringifiedToDo = JSON.stringify(toDoArray);
  localStorage.setItem('toDoArray', stringifiedToDo);
}

// get object back from JSON function
  function retrieveLocalStorage() {
    toDoArray = JSON.parse(localStorage.getItem('toDoArray')) || [];
    showToDos(false, 10);
}

//upvote button function
function changeImportance(){

  var card = $(event.target).closest('.todo-card')[0];
  var changer = $(event.target).data("changer");
  console.log('changer', changer);


   toDoArray.forEach(function(todo, index){
    if (todo.id == card.id) {
      var currIndex = importanceArray.indexOf(todo.importance);

      if(currIndex == 0 && changer == -1){
        currIndex++;
      }
      if(currIndex == importanceArray.length-1 && changer == 1){
        currIndex--;
      }

      todo.importance = importanceArray[currIndex + changer];
      var domLabel = $(event.target).parents('.todo-card').find('.importance-level')[0]
      domLabel.innerText = todo.importance;
      flashText(domLabel);
    }
  });


  addToLocal();
}

// this function flashes the new importance dom label
function flashText(elementToFlash){
  elementToFlash.classList.remove('flash');
  void elementToFlash.offsetWidth;
  elementToFlash.classList.add('flash');
}


function filterImportance() {
  var importance = $(this).text();
  $('.todo-container').empty();
  toDoArray.forEach(function(todo, index) {
    if (importance === todo.importance && !todo.complete) {
      $('.todo-container').append(buildNewCard(todo));
    }
  })
}

//Search Bar Function
function search() {
  var inputText = $('.filter-input').val().toUpperCase();


  var filteredArray = toDoArray.filter(function(todo){
    if ((todo.title.toUpperCase().indexOf(inputText) !== -1) || (todo.task.toUpperCase().indexOf(inputText) !== -1)) {
      return true;
    }
  });

  $('.todo-container').empty();

  if (inputText.length == 0) {
    showToDos(false, 10);
  } else {
    filteredArray.forEach(function(todo) {
      $('.todo-container').append(buildNewCard(todo));
    });
  }
}

//enable the save button function
function enableSaveButton()  {
var title = $('.title-input').val();
var task = $('.task-input').val();
  if (title === "" || task === "") {
    $('.save-btn').prop('disabled', true)
  } else {$('.save-btn').prop('disabled', false)
}
}

//reset input fields function
function reset(){
  $('.title-input').val('');
  $('.task-input').val('');
  $('.filter-input').val('');
  // $('.save-btn').prop('disabled', true);
  $('.title-input').focus();
}
