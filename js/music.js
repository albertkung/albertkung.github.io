$( "#media-main" ).load( "fragment/listen.html" );
document.getElementById("listen").addEventListener("click", Listen);
document.getElementById("download").addEventListener("click", Download);

function Listen(){
    document.getElementById("nav-listen").className = "";
    document.getElementById("nav-download").className = "active";
    $( "#media-main" ).load( "fragment/listen.html" );
}

function Download(){
    document.getElementById("nav-listen").className = "";
    document.getElementById("nav-download").className = "active";
    $( "#media-main" ).load( "fragment/download.html" );
}