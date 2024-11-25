function validateJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    const resultElement = document.getElementById('result');
    try {
        JSON.parse(jsonInput);
        resultElement.textContent = "Valid JSON!";
        resultElement.style.color = "green";
    } catch (e) {
        resultElement.textContent = "Invalid JSON: " + e.message;
        resultElement.style.color = "red";
    }
}

function formatJSON() {
    const jsonFormatterInput = document.getElementById('jsonFormatterInput').value;
    const formattedJSONElement = document.getElementById('formattedJSON');
    try {
        const parsedJSON = JSON.parse(jsonFormatterInput);
        const formattedJSON = JSON.stringify(parsedJSON, null, 4);
        formattedJSONElement.textContent = formattedJSON;
        formattedJSONElement.style.color = "black";
    } catch (e) {
        formattedJSONElement.textContent = "Invalid JSON: " + e.message;
        formattedJSONElement.style.color = "red";
    }
}

function minifyJSON() {
    const jsonMinifierInput = document.getElementById('jsonMinifierInput').value;
    const minifiedJSONElement = document.getElementById('minifiedJSON');
    try {
        const parsedJSON = JSON.parse(jsonMinifierInput);
        const minifiedJSON = JSON.stringify(parsedJSON);
        minifiedJSONElement.textContent = minifiedJSON;
        minifiedJSONElement.style.color = "black";
    } catch (e) {
        minifiedJSONElement.textContent = "Invalid JSON: " + e.message;
        minifiedJSONElement.style.color = "red";
    }
}

function convertJSONToXML() {
    const jsonToXMLInput = document.getElementById('jsonToXMLInput').value;
    const xmlOutputElement = document.getElementById('xmlOutput');
    try {
        const parsedJSON = JSON.parse(jsonToXMLInput);
        const xml = jsonToXML(parsedJSON);
        xmlOutputElement.textContent = xml;
        xmlOutputElement.style.color = "black";
    } catch (e) {
        xmlOutputElement.textContent = "Invalid JSON: " + e.message;
        xmlOutputElement.style.color = "red";
    }
}

function jsonToXML(json) {
    let xml = '';
    for (let prop in json) {
        if (json.hasOwnProperty(prop)) {
            if (Array.isArray(json[prop])) {
                for (let arrayElem of json[prop]) {
                    xml += `<${prop}>`;
                    xml += jsonToXML(arrayElem);
                    xml += `</${prop}>`;
                }
            } else if (typeof json[prop] === 'object') {
                xml += `<${prop}>`;
                xml += jsonToXML(json[prop]);
                xml += `</${prop}>`;
            } else {
                xml += `<${prop}>${json[prop]}</${prop}>`;
            }
        }
    }
    return xml;
}

function diffJSON() {
    const jsonDiffInput1 = document.getElementById('jsonDiffInput1').value;
    const jsonDiffInput2 = document.getElementById('jsonDiffInput2').value;
    const jsonDiffOutputElement = document.getElementById('jsonDiffOutput');
    try {
        const obj1 = JSON.parse(jsonDiffInput1);
        const obj2 = JSON.parse(jsonDiffInput2);
        const differences = findDifferences(obj1, obj2);
        jsonDiffOutputElement.textContent = JSON.stringify(differences, null, 4);
        jsonDiffOutputElement.style.color = "black";
    } catch (e) {
        jsonDiffOutputElement.textContent = "Invalid JSON: " + e.message;
        jsonDiffOutputElement.style.color = "red";
    }
}

function findDifferences(obj1, obj2) {
    const diff = {};
    for (const key in obj1) {
        if (!obj2.hasOwnProperty(key)) {
            diff[key] = { type: 'removed', value: obj1[key] };
        } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
            diff[key] = { type: 'changed', from: obj1[key], to: obj2[key] };
        }
    }
    for (const key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            diff[key] = { type: 'added', value: obj2[key] };
        }
    }
    return diff;
}
