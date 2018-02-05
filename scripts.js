
$(document).ready(function () {
	// Add smooth scrolling to all links
	$("a").on('click', function (event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();
			// Store hash
			var hash = this.hash;
			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});
});


var audioVolume; /* Volumen de las voces */
var voices = document.getElementsByTagName("audio"); /* Cantidad de voces */
/*Comprobador de estado de reproduccion*/
function isPlaying(id) { 
	return !id.paused;
}
/*Control de volumen de las voces*/
function setVoicesVolume() {		
	audioVolume = document.getElementById("voiceVolume").value / 100;

	for (i = 0; i <= voices.length - 1 ; i++) {
		if (voices[i].id.indexOf("bg") == -1) { //Si no contiene "bg" en la ID
			voices[i].volume = audioVolume;
		}
	}			
}
/*Control de volumen de la música de fondo*/
function setBGVolume() {		
	audioVolume = document.getElementById("bgVolume").value / 100;
	var bgMusic = document.getElementById("bg-sound");
	bgMusic.muted = false;
	bgMusic.volume = audioVolume;
	if (audioVolume <= 0) {
		bgMusic.pause();
	} else {
		bgMusic.play();
	}

}	
/*Controlador de voces*/
function audioHandler(id){
	var audio = document.getElementById(id);
	/* para todas las voces excepto la especificada*/
	for (i = 0; i <= voices.length - 1 ; i++) {
		if (voices[i].id.indexOf("bg") == -1 && voices[i].id.indexOf(id) == -1) { //Si no contiene "bg" o la ID especificada en la ID
			voices[i].pause();
		}
	}	
	if (isPlaying(audio)) {
		audio.pause();
	} else {
		audio.currentTime=0;
		audio.play();
	}
}
/* Comentarios */
var commentCookie = getComments();
var commentsComment = new Array();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getComments(){
	commentsContent = getCookie(commentCookie);
	console.log("contenido cookie:" + commentsContent);
	setCookie(commentsContent, '{"comments" : [{"name": "Iván","title" : "Dejar espacio", "comment" : "Dejar espacio para comentar a los demas}]}', 365);
	if (commentsContent == "") {
		setCookie(commentsContent, '{"comments" : [{"name": "Iván","title" : "Dejar espacio", "comment" : "Dejar espacio para comentar a los demas}]}', 365);
	}
	console.log(commentsContent.comments[0].name);
}
function writeComments(){
	var comments = JSON.parse(commentCookie);
	var commentsHTML;
	var commentsContainer = document.getElementById("cookie-comments");
	getComments();
	console.log(Object.keys(comments).length);
	for (var i = 0; i < Object.keys(comments).length; i++) {
		commentsHTML = commentsHTML + '<div class="comment-desc">Tema:&nbsp</div><div class="comment-title">' + comments.comments[i].title + '</div>';
		commentsHTML = commentsHTML + '<div class="comment-desc">Comentario:&nbsp</div><div class="comment-text">' + comments.comments[i].comment + '</div>';
		commentsHTML = commentsHTML + '<div class="comment-author">' + comments.comments[i].name + '</div>';
	}
	commentsContainer.innerHTML = comments;
}

function setComments(){
	
}