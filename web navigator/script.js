const Stack = require('./Stack.js');
const prompt = require('prompt-sync');
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'Homepage';
// ------------------------------
// Helper Functions
// ------------------------------
showCurrentPage(action){
  console.log(`You performed: ${action}, operation`);
  console.log(`current page: ${currentPage}`);
  console.log(`Back Page: ${backPages.peek()}`);
  console.log(`Next Page: ${nextPages.peek()}`);
}

newPage(page){
  backPages.push(currentPage);
  currentPage = page;
  while(nextPages !== null){
    nextPages.pop();
  }
  showCurrentPage(" New");
}

backPage(){
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage(" Back");
}

nextPage(){
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage(" Next");
}
/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false;

showCurrentPage(" Default Page");
while(finish === false){
  const instructions = baseInfo;
  if(!backPages.peek() !== null){
    instructions = `${instructions}, ${backInfo}`;
    showBack = true;
  }
  else{
    showBack = false;
  }

  if(nextPages.peek() !== null){
    instructions = `${instructions}, ${nextInfo}`;
    showNext = true;
  }
  else{
    showNext = false;
  }

instructions = `${instructions}, ${quitInfo}`;
console.log(instructions);

}

  // ------------------------------
  // User Interface Part 2
  // ------------------------------
const answer = prompt(question);
const lowerCaseAnswer = answer.toLowerCase();

if(lowerCaseAnswer === "new"){
  newPage(answer);
}
else if(showNext === true && lowerCaseAnswer === 'next'){
  nextPage();
}
else if(showBack === true && lowerCaseAnswer === "back"){
  backPage();
}
else if(lowerCaseAnswer === 'quit'){
  finish = true;
  console.log("Browser Closed");
  // return;
}
  else if (lowerCaseAnswer === 'new') {
    // invalid input to a non-available option
    console.log('Cannot go back a page. Stack is empty.');
  } else if (lowerCaseAnswer === 'next') {
    // invalid input to a non-available option
    console.log('Cannot go to the next page. Stack is empty.');
  }





