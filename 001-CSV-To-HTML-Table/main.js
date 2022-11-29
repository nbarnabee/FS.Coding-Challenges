const fileSelector = document.getElementById("input"),
  displayButton = document.getElementById("display");

fileSelector.addEventListener("change", (event) => {
  file = event.target.files[0];
  readFile(file);
});

function readFile(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    parseFile(text);
  };
  reader.readAsText(file);
}

function parseFile(text) {
  const headers = text.slice(0, text.indexOf("\r")).split(",");
  // Splits the file along the line breaks
  // Filters out any incorrectly formatted lines
  const rows = text
    .slice(text.indexOf("\r\n"))
    .split("\r\n")
    .filter((row) => !isNaN(row[0]));
  buildTable(headers, rows);
}

function buildTable(headers, rows) {
  renderHeading(headers);
}

function renderHeading(headers) {
  headers.forEach((header) => {
    const heading = document.createElement("th");
    heading.innerText = header;
    document.getElementById("headers").appendChild(heading);
  });
}
