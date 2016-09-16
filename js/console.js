// Auto-size the console textarea
function h(e) {
    $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
}
$("textarea").each(function() {
    h(this);
    }).on('input', function() {
        h(this);
});

// Help/execute modals
var helpModal = document.getElementById('help-modal');
var exeModal = document.getElementById('exe-modal');
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
    else if (event.target == exeModal) {
        exeModal.style.display = "none";
    }
}
$("#execute").click(function() {
    $("#exe").html(""); // i want everybody to clear the area right now
    var input = $("textarea").val().split("\n");
    var env = {};
    for (var x = 0; x < input.length; x++) {
        parseLine(env, input[x].trim());
    }
    exeModal.style.display = "block";
});

// Language parser

// Parses a single line
function parseLine(env, line) {
    var commands = ["display", "var", "send", "secret"]; // all known commands
    for (var x = 0; x < commands.length; x++) {
        if (line.indexOf(commands[x]) == 0) {
            var fParen = line.indexOf("(");
            var lParen = line.indexOf(")");
            if (fParen != -1 && lParen != -1) {
                var par = line.substring(fParen+1, lParen);
                var args = par.split(",");
                if (x == 0) {
                    $("#exe").append(env[args[0]] + "\n"); // displays content object
                }
                else if (x == 1) {
                    var e = line.indexOf("=");
                    var v = line.substring(3, e-1).trim();
                    if (args.length > 1) {
                        args[1] = args[1].trim();
                    }
                    env[v] = getObject(args[0].split('"').join("").trim(), args[1]);
                }
            }
        }
    }
}

var terms = ["origin"];
var longInfo = ["Albert was raised in quiet suburbs of Lexington, a famous historical site outside of Boston.\n"];
var shortInfo = ["Lexington, MA\n"];
// Returns relevant object
function getObject(type, length) {
    for (var x = 0; x < terms.length; x++) {
        if (terms[x] == type) {
            return length == "true" ? longInfo[x] : shortInfo[x];
        }
    }
    return "error: undefined type";
}