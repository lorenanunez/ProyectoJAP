

document.addEventListener("DOMContentLoaded", function(e){
	/* En la entrega 1 quise hacer el desafíate con Google pero no me salió, así que 
	   lo revertí a como si no lo hubiera hecho. */
	var loginForm = document.getElementById("loginForm");
	loginForm.onsubmit = (e) => {
		var tbUser = document.getElementById("inputEmail");
		localStorage.setItem('user', tbUser.value);
	}
	
});