
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
function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
function writeComment(){
	var commentContainer = document.getElementById("custom-comment");
	var cName = get("name");
	var cTitle = get("title");
	var cText = get("text");
	var fullCommentCode = '<div class="comment-item">' +
			'<div class="comment-desc">Tema:&nbsp</div><div class="comment-title">' + cTitle + '</div>' +
			'<div class="comment-desc">Comentario:&nbsp</div><div class="comment-text">' + cText + '</div>' +
			'<div class="comment-author">' + cName +'</div></div>';
	history.pushState("", "Proyecto WEB",location.pathname);
	if (typeof cName != 'undefined') {
		commentContainer.innerHTML = fullCommentCode.replace(/\+/g," ");
	} 
		
}

