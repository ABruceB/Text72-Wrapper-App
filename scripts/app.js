console.log("SAP Companion App loaded.");

const rawText = document.getElementById("rawTextEntry");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  console.log(wrap72(rawText.value));
});

function wrap72(text) {
  const MAX_COL = 72;

  // maintains use created new lines
  const paragraphs = text.replace(/\r\n/g, "\n").split("\n");

  const wrapped = paragraphs.map(par => {
    // maintains empty lines
    if (par.trim().length === 0) return "";

    //spits the paragraphs into array of strings
    const tokens = par.split(/(\s+)/); 
    
    let lines = [];
    let line = "";

    //loops through the paragraphs
    for (let tok of tokens) {
      if (tok === "") continue;

      // If adding this token exceeds 72 chars, push current line
      if (line.length + tok.length > MAX_COL && line.trim().length > 0) {
        lines.push(line);
        line = tok.replace(/^\s+/, ""); // avoid leading spaces
      } else {
        line += tok;
      }
    }

    if (line.length > 0) lines.push(line);

    return lines.join("\n");
  });
  const formattedText = wrapped.join("\n");
  rawText.value = formattedText;
  return formattedText;
}
