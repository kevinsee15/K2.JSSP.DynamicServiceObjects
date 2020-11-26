import "@k2oss/k2-broker-core";

metadata = {
  systemName: "k2.jssp.dynamicserviceobject",
  displayName: "K2 JSSP Dynamic Service Object",
  description: "An example broker dynamically generates service objects.",
  configuration: {
    "Columns": {
     "displayName": "Columns (Comma Separated)",
     "type": "string"
    }
  }
};

ondescribe = async function ({ configuration }): Promise<void> {
  let columnsCSV: string = <string> configuration["Columns"];
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

  for (let column of columns) {
    schema.objects.CSVReader.properties[column] = {
      displayName: column,
      type: "string"
    };
  }

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
    case "todo":
      await onexecuteTodo(methodName, properties, parameters);
      break;
    default:
      throw new Error("The object " + objectName + " is not supported.");
  }
};

async function onexecuteTodo(
  methodName: string,
  properties: SingleRecord,
  parameters: SingleRecord
): Promise<void> {
  switch (methodName) {
    case "get":
      await onexecuteTodoGet(properties);
      break;
    case "getParams":
      await onexecuteTodoGetWithParams(parameters);
      break;
    default:
      throw new Error("The method " + methodName + " is not supported.");
  }
}

function onexecuteTodoGet(properties: SingleRecord): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      try {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200)
          throw new Error("Failed with status " + xhr.status);

        var obj = JSON.parse(xhr.responseText);
        postResult({
          id: obj.id,
          userId: obj.userId,
          title: obj.title,
          completed: obj.completed,
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    };

    if (typeof properties["id"] !== "number")
      throw new Error('properties["id"] is not of type number');
    xhr.open(
      "GET",
      "https://jsonplaceholder.typicode.com/todos/" +
        encodeURIComponent(properties["id"])
    );
    xhr.setRequestHeader("test", "test value");
    xhr.send();
  });
}

function onexecuteTodoGetWithParams(parameters: SingleRecord): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      postResult({
        id: parameters["pid"],
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
