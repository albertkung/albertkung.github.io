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
        parseLine(input)
    }
});

// Language parser

// Language syntax
var commands = ["display", "var", "list", "send", "secret"]; // all known commands
var terms = ["origin", "education", "age"];
var longInfo = ["Albert was raised in quiet suburbs of Lexington, a famous historical site outside of Boston.",
                "Albert studies at Cornell University in the wastelands of Ithaca, NY.",
                "Albert is 20 years old. His birthday is on December 26th; please send him something nice."];
var shortInfo = ["Lexington, MA", "Cornell University, College of Engineering", "20"];

// Global env
var env = {};

// Parses a single line
function parseLine(line) {
    for (var x = 0; x < commands.length; x++) {
        if (line.indexOf(commands[x]) == 0) {
            var fParen = line.indexOf("(");
            var lParen = line.indexOf(")");
            if (fParen != -1 && lParen != -1) {
                var par = line.substring(fParen+1, lParen);
                var args = par.split(",");
                // display
                if (x == 0) {
                    $("#exe").append(env[args[0]] + "<br>");
                }
                // var/get
                else if (x == 1) {
                    var e = line.indexOf("=");
                    var v = line.substring(3, e-1).trim();
                    if (args.length > 1) {
                        args[1] = args[1].trim();
                    }
                    env[v] = getObject(args[0].split('"').join("").trim(), args[1]);
                }
                // list
                else if (x == 2) {
                    $("#exe").append(terms + "<br>");
                }
            }
        }
    }
}

// Returns relevant object
function getObject(type, length) {
    console.log(type);
    for (var x = 0; x < terms.length; x++) {
        if (terms[x] == type) {
            var x = length == "true" ? longInfo[x] : shortInfo[x];
            return x + "\n";
        }
    }
    return "error: undefined type";
}