let p = document.querySelector("p");
let inp = document.querySelector("input");
let btn = document.querySelector("button");
let div = document.querySelector("div");
let errorMessage = document.createElement("p");
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

btn.addEventListener("click", async () => {
  let word = inp.value;
  url += word;
  if (word != "") {
    getData();
  }
  url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
});
async function getData() {
  try {
      document.body.remove(errorMessage);
    div.innerHTML = "";
    let res = await axios.get(url);
    let POSArr = res.data[0].meanings;
    showPOS(POSArr);
    let meaningArr = res.data[0].meanings;
    showMeaning(meaningArr);
  } catch (e) {
    showError(e);
  }
}
function showPOS(arr) {
  let para = document.createElement("h2");
  para.innerHTML = ` Parts Of Speech : `;
  div.append(para);
  for (elem of arr) {
    let pSpeech = document.createElement("li");
    pSpeech.innerHTML = elem.partOfSpeech;
    div.append(pSpeech);
  }
}
function showMeaning(arr) {
  let para = document.createElement("h2");
  para.innerHTML = ` Meanings : `;
  div.append(para);

  for (elem of arr) {
    let defArr = elem.definitions;
    printMeaning(defArr);
  }
}
function printMeaning(defArr) {
  for (arr of defArr) {
    let mean = document.createElement("li");
    mean.innerHTML = arr.definition;
    div.append(mean);
    console.log(arr.definition);
  }
}
function showError(error) {
  errorMessage.style.color = "red";
  errorMessage.innerHTML = `Error: Could not fetch data. Please check the word and try again.`;
  document.body.append(errorMessage);
  console.error("Error:", error);
}
