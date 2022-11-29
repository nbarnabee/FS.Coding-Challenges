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
  renderRows(rows);
}

function renderHeading(headers) {
  headers.forEach((header) => {
    const heading = document.createElement("th");
    heading.innerText = header;
    document.getElementById("headers").appendChild(heading);
  });
}

function renderRows(rows) {
  rows.forEach((row) => {
    const newRow = document.createElement("tr");
    document.getElementById("tbody").appendChild(newRow);
    rowData = row.split(",");
    rowData.forEach((element, i) => {
      console.log(row);
      const newCell = document.createElement("td");
      if (i === 3) {
        const mailLink = document.createElement("a");
        mailLink.innerText = element;
        mailLink.setAttribute("href", `mailto:${element}`);
        newRow.appendChild(mailLink);
      } else {
        newCell.innerText = element;
        newRow.appendChild(newCell);
      }
    });
  });
}
//row[2] will be the email address
