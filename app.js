console.log("Hello from DS14!");

let viz;

//Create a variable for the url
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
//Create a variable for the vizContainer
const vizContainer = document.getElementById("vizContainer");
//Create a variable for the viz options
const options = {
  device: "desktop",
  hideTabs: true,
};

//
const hideButton = document.getElementById("hideButton");
hideButton.addEventListener("click", function () {
  console.log("Hello from the button!");
  viz.hide();
  showButton.style.display = "inline";
  hideButton.style.display = "none";
});

const showButton = document.getElementById("showButton");
showButton.addEventListener("click", function () {
  viz.show();
  showButton.style.display = "none";
  hideButton.style.display = "inline";
});
// Export to PDF
const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

// Export to PPT
const pptButton = document.getElementById("pptButton");
pptButton.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

// Export Data (CrossTab)
const dataButton = document.getElementById("dataButton");
dataButton.addEventListener("click", function () {
  viz.showExportCrossTabDialog();
});

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  showButton.style.display = "none";
}

function getRangeValues() {
  // Get values from input
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // Get the workbook
  const workbook = viz.getWorkbook();
  // Get active sheet -- Dashboard
  const activeSheet = workbook.getActiveSheet();
  // Get all the sheets in the dashboard
  const sheets = activeSheet.getWorksheets();
  console.log(sheets[1]);
  // Apply the filter to the sheet with the sales measure
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

document.getElementById("filterButton").addEventListener("click", function () {
  getRangeValues();
});

document.addEventListener("DOMContentLoaded", initViz);
