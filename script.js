//*********************Variables***************************//
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
var newIdea = {title: ideaTitle, body: ideaBody};
var ideaList = $('.idea-container');
var ideaArray = []



//*********************EVENT LISTENERS**********************//

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


//***************Functions***********************/

//constructor function for creating new objects to save in localStorage
function IdeaConstructor(title, body){
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

//build a Card
function buildNewCard (title, body){
  var ideaTitle = $('.title-input').val() || title;
  var ideaBody = $('.body-input').val() || body;
  var newIdea = new IdeaConstructor(ideaTitle, ideaBody);
  $('.idea-container').prepend(`
    <article class="idea-card">
        <div class="card-top">
          <h2>${ideaTitle}</h2>
          <button class="delete icon"></button>
        </div>
        <p class="idea-text">${ideaBody}</p>
        <div class="card-bottom">
          <button class="up-vote"></button>
          <button class="down-vote icon"></button>
          <p class="quality">quality: swill</p>
        </div>
        <hr>
      </article>
    `)
    ideaArray.push(newIdea);
  };

// //check Storage
// function checkStorage () {
//   ideaArray = JSON.parse(stringifiedArr) || [];
//   var stringifiedArr = localStorage.getItem(ideaArray);
//   console.log(ideaArray);
// }

//add to localStorage
function addToLocal(idea){
  var stringifiedIdea = JSON.stringify(ideaArray);
  console.log(stringifiedIdea)
  localStorage.setItem('ideaArray', stringifiedIdea);
};


// get shit back from JSON
  function getIdeasFromStorage () {
    console.log(localStorage.getItem('ideaArray'))
    if (localStorage.getItem('ideaArray')){
      var getShit = JSON.parse(localStorage.getItem('ideaArray'));
      console.log("loading ideas ", getShit)
      getShit.forEach(function(element){
      var ideaNode = buildNewCard(element.title, element.body);
      ideaList.prepend(ideaNode);
      })
  } else {console.log('nothing here bitch')}
};

//enable the save button
function enableSaveButton()  {
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
  if (ideaTitle === "" || ideaBody === "") {
    $('.save-button').prop('disabled', true)
  } else {$('.save-button').prop('disabled', false)
}
}

//reset input fields
function reset(){
  $('.title-input').val('');
  $('.body-input').val('');
  $('.save-button').prop('disabled', true);
}


//**********************Functions**************************//

// //function for creating new idea card
// function newIdeaCard(){
//   var ideaTitle = $('.title-input').val();
//   var ideaBody = $('.body-input').val();
//   var ideaCard = $('.idea-container').prepend(`
//     <article class="idea-card">
//       <div class="card-top">
//         <h2>${ideaTitle}</h2>
//         <img src="assets/delete.svg" class="delete icon">
//         <img src="assets/delete-hover.svg" class="delete-hover">
//       </div>
//       <p class="idea-text">${ideaBody}</p>
//       <div class="card-bottom">
//         <img src="assets/upvote.svg" class="up-vote icon">
//         <img src="assets/upvote-hover.svg" class="up-vote-hover icon">
//         <img src="assets/downvote.svg" class="down-vote icon">
//         <img src="assets/downvote-hover.svg" class="down-vote-hover icon" class="down-vote-hover"
//         <p class="quality">quality: swill</p>
//       </div>
//       <hr>
//     </article>
//     `)
//   };

//******************Local Storage***************************//


//
// var Idea = function(title, body){
//   this.title = title;
//   this.body = body;
// };
//
// var stringifiedIdeas = JSON.stringify(ideaTitle)
// var parsedIdeas = JSON.parse(stringifiedIdeas)
//
// localStorage.setItem('ideas', stringifiedIdeas)
