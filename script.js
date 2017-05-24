//*********************Variables***************************//
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
var ideaList = $('.idea-container');
var myIdeas = []


//*********************EVENT LISTENERS**********************//

$(document).on('input', function() {
  enableEnterButton();
  })

// on page load loops over local storage and appends each item to page
  $(document).ready(function() {
      getIdeasFromStorage()
    });


function enableEnterButton()  {
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
  if (ideaTitle === "" || ideaBody === "") {
    $('.save-button').prop('disabled', true)
  } else {$('.save-button').prop('disabled', false)
}
}

function reset(){
  $('.title-input').val('');
  $('.body-input').val('');
  $('.save-button').prop('disabled', true);
}

function buildNewCard (){
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var newIdea = {title: ideaTitle, body: ideaBody}
  var ideaID = Date.now()
  var ideaCard = $('.idea-container').prepend(`
    <article class="idea-card" id="${ideaID}">
      <div class="card-top">
        <h2>${ideaTitle}</h2>
        <img src="assets/delete.svg" class="delete icon">
        <img src="assets/delete-hover.svg" class="delete-hover">
      </div>
      <p class="idea-text">${ideaBody}</p>
      <div class="card-bottom">
        <img src="assets/upvote.svg" class="up-vote icon">
        <img src="assets/upvote-hover.svg" class="up-vote-hover icon">
        <img src="assets/downvote.svg" class="down-vote icon">
        <img src="assets/downvote-hover.svg" class="down-vote-hover icon" class="down-vote-hover"
        <p class="quality">quality: swill</p>
      </div>
      <hr>
    </article>
    `)
  console.log(newIdea)
}


$('.save-button').on('click', function() {
  console.log('array before adding: ', myIdeas)
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var newID = Date.now()
  var newIdea = {id: newID, title: ideaTitle, body: ideaBody}
  var ideaCard = $('.idea-container').prepend(`
    <article class="idea-card" id=${newID}>
      <div class="card-top">
        <h2>${ideaTitle}</h2>
        <img src="assets/delete.svg" class="delete icon">
        <img src="assets/delete-hover.svg" class="delete-hover">
      </div>
      <p class="idea-text">${ideaBody}</p>
      <div class="card-bottom">
        <img src="assets/upvote.svg" class="up-vote icon">
        <img src="assets/upvote-hover.svg" class="up-vote-hover icon">
        <img src="assets/downvote.svg" class="down-vote icon">
        <img src="assets/downvote-hover.svg" class="down-vote-hover icon" class="down-vote-hover"
        <p class="quality">quality: swill</p>
      </div>
      <hr>
    </article>
    `)
    reset();
  console.log(newIdea)
//push into the array
  myIdeas.push(newIdea);
  console.log(myIdeas);
//stringify that shit
  var stringifiedIdea = JSON.stringify(myIdeas);
//add that shit to localStorage
  localStorage.setItem('idea', stringifiedIdea);
});
//get shit back from JSON
  function getIdeasFromStorage () {
    if (localStorage.getItem('idea')) {
      myIdeas = JSON.parse(localStorage.getItem('idea'));
      myIdeas.forEach(function(idea){
        var ideaCard = `<article class="idea-card">
            <div class="card-top">
              <h2>${ideaTitle}</h2>
              <img src="assets/delete.svg" class="delete icon">
              <img src="assets/delete-hover.svg" class="delete-hover">
            </div>
            <p class="idea-text">${ideaBody}</p>
            <div class="card-bottom">
              <img src="assets/upvote.svg" class="up-vote icon">
              <img src="assets/upvote-hover.svg" class="up-vote-hover icon">
              <img src="assets/downvote.svg" class="down-vote icon">
              <img src="assets/downvote-hover.svg" class="down-vote-hover icon" class="down-vote-hover"
              <p class="quality">quality: swill</p>
            </div>
            <hr>
          </article>
          `
          ideaList.prepend(ideaCard);
      })
    } else {console.log("nothing here bitch")}
  }

//**********************Functions**************************//

//function for creating new idea card
function newIdeaCard(){
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var ideaCard = $('.idea-container').prepend(`
    <article class="idea-card">
      <div class="card-top">
        <h2>${ideaTitle}</h2>
        <img src="assets/delete.svg" class="delete icon">
        <img src="assets/delete-hover.svg" class="delete-hover">
      </div>
      <p class="idea-text">${ideaBody}</p>
      <div class="card-bottom">
        <img src="assets/upvote.svg" class="up-vote icon">
        <img src="assets/upvote-hover.svg" class="up-vote-hover icon">
        <img src="assets/downvote.svg" class="down-vote icon">
        <img src="assets/downvote-hover.svg" class="down-vote-hover icon" class="down-vote-hover"
        <p class="quality">quality: swill</p>
      </div>
      <hr>
    </article>
    `)
  };

//******************Local Storage***************************//



// var Idea = function(title, body){
//   this.title = title;
//   this.body = body;
// };
//
// var stringifiedIdeas = JSON.stringify(ideaTitle)
// var parsedIdeas = JSON.parse()
//
// localStorage.setItem('ideas', stringifiedIdeas)
