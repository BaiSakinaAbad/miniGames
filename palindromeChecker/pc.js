// getting the id using getElementById
const input =  document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");


checkBtn.addEventListener("click", () => {
    const inputWord = input.value;
    
    if (inputWord.trim() === "") {
    alert("Please input a value.");
    return;
  } else{
    // code for trim, lowercase, reverse and checking
  }

});
