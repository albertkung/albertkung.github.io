var my_text = "^^^^Hello world! ^^^^^^My name is Albert.^^ Welcome to my website :)@";
var max_length = my_text.length;
var canExecute = false;

function animeme() {
    var pos = 0;
    var id = setInterval(frame, 50);
    function frame() {
        if (pos == max_length) {
            clearInterval(id);
        }
        else if (my_text.charAt(pos) == '^') {
            clearInterval(id);
            sleep(50).then(() => {
                pos++;
                id = setInterval(frame, 50);
            })
        }
        else if (my_text.charAt(pos) == "@") {
            canExecute = true;
            pos++;
        }
        else {
            $("#console-output").append(my_text.charAt(pos));
            pos++;
        }
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

animeme();

// Help/execute modals
var helpModal = document.getElementById('help-modal');
$("#help").click(function() {
    helpModal.style.display = "block";
});
$("#close-help").click(function() {
    helpModal.style.display = "none";
});
window.onclick = function(event) {
    if (event.target == helpModal) {
        helpModal.style.display = "none";
    }
}

// Upon line input
$("#console-input").keydown(function(e){
    if (e.keyCode == 13) {
        e.preventDefault();
        var input = $("#console-input").val();
        $("#console-input").val(""); // i want everybody to clear the area right now
        if (canExecute) {
            parseLine(input.trim())
        }
    }
});

// Language
const terms = ["origins", "education", "age", "interests"];
const info = ["Albert was raised in the quiet suburbs of Lexington, a famous historical site outside of Boston.",
                "Albert graduated with a degree in CS from Cornell University in the wastelands of Ithaca, NY.",
                "Albert is 22 years old when this code was updated. His birthday is on December 26th. Please send him something nice.",
                "Mobile and web development, OCaml, music, video games, and more"];
const helpMsg =  "Try: \n" +
            "    display [something] - displays specified info about myself\n" +
            "    list - lists available info\n";
const errorMsg = "\nTry \"help\" for help";
const singleWordGreeting = ["hello", "hi"];
const singleWordQuestion = ["help", "list"];
const questionStart = ["what", "where", "when", "why", "how"];
const commandStart = ["display", "tell", "show"]

// Parses a single line
function parseLine(line) {
    var output = $("#console-output");
    var split = line.split(" ");
    var response = parseWord(split.shift().toLowerCase(), split);
    output.append(response);
    output.scrollTop(output[0].scrollHeight - output.height());
}

function parseWord(word, restOfLine) {
    if (singleWordGreeting.includes(word)) {
        return "\nhello there!";
    }
    else if (singleWordQuestion.includes(word)) {
        if (word == "help") {
            return ("\n" + helpMsg);
        }
        else if (word == "list") {
            return ("\n" + terms);
        }
    }
    else if (questionStart.includes(word)) {
        return "\n// TODO";
    }
    else if (commandStart.includes(word)) {
        console.log(restOfLine[0]);
        var response = getInfo(restOfLine[0]);
        if (response == "") {
            return errorMsg;
        }
        else {
            return "\n" + response;
        }
    }
    else {
        return errorMsg;
    }
}

// Returns relevant object
function getInfo(type) {
    for (var x = 0; x < terms.length; x++) {
        if (terms[x] == type) {
            return info[x];
        }
    }
    return "";
}