// JavaScript to obfuscate email
const emailUser = "support";
const emailDomain = "jsonutil.com";
const emailLink = `<a href="mailto:${emailUser}@${emailDomain}">${emailUser}@${emailDomain}</a>`;
document.getElementById("contact-email").innerHTML = emailLink;


function processJSON() {
    const input = document.getElementById('jsonFixerInput').value;
    const fixesContainer = document.getElementById('fixesContainer');
    const outputJsonContainer = document.getElementById('fixedJSON');
  
    // Reset UI
    fixesContainer.innerHTML = '';
    outputJsonContainer.textContent = '';
  
    let fixedString = input;
    const corrections = [];
    let iterationCount = 0;
  
    // Apply fixes iteratively up to 10 times
    while (iterationCount < 10) {
      const originalString = fixedString;
  
      // Step 1: Replace single quotes with double quotes for keys and values
      fixedString = fixedString.replace(/'([^']*)'/g, (match, p1, offset) => {
        corrections.push({
          description: `Replaced single quotes around "${p1}" with double quotes.`,
          original: match,
          fixed: `"${p1}"`,
          offset,
        });
        return `"${p1}"`;
      });
  
      // Step 2: Add missing quotes around unquoted keys
      fixedString = fixedString.replace(/(\b[a-zA-Z_]\w*\b)(?=\s*:)/g, (match, offset) => {
        corrections.push({
          description: `Added quotes around key "${match}".`,
          original: match,
          fixed: `"${match}"`,
          offset,
        });
        return `"${match}"`;
      });
  
      // Step 3: Fix unclosed strings and trailing invalid characters
      fixedString = fixedString.replace(/"([^"]*)([^"]*)$/, (match, p1, p2, offset) => {
        const cleanedValue = p1.replace(/[^a-zA-Z0-9\s]/g, '').trim(); // Remove invalid characters
        corrections.push({
          description: `Closed unclosed string starting at position ${offset}.`,
          original: match,
          fixed: `"${cleanedValue}"`,
          offset,
        });
        return `"${cleanedValue}"`;
      });
  
      // Step 4: Remove trailing commas
      fixedString = fixedString.replace(/,\s*([}\]])/g, (match, p1, offset) => {
        corrections.push({
          description: `Removed trailing comma before "${p1}".`,
          original: match,
          fixed: p1,
          offset,
        });
        return p1;
      });
  
      // Step 5: Balance braces and brackets
      const unclosedFix = fixUnclosedBracesOrBrackets(fixedString);
      if (unclosedFix.added) {
        corrections.push({
          description: `Added missing closing braces or brackets.`,
          original: '',
          fixed: unclosedFix.added,
          offset: fixedString.length,
        });
        fixedString += unclosedFix.added;
      }
  
      // Stop if no changes were made
      if (originalString === fixedString) break;
  
      iterationCount++;
    }
  
    // Display corrections
    corrections.forEach((correction, index) => {
      const correctionElement = document.createElement('div');
      correctionElement.className = 'correction';
      correctionElement.innerHTML = `
        <p><strong>Fix:</strong> ${correction.description}</p>
        <p><strong>Original:</strong> <code>${correction.original}</code></p>
        <p><strong>Fixed:</strong> <code>${correction.fixed}</code></p>
      `;
      fixesContainer.appendChild(correctionElement);
    });
  
    // Validate final JSON
    try {
      const parsedJSON = JSON.parse(fixedString);
      outputJsonContainer.textContent = JSON.stringify(parsedJSON, null, 2);
    } catch (error) {
      outputJsonContainer.textContent = `Error: Unable to parse JSON. Please review the corrections or fix manually.`;
      console.error('Parsing Error:', error.message);
      console.error('Malformed JSON Input:', fixedString);
    }
  }
  
  // Helper function to balance braces and brackets
  function fixUnclosedBracesOrBrackets(jsonStr) {
    const openBraces = { '{': '}', '[': ']' };
    const closeBraces = { '}': '{', ']': '[' };
    const stack = [];
    const additions = [];
  
    for (const char of jsonStr) {
      if (openBraces[char]) {
        stack.push(char);
      } else if (closeBraces[char]) {
        if (stack.length > 0 && stack[stack.length - 1] === closeBraces[char]) {
          stack.pop();
        } else {
          return { added: '', valid: false };
        }
      }
    }
  
    while (stack.length > 0) {
      const openBrace = stack.pop();
      additions.push(openBraces[openBrace]);
    }
  
    return { added: additions.join(''), valid: true };
  }
    





function toggleDetails(str) {
    const details = document.getElementById(str + 'Details');
    const button = document.getElementById(str + 'ToggleDetails');
    if (details.style.display === 'none') {
        details.style.display = 'block';
        button.textContent = '[See less]';
    } else {
        details.style.display = 'none';
        button.textContent = '[See more]';
    }
}

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
    const jsonInput = document.getElementById("jsonToXMLInput").value;
    const outputElement = document.getElementById("xmlOutput");

    try {
        const json = JSON.parse(jsonInput);

        // Recursive function to convert JSON to XML
        function jsonToXML(obj, rootName = "root") {
            let xml = `<${rootName}>`;

            for (let key in obj) {
                if (Array.isArray(obj[key])) {
                    // Properly handle arrays
                    obj[key].forEach(item => {
                        if (typeof item === "object") {
                            // If array item is an object, process it recursively
                            xml += jsonToXML(item, key);
                        } else {
                            // If array item is a primitive (string, number, boolean), wrap it in <item> tags
                            xml += `<item>${escapeXML(item)}</item>`;
                        }
                    });
                } else if (typeof obj[key] === "object" && obj[key] !== null) {
                    // Handle nested objects
                    xml += jsonToXML(obj[key], key);
                } else {
                    // Handle primitive values (strings, numbers, booleans)
                    xml += `<${key}>${escapeXML(obj[key])}</${key}>`;
                }
            }

            xml += `</${rootName}>`;
            return xml;
        }

        // Function to escape special XML characters
        function escapeXML(value) {
            if (typeof value !== "string") return value;
            return value
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&apos;");
        }

        // Generate XML and escape it for browser display
        const xmlOutput = jsonToXML(json);
        const escapedXML = xmlOutput
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        outputElement.innerHTML = escapedXML;
    } catch (error) {
        // Display error message if JSON parsing fails
        outputElement.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
    }
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
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.innerText || element.textContent;

    navigator.clipboard.writeText(text)
        .then(() => {
            showToast("Copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;

    // Dynamically calculate the combined height of the header and navigation bar
    const headerHeight = document.querySelector('header').offsetHeight;
    const navBarHeight = document.querySelector('.navigation-banner').offsetHeight;
    const totalOffset = headerHeight + navBarHeight;

    // Apply dynamic positioning
    toast.style.top = `${totalOffset}px`;

    // Show the toast with animation
    toast.style.display = "block";
    toast.className = "show";

    // Remove the "show" class after 2 seconds to hide the toast
    setTimeout(() => {
        toast.className = "hide";
        setTimeout(() => {
            toast.style.display = "none";
        }, 500);
    }, 2000);
}

// Show button on scroll
window.onscroll = function () {
    const button = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
};

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}