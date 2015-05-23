
// Most of this comes from the api.ai HTML useage example
// https://gist.github.com/ystrot/e799f338ab9849c90b04

var baseUrl = "https://api.api.ai/v1/";

$(document).ready(function() {
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $("#rec").click(function(event) {
        switchRecognition();
    });
});

var recognition;

function startRecognition() {
    
    recognition = new webkitSpeechRecognition();
    
    recognition.onstart = function(event) {
        updateRec();
    };
    
    recognition.onresult = function(event) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        stopRecognition();
    };
    
    recognition.onend = function() {
        stopRecognition();
    };
    
    recognition.lang = "en-US";
    
    recognition.start();

}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}

function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}

function setInput(text) {
    $("#input").val(text);
    send();
}

function updateRec() {
    //$("#rec").text(recognition ? "Stop" : "Speak");
}

function send() {
    var text = $("#input").val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "ocp-apim-subscription-key": subscriptionKey
        },
        data: JSON.stringify({ q: text, lang: "en" }),

        success: function(data) {
            var route = data.result.parameters.route;
            setResponse(JSON.stringify(data, undefined, 2));
            setTimeout(function() {
                if( route == 'home') {
                    window.location.href = '/';
                } else {
                    window.location.href = '/' + route;   
                }
            }, 200);
        },
        error: function() {
            setResponse("Internal Server Error");
        }
    });
    setResponse("Loading...");
}

function setResponse(val) {
    $("#response").text(val);
}