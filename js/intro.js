var my_text = "^^^^^^Hello world! ^^^^^^^^My name is Albert Kung.^^ Welcome to my website.^^^^ It is still under construction,^ but feel free to take a look around.";
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
            sleep(150).then(() => {
                pos++;
                id = setInterval(frame, 50);
            })
        }
        else {
            $("#intro").append(my_text.charAt(pos));
            pos++;
        }
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

animeme();