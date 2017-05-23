//*********************Variables***************************//
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
var ideaList = $('.idea-container');
var myIdeas = []

//*********************EVENT LISTENERS**********************//

//create new card on button click
// $('.save-button').on('click', function(){
//   newIdeaCard();
// })

$('.save-button').on('click', function() {
  console.log('array before adding: ', myIdeas)
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var newIdea = {title: ideaTitle, body: ideaBody}
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
  console.log(newIdea)
//push into the array
  myIdeas.push(newIdea);
  console.log(myIdeas);
//stringify that shit
  var stringifiedIdea = JSON.stringify(myIdeas);
//add that shit to localStorage
  localStorage.setItem('idea', stringifiedIdea)
});
//get shit back from JSON
  function getIdeasFromStorage () {
    if (localStorage.getItem('idea')) {
      var storedIdeas = localStorage.getItem('idea');
      var parsedIdeas = JSON.parse(storedIdeas);
      console.log("log idea", parsedIdeas);

      parsedIdeas.forEach(function(idea){
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

          ideaList.append(ideaCard);
      })
    } else {console.log("nothing here bitch")}
  }
    $(document).ready(function() {
      getIdeasFromStorage();
    })
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
