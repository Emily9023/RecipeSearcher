console.log('parsing starting');
// Get the page title
var pageTitle = document.getElementById('article-heading_1-0');
if (pageTitle) {
	pageTitle = pageTitle.innerHTML
	console.log("title")
	console.log(pageTitle)
} else {
	pageTitle = ""
}

// Create an array to hold the ingredient names
var ingredientList = [];

// Get the ingredients
var ul = document.getElementsByClassName('mntl-structured-ingredients__list')[0];
if (ul) {
	var items = ul.querySelectorAll("li");
	if (items) {
		for (var i = 0; i < items.length; ++i) {
			// Get the element with the data-ingredient-name attribute
			var ingredientName = items[i].querySelector('span[data-ingredient-name="true"]');
	
			if (ingredientName) {
        var ingredient = ingredientName.innerHTML.replace(/\s*\(Optional\)\s*/i, '').split(",")[0].split("(")[0]
        
				// Add the ingredientName to the ingredientList array
				ingredientList.push(ingredient);
				console.log(ingredient)
	
			} else {
					console.log('Element not found.');
			}
		}
	} else {
		console.log('li not found');
	}
} else {
	console.log('ul not found');
}
console.log("sending")

chrome.runtime.sendMessage(
  { 
    action: 'update_popup', 
    data: {
      ingredients: ingredientList, 
      title: pageTitle, 
      url: window.location.href
    }
  });



// // Add an event listener to the button
// document.getElementById('sendDataButton').addEventListener('click', function () {
// 	console.log("button clicked")
// 	// Retrieve the data you want to send
// 	var data = storedData;

// 	// Send an HTTP request to your Python server
// 	fetch('http://127.0.0.1:5000/receive-recipe-data', {
// 			method: 'POST',
// 			headers: {
// 					'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(data),
// 	})
// 			.then(response => response.json())
// 			.then(result => {
// 					console.log('Data sent successfully:', result);
// 			})
// 			.catch(error => {
// 					console.error('Error sending data:', error);
// 			});
// });
