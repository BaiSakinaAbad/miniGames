const input = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", () => {
  const inputWord = input.value;
  
  if (inputWord.trim() === "") {
    // alert if no input
    alert("Please input a value.");
    return;
  } else {
    // clean the spaces before anf after, then turn them all to lowercase
    const cleanStr = inputWord.trim().toLowerCase();
    // remove all spaces and non-alphabetical characters
    const noSpace = inputWord.toLowerCase().replace(/[^a-z0-9]/g, "");
    // reverse is a method for array, not string, so we convert the string into an array, reverse that array, and then join it back
    const reversed = noSpace.split('').reverse().join('');
    
    if (noSpace === reversed) {
      result.innerText = `"${inputWord}" is a Palindrome`;
      //result.style.color = "green";
    } else {
      result.innerText = `"${inputWord}" is not a Palindrome`;
     // result.style.color = "red";
    }
  }
});
