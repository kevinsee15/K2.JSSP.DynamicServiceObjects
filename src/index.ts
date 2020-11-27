import "@k2oss/k2-broker-core";

metadata = {
  systemName: "k2.jssp.dynamicserviceobject",
  displayName: "K2 JSSP Dynamic Service Object",
  description: "An example broker dynamically generates service objects.",
  configuration: {
    "Web API URL": {
     "displayName": "Web API URL",
     "type": "string",
     required: true
    },
    "Columns": {
     "displayName": "Columns (Comma Separated)",
     "type": "string",
     required: true
    },
    "Has Header": {
     "displayName": "Has Header",
     "type": "boolean",
     required: true
    },
    "Skip Row Count": {
     "displayName": "Skip Row Count",
     "type": "number"
    },
    "Sheet Name": {
     "displayName": "Sheet Name",
     "type": "string"
    },
  }
};

ondescribe = async function ({ configuration }): Promise<void> {
  let columnsCSV: string = <string> configuration["Columns"];
  let columns: string[] = columnsCSV.split(",");

  var schema = {
    objects: {
      "ExcelCSVReader" : {
        displayName: "Excel or CSV Reader",
        description: "Reads an Excel or CSV file and returns the contents as a list.",
        properties: {
          "File" : {
            displayName: "File",
            type: "attachment"
          }
        },
        methods: {
          Read : {
            displayName: "Read",
            type: "list",
            inputs:["File"],
            outputs:[]
          }
        }
      }
    }
  }

  for (let column of columns) {
    schema.objects.ExcelCSVReader.properties[column] = {
      displayName: column,
      type: "string"
    };
  }

  schema.objects.ExcelCSVReader.methods.Read.outputs = columns;

  postSchema(schema);
};

onexecute = async function ({
  objectName,
  methodName,
  parameters,
  properties,
  configuration,
  schema,
}): Promise<void> {
  switch (objectName) {
    case "ExcelCSVReader":
      await onexecute_ExcelCSVReader(methodName, properties, parameters);
      break;
    default:
      throw new Error("The object " + objectName + " is not supported.");
  }
};

async function onexecute_ExcelCSVReader(
  methodName: string,
  properties: SingleRecord,
  parameters: SingleRecord
): Promise<void> {
  switch (methodName) {
    case "Read":
      await onexecute_ExcelCSVReader_Read(properties);
      break;
    default:
      throw new Error("The method " + methodName + " is not supported.");
  }
}

function onexecute_ExcelCSVReader_Read(properties: SingleRecord) {
  // Call Web API Here
  postResult([
    {
      "Full Name": "John Doe",
      "Age": "29",
      "Birthdate": "11/12/1992",
      "Birth Place": "Singapore, Singapore",
      "Contact Number": "65 8888 1111"
    },
    {
      "Full Name": "Jane Doe",
      "Age": "27",
      "Birthdate": "01/08/1992",
      "Birth Place": "Johor, Malaysia",
      "Contact Number": "65 1111 8888"
    }
  ]);
}