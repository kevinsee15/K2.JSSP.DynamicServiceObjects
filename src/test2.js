function buildJsonObject() {
    var columnsCSV = "Full Name,Age,Birthplace,Birthdate";
    var columns = columnsCSV.split(",");
    var schema = {
        objects: {
            "CSVReader": {
                displayName: "CSV Reader",
                description: "Reads a CSV file and returns the contents as a list.",
                properties: {}
            }
        }
    };
    console.log(columns);
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        schema.objects.CSVReader.properties[column] = {
            displayName: column,
            type: "string"
        };
    }
    console.log(JSON.stringify(schema));
}
buildJsonObject();
