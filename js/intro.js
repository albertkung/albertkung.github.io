var my_text = "^^^^^^Hello world! ^^^^^^My name is Albert.^^ Welcome to my website :)";
var max_length = my_text.length;

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