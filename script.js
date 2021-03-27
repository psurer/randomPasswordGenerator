
var generateBtn = document.querySelector("#generate");
// puts function to event listener
generateBtn.addEventListener("click", writePassword);
// asks question to user
function askQuestion(question) {
  return window.prompt(question);
}
// asks question to user
function confirmAnswer(title) {
  return window.confirm(title);
}
// check user answers to generate password 
function writePassword() {
  var questions = ['Do You want To Include Uppercase letters?',
    'Do You Want To Include Lowercase Letters?',
    'Do You Want To Include Numbers',
    'Do You Want To Confirm Symbols?'];

  // Characters for each option.
  const options = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'bcdefghijklmnopqrstuvwxyz', '0123456789', '!@#$%^&*_-+='];
  var optionsPicked = [];

  var passwordLenght = askQuestion('Password must be between 8-128 characters long, enter your number here:');
  if (passwordLenght < 8 || passwordLenght > 128) {
    window.alert('Password must be between 8-128 characters long');
    return; // Leave due to user error.
  }

  for (var index = 0; index < questions.length; index++) {
    if (confirmAnswer(questions[index])) {
      optionsPicked.push(options[index]); // Adding to optionsPicked the correspoinding character set using the index property.
    }
  }

  if (optionsPicked.length === 0) { // Error if not options where selected.
    window.alert('You Must Choose What You Want Your Password to Contain');
    return;
  }
  var passwordBox = document.querySelector("#password");
  passwordBox.value = generatePassword(passwordLenght, optionsPicked); // Generate password
}

/*  
  Generates password according to user picks
  This function runs 3 for-loops
    1- First loop will run until we get enough characters
    2- Second loop will iterate throught the selected options ( Uppler, lower, etc)
    3- Third loop will pick the amount of characters from each selected options. 

    if at any given time we collect enought characters this function will return
    the generated password.
*/
function generatePassword(howLong, selectedOptions) {
  var result = '';
  const numberOfCharactersToPick = Math.floor((howLong / selectedOptions.length));
  for (var count = 0; count < howLong; count++) {
    for (var indexForOptions = 0; indexForOptions < selectedOptions.length; indexForOptions++) {
      var validCharacters = selectedOptions[indexForOptions];  // The first time validCharacters = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ' ,...
      for (var index = 0; index < numberOfCharactersToPick; index++) { // numberOfCharactersToPick = USER_SELECTED_PASSWORD_LENGHT / selectedOptions.lenght
        if ( result.length >= howLong){ //Get out if we already have enough characters
          return result;
        }
        var positionFromWhichIamTakingALetter = Math.floor(Math.random() * validCharacters.length);
        // charAt treats string like Array and returns the character in the position, making logic simpler
        result = result + validCharacters.charAt(positionFromWhichIamTakingALetter);
      }
    }
  }
  return result;
}

