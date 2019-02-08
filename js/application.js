	"use strict"; //https://love2dev.com/blog/javascript-strict-mode/

	(() => {

	var deferredPrompt;
	var userAgent;

	function isIos () {
		// const userAgent = window.navigator.userAgent.toLocaleLowerCase();
		console.log('Valor: ', userAgent);
		return /iphone|ipad|ipod/.test(userAgent);
	}

	
	function isInStandaloneMode () {
		retunr ('standalone' in window.navigator) && (window.navigator.standalone);
	}
	

	window.addEventListener('beforeinstallprompt', function (e) {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		userAgent = window.navigator.userAgent.toLocaleLowerCase();

		showAddToHomeScreen();

	});

	function showAddToHomeScreen() {

		var a2hsBtn = document.getElementById("ad2hs");
		a2hsBtn.style.display = "flex";
		a2hsBtn.addEventListener("click", addToHomeScreen);
	}

	function addToHomeScreen() {

		if (deferredPrompt && !isIos()) {
			// Show the prompt
			deferredPrompt.prompt();

			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice
				.then(function (choiceResult) {

				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
					var a2hsBtn = document.getElementById("ad2hs");
					// hide our user interface that shows our A2HS button
					a2hsBtn.style.display = 'none';
				} else {
					console.log('User dismissed the A2HS prompt');
				}

				deferredPrompt = null;

			});
		} else if (isInStandaloneMode() && isIos()) {
			window.alert('Sucesso!!!');
		}
	}

	showAddToHomeScreen();

	window.addEventListener('appinstalled', function (evt) {
		console.log('a2hs', 'installed');
	});


	})();