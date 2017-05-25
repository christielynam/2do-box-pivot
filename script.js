//***************************** Variables *****************************
//*********************************************************************
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
var newIdea = {title: ideaTitle, body: ideaBody};
var ideaList = $('.idea-container');
var ideaArray = [];
var counter = 0

//*********************************************************************
//*************************  EVENT LISTENERS  *************************
//*********************************************************************

$(document).on('input', function() {
  enableSaveButton();
  })

// on page load, grab localStorage
$(document).ready(function() {
  getIdeasFromStorage();
});

// on save button click, build a new card
$('.save-button').on('click', function() {
  buildNewCard(newIdea);
  addToLocal(newIdea);
  reset();
});

//Up-Vote Event
$('.idea-container').on('click', '.up-vote', function() {
  upvote();
});

//Down-Vote Event
$('.idea-container').on('click', '.down-vote', function() {
  downvote();
  addToLocal();
});

//Delete idea cards from DOM and localStorage
$('.idea-container').on('click', '.delete', function() {
  var cardID = parseInt($(this).closest('.idea-card').attr('id'));
  console.log(cardID)
  ideaArray.forEach(function(idea, index){
    if (idea.id === cardID) {
      ideaArray.splice(index, 1);
      console.log(ideaArray);
    }
    localStorage.setItem('ideaArray', JSON.stringify(ideaArray));
  });
  var indivdualCard = document.getElementById(cardID);
  indivdualCard.remove();
});

//*********************************************************************
//***************************  Functions  *****************************
//*********************************************************************

//constructor function for creating new objects to save in localStorage
function IdeaConstructor(title, body, quality){
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = "swill";
}

//build a Card
function buildNewCard (title, body){
  var ideaTitle = $('.title-input').val() || title;
  var ideaBody = $('.body-input').val() || body;
  var ideaID = Date.now();
  var newIdea = new IdeaConstructor(ideaTitle, ideaBody);
  $('.idea-container').prepend(`
    <article class="idea-card" id="${ideaID}">
        <div class="card-top">
          <h2>${ideaTitle}</h2>
          <button class="delete icon"></button>
        </div>
        <p class="idea-text">${ideaBody}</p>
        <div class="card-bottom">
          <button class="up-vote"></button>
          <button class="down-vote icon"></button>
          <p>quality: <span class="quality">swill</span></p>
        </div>
        <hr>
      </article>
    `)
    ideaArray.push(newIdea);
  };

//add object to localStorage function
function addToLocal(idea){
  var stringifiedIdea = JSON.stringify(ideaArray);
  console.log(stringifiedIdea)
  localStorage.setItem('ideaArray', stringifiedIdea);
};

// get object back from JSON function
  function getIdeasFromStorage () {
    console.log(localStorage.getItem('ideaArray'))
    if (localStorage.getItem('ideaArray')){
      var retrieve = JSON.parse(localStorage.getItem('ideaArray'));
          console.log("loading ideas ", retrieve)
      retrieve.forEach(function(element){
      var ideaNode = buildNewCard(element.title, element.body);
      ideaList.prepend(ideaNode);
      })
  } else {console.log('nothing here bitch')}
};

//upvote button function
function upvote(){
  var qualityInput = $('.quality')
  if (qualityInput.text() === 'swill'){
    qualityInput.text('plausible');
  }else if (qualityInput.text() === 'plausible'){
    qualityInput.text('genius');
  }
}

//downvote button function
function downvote(){
  var qualityInput = $('.quality')
  if (qualityInput.text() === 'genius'){
    qualityInput.text('plausible')
  }else if (qualityInput.text() === 'plausible'){
    qualityInput.text('swill')
  }
}

//Search Bar Function
function search() {
  var inputText = $('.search-input').val().toUpperCase();
  var hideArray = ideaArray.filter(function(idea){
    if (IdeaConstructor.title.toUpperCase().indexOf(inputText) < 0 && IdeaConstructo.body.toUpperCase().indexOf(inputText) < 0) {
      return idea;
    } else {
      $('#' + idea.id).closest('.box').css('display', 'block');
    }
  });
  hideArray.forEach(function(idea) {
    $('#' + idea.id).closest('.box').css('display', 'none');
  });
}

//enable the save button function
function enableSaveButton()  {
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
  if (ideaTitle === "" || ideaBody === "") {
    $('.save-button').prop('disabled', true)
  } else {$('.save-button').prop('disabled', false)
}
}

//reset input fields function
function reset(){
  $('.title-input').val('');
  $('.body-input').val('');
  $('.save-button').prop('disabled', true);
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
