// Intro commands
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
var commands = ["display", "var", "list", "send", "secret"]; // all known commands
var terms = ["origin", "education", "age", "interests"];
var info = ["Albert was raised in quiet suburbs of Lexington, a famous historical site outside of Boston.",
                "Albert studies CS at Cornell University in the wastelands of Ithaca, NY.",
                "Albert is 20 years old. His birthday is on December 26th. Please send him something nice.",
                "Mobile and web development, OCaml, music, video games, and more"];
var help =  "Available commands: \n" +
            "    display [infoType] - displays specified info about myself\n" + 
            "    list - lists available info\n" +
            "    send [message] - sends message\n" +
            "    [secret] - xd";

// Global env
var env = {};

// Parses a single line
function parseLine(line) {
    var output = $("#console-output");
    var split = line.split(" ");
    switch(split[0].toLowerCase()) {
        case "":
            break;
        case "help":
            output.append("\n" + help);
            break;
        case "display":
            if (split.length < 2) {
                output.append("\nWhat do you want to know?");
            }
            else {
                var obj = getInfo(split[1].toLowerCase());
                output.append("\n" + obj);
            }
            break;
        case "list":
            output.append("\n" + terms);
            break;
        case "send":
            output.append("\nNot implemented yet");
            break;
        default:
            output.append("\nI don't understand. Try \"help\" for help");
    }
    output.scrollTop(output[0].scrollHeight - output.height());
}

// Returns relevant object
function getInfo(type) {
    for (var x = 0; x < terms.length; x++) {
        if (terms[x] == type) {
            return info[x];
        }
    }
    return "Unknown type";
}