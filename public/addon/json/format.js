let jsonFmtContext = {
    inputText: "",
    outputText: ""
}

var minifyJSON = (jsonString) => {
    try {
        parsedStr = JSON.parse(jsonString);
        minified = JSON.stringify(parsedStr, null, 0);
        return minified;
    } catch (error) {
        console.error(error);
        return "INVALID JSON INPUT";
    }
}

var formatJSON = (jsonString) => {
    try {
        parsedStr = JSON.parse(jsonString);
        formatted = JSON.stringify(parsedStr, null, 2);
        return formatted;
    } catch (error) {
        console.error(error);
        return "INVALID JSON INPUT";
    }
}

var onInputChangeHandler = () => {
    jsonFmtContext.inputText = document.getElementById("jsonInputTextBox").value;
}

var renderOutputCommonPart = (outputText) => {
    try {
        // set pre & code label per highlight.js requirements
        document.getElementById("jsonOutputTextBox").innerHTML = '<pre id="jsonOutputPre"><code class="json">' + outputText + "</code></pre>";

        var el = document.querySelector('.json');
        esc = _.escape(el.innerHTML);
        // Reasign escaped to node and initialize highlight.js
        el.innerHTML = esc;
        hljs.highlightElement(el);
        jsonFmtContext.outputText = outputText;
        
        // fix the margin and padding of pre & code
        preLabels = document.getElementsByTagName("pre");
        for (var i = 0; i < preLabels.length; i++) {
            preLabels[i].style.margin = "0px 0px 0px 0px";
        }
        codeLabels = document.getElementsByTagName("code");
        for (var i = 0; i < preLabels.length; i++) {
            codeLabels[i].style.padding = "0px 0px 0px 0px";
        }

        console.log(document.getElementById("jsonOutputTextBox").innerHTML);
    } catch (error) {
        console.error(error);
        document.getElementById('jsonOutputTextBox').innerHTML = "INVALID JSON INPUT";
    }
}

var onMinifyClickHandler = () => {
    minifiedValue = minifyJSON(jsonFmtContext.inputText);
    console.log(minifiedValue);
    renderOutputCommonPart(minifiedValue);
    document.getElementById("jsonOutputPre").style.whiteSpace = "normal";
    document.getElementById("jsonOutputPre").style.overflowWrap = "break-word";
}

var onFormatClickHandler = () => {
    formattedValue = formatJSON(jsonFmtContext.inputText);
    console.log(formattedValue);
    renderOutputCommonPart(formattedValue);
    document.getElementById("jsonOutputPre").style.whiteSpace = "pre";
}

var onClearClickHandler = () => {
    jsonFmtContext.outputText = "";
    document.getElementById("jsonOutputTextBox").value = jsonFmtContext.outputText;
    document.getElementById("jsonOutputTextBox").innerHTML = "";
}

var onCopyHandler = () => {
    try {
        let temp = document.createElement('textarea');
        temp.value = jsonFmtContext.outputText;
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

document.getElementById("jsonInputTextBox").onchange = function () {
    console.log("on jsonInputTextBox change");
    onInputChangeHandler();
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('clearBtn').addEventListener('click', onClearClickHandler);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copyBtn').addEventListener('click', onCopyHandler);
});
