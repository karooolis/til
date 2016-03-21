let get = (url) => {
	// Return a new promise.
	return new Promise((resolve, reject) => {
		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = () => {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200) {
				// Resolve the promise with the response text
				resolve(req.response);
			} else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}
		};

		// Handle network errors
		req.onerror = () => {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send();
	});
}

get('http://hipsterjesus.com/api/').then((response) => {
	console.log("Do something with the response! Perhaps use its value in making the next API call", response);

	return new Promise((resolve, reject) => {
		get('http://hipsterjesus.com/api/').then((response) => {
			console.log(response);
		});
	});
}).then((response) => {
	console.log("Second response!", response);
});