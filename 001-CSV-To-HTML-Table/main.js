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
      const newCell = document.createElement("td");
      if (i === 3) {
        const mailLink = document.createElement("a");
        mailLink.innerText = element;
        mailLink.setAttribute("href", `mailto:${element}`);
        newRow.appendChild(mailLink);
      } else {
        // Here I'm fixing the way that "split on comma" sometimes messes up the employer entry.  This is a dirty, dirty fix but I can't figure out how to accomplish what I want with regex.
        if (i === 6 && rowData[7]) {
          element = `${element}, ${rowData[7]}`;
          rowData.length = 7;
        }
        if (i === 6) {
          element = element.replace(/"/g, "");
        }
        newCell.innerText = element;
        newRow.appendChild(newCell);
      }
    });
  });
}
