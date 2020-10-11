
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var user = firebase.auth().currentUser;
		if (user != null) {
			localStorage.setItem("user", user.email);
			localStorage.setItem("photo", user.photoURL);
		} else {
			localStorage.clear();
		}
	} else {
		
	}
});


document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("frmLogin").addEventListener("submit", function(evt) {
		evt.preventDefault();
		
		let user = document.getElementById("tbUsername").value;
		let pass = document.getElementById("tbPassword").value;
		
		firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
			
			var errorCode = error.code;
			var errorMessage = error.message;
			
			window.alert("Error: " + errorMessage);

		});
		
	});
});