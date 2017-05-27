
var toDoList = $('.todo-container');
var toDoArray = [];

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
$('.todo-container').on('click', '.up-vote-btn', function() {
  upvote();
});

//Down-Vote Event
$('.todo-container').on('click', '.down-vote-btn', function() {
  downvote();
  addToLocal();
});

//Delete idea cards from DOM and localStorage
$('.todo-container').on('click', '.delete-btn', deleteToDo);

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
}

//build a Card
function buildNewCard(newToDo){
  var todo = `<article class="todo-card" id="${newToDo.id}">
        <div class="card-top">
          <h2 class="card-title">${newToDo.title}</h2>
          <button class="delete-btn"></button>
        </div>
        <p class="task-content">${newToDo.task}</p>
        <div class="card-bottom">
          <button class="up-vote-btn"></button>
          <button class="down-vote-btn"></button>
          <p id="importance">importance: <span class="importance-level">${newToDo.importnace}</span></p>
        </div>
      </article>`;

  $('.todo-container').prepend(todo);
  // toDoArray.push(todo);
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
      console.log(todo);
      buildNewCard(todo);
  })
  
};

//upvote button function
function upvote(){
  var importanceLevel = $('.importance-level')
  if (importanceLevel.text() === 'swill'){
    importanceLevel.text('plausible');
  }else if (importanceLevel.text() === 'plausible'){
    importanceLevel.text('genius');
  }
}

//downvote button function
function downvote(){
  var importanceLevel = $('.importance-level')
  if (importanceLevel.text() === 'genius'){
    importanceLevel.text('plausible')
  }else if (importanceLevel.text() === 'plausible'){
    importanceLevel.text('swill')
  }
}

//Search Bar Function
// function search() {
//   var inputText = $('.search-input').val().toUpperCase();
//   var hideArray = ideaArray.filter(function(idea){
//     if (IdeaConstructor.title.toUpperCase().indexOf(inputText) < 0 && IdeaConstructo.body.toUpperCase().indexOf(inputText) < 0) {
//       return idea;
//     } else {
//       $('#' + idea.id).closest('.box').css('display', 'block');
//     }
//   });
//   hideArray.forEach(function(idea) {
//     $('#' + idea.id).closest('.box').css('display', 'none');
//   });
// }

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
