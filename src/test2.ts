function buildJsonObject() {

let columnsCSV: string = "Full Name,Age,Birthplace,Birthdate";
  let columns: string[] = columnsCSV.split(",");

  var schema = {
    objects: {
      "CSVReader" : {
        displayName: "CSV Reader",
        description: "Reads a CSV file and returns the contents as a list.",
        properties: {}
      }
    }
  }
  console.log(columns);
  for (let column of columns) {
    schema.objects.CSVReader.properties[column] = {
      displayName: column,
      type: "string"
    };
  }

  console.log(JSON.stringify(schema));
}

buildJsonObject();

