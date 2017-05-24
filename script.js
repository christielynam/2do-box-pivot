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
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  var newIdea = new IdeaConstructor(titleInput, bodyInput);
  addToLocal(newIdea);
  buildNewCard(newIdea);
  reset();
});


function IdeaConstructor(title, body){
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  ideaArray.push(this);
}

function enableSaveButton()  {
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

function buildNewCard (idea){
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var ideaID = Date.now();
  var newIdea = {id: ideaID, title: ideaTitle, body: ideaBody}
  $('.idea-container').prepend(`
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
  };

//check Storage
function checkStorage () {
  var stringifiedArr = localStorage.getItem(ideaArray);
  ideaArray = JSON.parse(stringifiedArr) || [];
  console.log(ideaArray)
}

//add to localStorage
function addToLocal(idea){
  // var ideaTitle = $('.title-input').val();
  // var ideaBody = $('.body-input').val();
  // var ideaID = Date.now();
  // var newIdea = ideaID, ideaTitle, ideaBody;
  checkStorage();
  ideaArray.push(idea);
//stringify that shit
//   var stringifiedIdea = JSON.stringify(ideaArray);
//   console.log(stringifiedIdea)
// //add that shit to localStorage
  localStorage.setItem('ideaArray', JSON.stringify(ideaArray));
  checkStorage()
};


// function updateIdeaArray(boxID, updatedText, property){
//   allIdeas.forEach(function(idea, index) {
//       if (idea.id === boxID) {
//         idea[property] = updatedText;
//       }
//   });
//   localStorage.setItem('allIdeas', JSON.stringify(allIdeas));
// }
// get shit back from JSON
  function getIdeasFromStorage () {
    if (localStorage.getItem('idea', stringifiedIdea)){
      var stringifiedIdea = JSON.stringify(ideaArray);
      var getShit = JSON.parse(localStorage.getItem('idea'));
      console.log("loading ideas ", stringifiedIdea)
      getShit.forEach(function(idea, index){
      var ideaNode = buildNewCard(getShit);
      ideaList.prepend(ideaNode);
      })
  } else {console.log('nothing here bitch')}
};

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
