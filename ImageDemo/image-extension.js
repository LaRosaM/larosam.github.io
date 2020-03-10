$(document).ready(function () {
  // Setting the title name
  tableau.extensions.initializeAsync().then(function () {
    // Add an event listener for the selection changed event on this sheet.
    // Assigning the event to a variable just to make the example fit on the page here.
    const markSelection = tableau.TableauEventType.MarkSelectionChanged;
    //
    let dashboard = tableau.extensions.dashboardContent.dashboard;
    console.log(dashboard.worksheets[0]);
    unregisterEventHandlerFunction = dashboard.worksheets[0].addEventListener(markSelection, function (selectionEvent) {
      // When the selection changes, reload the data
      // Initialization succeeded! Get the dashboard
      dashboard.worksheets[0].getUnderlyingDataAsync().then(dataTable => {
        let field = dataTable.columns.find(column => column.fieldName === "Imagen");
        let list = [];
        for (let row of dataTable.data) {
          list.push(row[field.index].value);
        }
        //let values = list.filter((el, i, arr) => arr.indexOf(el) === i);
        console.log(list);
        console.log(list[0]);

        document.getElementById('selectedItem').src = list[0];
      });

      // remove the event listener when done
      //unregisterEventHandlerFunction();
    });
  }, function (err) {
    // something went wrong in initialization        
    $("#resultBox").html("Error while Initializing: " + err.toString());
  });
});

function processForm(event) {
  
}

function handleFirstNameValue(event) {
  const titleName = document.querySelector('#title-name');

  firstName = event.target.value;
  titleName.innerHTML = firstName;
  console.log(titleName.innerHTML);
  console.log(firstName);
}

function handleLastNameValue(event) {
  lastName = event.target.value;
  console.log(lastName);
}