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
  renderRows(rows, headers.length);
}

function renderHeading(headers) {
  headers.forEach((header) => {
    const heading = document.createElement("th");
    heading.innerText = header;
    document.getElementById("headers").appendChild(heading);
  });
}

function renderRows(rows, expectedLength) {
  for (row of rows) {
    rowData = row.split(/,(?=\S)/);
    // Skip incomplete entries
    if (rowData.length < expectedLength) continue;
    else {
      const newRow = document.createElement("tr");
      document.getElementById("tbody").appendChild(newRow);
      rowData.forEach((element, i) => {
        const newCell = document.createElement("td");
        if (i === 3) {
          const mailLink = document.createElement("a");
          mailLink.innerText = element;
          mailLink.setAttribute("href", `mailto:${element}`);
          newRow.appendChild(mailLink);
        } else {
          if (i === 6) {
            element = element.replace(/"/g, "");
          }
          newCell.innerText = element;
          newRow.appendChild(newCell);
        }
      });
    }
  }
}
