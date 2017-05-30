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
  toDoArray.push(newToDo);
  buildNewCard(newToDo);
  addToLocal();
  reset();
});

//Up-Vote Event
$('.todo-container').on('click', '.up-vote-btn', changeImportance);

//Down-Vote Event
$('.todo-container').on('click', '.down-vote-btn', changeImportance);

$(document).on('click', '.show-completed-btn', showCompletedToDos);
$(document).on('click', '.hide-completed-btn', hideCompletedToDos)

$('.todo-container').on('click', '.complete-btn', toggleComplete);

//Delete idea cards from DOM and localStorage
$('.todo-container').on('click', '.delete-btn', deleteToDo);

$('.filter-input').on('input keydown', search);

$('.todo-container').on('blur input keydown', '.card-title', updateCardContent);

$('.todo-container').on('blur input keydown', '.task-content', updateCardContent);

function updateCardContent(event){
  if(event.keyCode == 13 || event.type == 'focusout')
  {
      //console.log('this', $(this));
      //console.log('target', $(event.target));
      var cardToUpdate = $(event.target).closest('.todo-card')[0];
      var propertyToUpdate = $(event.target).data("role"); //this snags the role off the data-role in html
      console.log('role:', propertyToUpdate);
      //console.log('target', event.target);
      toDoArray.forEach(function(todo){
        if(cardToUpdate.id == todo.id){
          todo[propertyToUpdate] = $(event.target).text();
        }
        // if(cardToUpdate.id == todo.id && event.target.className == 'task-content'){
        //   todo[propertyToUpdate] = $(event.target).text();
        // }
      });
      addToLocal();
      $('.title-input').focus();
  }
}

function showCompletedToDos() {
  //destroy
  $('.todo-container').empty();
  // this resorts the array and pushes all completed todos to front
  toDoArray.sort(function(x, y) {
    if (x.complete === y.complete){
      return 0; //
    } else if (x.complete) {
      return 1; //
    } else {
      return -1; //
    }
    // this is the same...in shorthand...notice the x? this is the 2nd if
    //return (x === y)? 0 : x? -1 : 1;
  });
  toDoArray.forEach(function(todo) {
    buildNewCard(todo);
  });
};

function hideCompletedToDos() {
  // destroy
  $('.todo-container').empty();
  toDoArray.forEach(function(todo){
    if (!todo.complete){
      buildNewCard(todo);
    }
  });
}

function toggleComplete() {
  var card = event.target.closest('.todo-card');
  toDoArray.forEach(function(todo){
    if (todo.id == card.id) {
      todo.complete = !todo.complete
    }
  });
  card.classList.toggle('todo-card-complete');
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
  $('.todo-container').prepend(todo);
};

//add object to localStorage function
function addToLocal(){
  var stringifiedToDo = JSON.stringify(toDoArray);
  //console.log(stringifiedToDo)
  localStorage.setItem('toDoArray', stringifiedToDo);
};

// get object back from JSON function
  function retrieveLocalStorage() {
    toDoArray = JSON.parse(localStorage.getItem('toDoArray')) || [];
    toDoArray.forEach(function(todo) {
      // exempt cards that are marked complete
      if (!todo.complete) {
        buildNewCard(todo);
      }
  })

};

//upvote button function
function changeImportance(){

  var card = $(event.target).closest('.todo-card')[0];
  var changer = $(event.target).data("changer");
  console.log('changer', changer);

  // if(event.target.className == 'up-vote-btn'){
  //   changer = 1;
  // } else {
  //   changer = -1;
  // }

   toDoArray.forEach(function(todo, index){
    if (todo.id == card.id) {
      var currIndex = importanceArray.indexOf(todo.importance);
      //console.log('currindex', currIndex);

      if(currIndex == 0 && changer == -1){
        currIndex++;
      }
      if(currIndex == importanceArray.length-1 && changer == 1){
        currIndex--;
      }

      todo.importance = importanceArray[currIndex + changer];
      var domLabel = $(event.target).parents('.todo-card').find('.importance-level')[0]
      // console.log('domlabel', domLabel);
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

//downvote button function
function downVote(){
  var importanceLevel = $('.importance-level')
  if (importanceLevel.text() === 'genius'){
    importanceLevel.text('plausible')
  }else if (importanceLevel.text() === 'plausible'){
    importanceLevel.text('swill')
  }
  addToLocal();
}

// Filter importanceLevel
$('.filter-btn-container').on('click', '.importance-btn', filterImportance);


function filterImportance() {
  var importance = $(this).text();
  $('.todo-container').empty();
  toDoArray.forEach(function(todo, index) {
    if (importance === todo.importance && !todo.complete) {
      buildNewCard(todo);
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
  filteredArray.forEach(function(todo) {
    buildNewCard(todo);
  });
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
  // $('.save-btn').prop('disabled', true);
  $('.title-input').focus();
}

//*********************************************************************
//******************  The Graveyard of Failed Ideas *******************
//*********************************************************************


//failed down-vote click
// $('.idea-container').on('click', '.down-vote', function() {
//   counter --;
//   if(counter <= 0) {
//     $('.down-vote').prop("disabled", true);
//   }
//   else if (counter > 0) {
//     $('.down-vote').prop("disabled", false)
//   }
//   console.log(counter)
// });

//failed attempt to save upvote
// function saveUpvote(){
//   var uniqueQuality = document.querySelector('.quality');
//   var uniqueTitle = document.querySelector('h2')
//   var uniqueBody = document.querySelector('.idea-tet')
//   console.log($(uniqueQuality).text());

  // ideaArray.forEach(function(idea, index){
  //   if (idea.quality === "swill"){
  //     $(uniqueQuality).text('plausible');
  //   }if (idea.quality === 'plausible'){
  //     $(uniqueQuality).text('genius');
  //   }
  // })
// };

// // failed idea to check Storage on page load
// function checkStorage () {
//   var stringifiedArr = localStorage.getItem(ideaArray);
//   ideaArray = JSON.parse(stringifiedArr) || [];
//   console.log('check storage function: ' + ideaArray);
// }
