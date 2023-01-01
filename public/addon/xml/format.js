let xmlFmtContext = {
    inputText: "",
    outputText: ""
}

var minifyXML = (xmlString) => {
    var obj = new DOMParser().parseFromString(xmlString, "text/xml");

    var minified = "<?xml"
    if (obj.xmlVersion) {
        minified += " version=\"" + obj.xmlVersion + "\"";
    }
    if (obj.xmlEncoding) {
        minified += " encoding=\"" + obj.xmlEncoding + "\"";
    }
    minified += "?>";

    function minifyNode(node) {
        if (!node) {
            return;  
        }

        switch (node.nodeType) {
            case 1:
              minified += "<" + node.nodeName;

              if (node.attributes !== undefined) {
                  for (var i = 0; i < node.attributes.length; i++) {
                    minified += " " + node.attributes[i].name + "=\"" + node.attributes[i].value + "\"";
                  }
              }

              if (node.childNodes.length === 0) {
                minified += "/>";
              } else {
                minified += ">";

                for (var i = 0; i < node.childNodes.length; i++) {
                    minifyNode(node.childNodes[i]);
                }
                minified += "</" + node.nodeName + ">";
              }
              break;
            case 3: // Text node
              // Add the text and newline
              minified += node.nodeValue.trim();
              break;
            case 8: // Comment node
              // Add the comment and newline
              minified += "<!--" + node.nodeValue + "-->";
              break;
        }
    }

    for (i = 0; i < obj.childNodes.length; i++) {
        minifyNode(obj.childNodes[i], 0)
    }
    return minified;
}

var formatXml = (xmlString) => {
    minified = minifyXML(xmlString);
    console.log("minified: ", minified);
    // Parse XML string into an object
    var obj = new DOMParser().parseFromString(minified, "text/xml");
  
    // Rebuild the formatted string with the XML declaration
    var formatted = "<?xml"
    if (obj.xmlVersion) {
        formatted += " version=\"" + obj.xmlVersion + "\"";
    }
    if (obj.xmlEncoding) {
        formatted += " encoding=\"" + obj.xmlEncoding + "\"";
    }
    formatted += "?>\n";
  
    // Recursively format the XML object
    function formatNode(node, indent) {
        if (!node) {
            return;
        }

        // Add indentation
        formatted += " ".repeat(indent * 2);
      
        // Check the node type
        switch (node.nodeType) {
          case 1: // Element node
            // Add the opening tag
            formatted += "<" + node.nodeName;
      
            // Add any attributes
            if (node.attributes !== undefined) {
                for (var i = 0; i < node.attributes.length; i++) {
                    formatted += " " + node.attributes[i].name + "=\"" + node.attributes[i].value + "\"";
                }
            }
      
            // Check if the node has any children
            if (node.childNodes.length === 0) {
              // If not, add a closing slash and newline
              formatted += "/>\n";
            } else {
              // If it does, add a closing angle bracket and newline
              formatted += ">\n";
      
              // Recursively format each child node
              for (var i = 0; i < node.childNodes.length; i++) {
                formatNode(node.childNodes[i], indent + 1);
              }
      
              // Add indentation and closing tag
              formatted += " ".repeat(indent * 2) + "</" + node.nodeName + ">\n";
            }
            break;
          case 3: // Text node
            // Add the text and newline
            formatted += node.nodeValue + "\n";
            break;
          case 8: // Comment node
            // Add the comment and newline
            formatted += "<!--" + node.nodeValue + "-->\n";
            break;
        }
    }
      
    // Call the recursive function to format the root node
    for (i = 0; i < obj.childNodes.length; i++) {
        formatNode(obj.childNodes[i], 0)
    }

    // Return the formatted XML string
    return formatted;
}

var onInputChangeHandler = () => {
    xmlFmtContext.inputText = document.getElementById("xmlInputTextBox").value;
}

var renderOutputCommonPart = (outputText) => {
    try {
        // set pre & code label per highlight.js requirements
        document.getElementById("xmlOutputTextBox").innerHTML = '<pre id="xmlOutputPre"><code class="xml">' + outputText + "</code></pre>";

        var el = document.querySelector('.xml');
        esc = _.escape(el.innerHTML);
        // Reasign escaped to node and initialize highlight.js
        el.innerHTML = esc;
        hljs.highlightElement(el);
        xmlFmtContext.outputText = outputText;
        
        // fix the margin and padding of pre & code
        preLabels = document.getElementsByTagName("pre");
        for (var i = 0; i < preLabels.length; i++) {
            preLabels[i].style.margin = "0px 0px 0px 0px";
        }
        codeLabels = document.getElementsByTagName("code");
        for (var i = 0; i < preLabels.length; i++) {
            codeLabels[i].style.padding = "0px 0px 0px 0px";
        }

        console.log(document.getElementById("xmlOutputTextBox").innerHTML);
    } catch (error) {
        console.error(error);
        document.getElementById('xmlOutputTextBox').innerHTML = "INVALID XML CONTENT";
    }
}

var onMinifyClickHandler = () => {
    minifiedValue = minifyXML(xmlFmtContext.inputText);
    console.log(minifiedValue);
    renderOutputCommonPart(minifiedValue);
    document.getElementById("xmlOutputPre").style.whiteSpace = "normal";
}

var onFormatClickHandler = () => {
    formattedValue = formatXml(xmlFmtContext.inputText);
    console.log(formattedValue);
    renderOutputCommonPart(formattedValue);
    document.getElementById("xmlOutputPre").style.whiteSpace = "pre";
}

var onClearClickHandler = () => {
    xmlFmtContext.outputText = "";
    document.getElementById("xmlOutputTextBox").value = xmlFmtContext.outputText;
    document.getElementById("xmlOutputTextBox").innerHTML = "";
}

var onCopyHandler = () => {
    try {
        let temp = document.createElement('textarea');
        temp.value = xmlFmtContext.outputText;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        alert("Copied!");
    } catch (error) {
        console.error(error);
        alert("Copy failed! Please check console log for details");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('minifyBtn').addEventListener('click', onMinifyClickHandler);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formatBtn').addEventListener('click', onFormatClickHandler);
});

document.getElementById("xmlInputTextBox").onchange = function () {
    console.log("on xmlInputTextBox change");
    onInputChangeHandler();
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('clearBtn').addEventListener('click', onClearClickHandler);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copyBtn').addEventListener('click', onCopyHandler);
});
