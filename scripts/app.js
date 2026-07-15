console.log("Text Wrap 72 loaded");

const rawText = document.getElementById("rawTextEntry");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  wrap72(rawText.value);
  copyToClipboard();

});



/*
  Wraps text to 72 characters per line
  preserves newlines and whitespace
*/
function wrap72(text) {
  const MAX_COL = 72;

  //unnesary conversion commented out
  //const pagraphs = text.replace(/\r\n/g, "\n").split("\n");

  //array of paragraphs, split by newlines
  const pagraphs = text.split("\n");

  //loops through each paragraph and wraps it to 72 characters
  const wrapped = pagraphs.map(p => {
    // keep empty lines, .trim removes leading and trtailing whitespace
    if (p.trim().length === 0) return "";

    //split paragraph into words and whitespace, keeps whitespace in the array
    const chars = p.split(/(\s+)/); 

    let lines = [];
    let line = "";

    for (let char of chars) {
      //skip empty strings, shouldnt happen. 
      if (char === "") continue;

      // If adding this char
      // en exceeds 72 chars, push current line
      if (line.length + char.length > MAX_COL && line.trim().length > 0) {
        lines.push(line);
        line = char
        .replace(/^\s+/, ""); // avoid leading spaces
      } else {
        line += char
        ;
      }
    }

    if (line.length > 0) lines.push(line);

    return lines.join("\n");
  });
  //join the wrapped paragraphs with newlines
  const formattedText = wrapped.join("\n");

  //replaces the text in the textarea with the formatted text
  rawText.value = formattedText;
  return formattedText;
}

function copyToClipboard() {
  const textArea = document.getElementById("rawTextEntry");
  textArea.select();
  document.execCommand("copy");
  console.log("Text copied to clipboard!");
}

function resetText() {
  const textArea = document.getElementById("rawTextEntry");
  textArea.value = "";
}
