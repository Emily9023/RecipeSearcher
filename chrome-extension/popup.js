let storedData = null;

// Function to send the stored data
function sendStoredData() {
  if (storedData) {
    // Perform actions with the storedData
    console.log('Data received:', storedData);

    // Optionally, send the data to a server or update the popup, etc.
  } else {
    console.log('No data available.');
  }
}

// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
  chrome.tabs.executeScript({
    file: 'payload.js'
  });

});

// document.addEventListener('DOMContentLoaded', function () {
//   console.log('DOM is ready');
//   const button = document.getElementById('sendDataButton');
//   console.log('Button element:', button);

//   if (button) {
//     button.addEventListener('click', function () {
//       console.log('Button clicked');
//       // Your code here
//     });
//   } else {
//     console.log('Button element not found');
//   }
// });

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log("listening to message from payload.js")
	if (message) {
		storedData = message.data;
	}
  // Check if the message contains a 'title' property
  if (storedData.title) {
    document.getElementById('pagetitle').innerHTML = "Title: " + storedData.title;
  }
  
  if (storedData.ingredients) {
    // Create a new unordered list element
    var ul = document.createElement('ul');

    // Loop through the array and create list items for each item
    storedData.ingredients.forEach(function (itemText) {
      var li = document.createElement('li');
      li.textContent = itemText; // Set the text content of the list item
      ul.appendChild(li); // Append the list item to the unordered list
    });

    document.getElementById('ingredients').innerHTML = "Ingredients: \n ";
    
    // Append the entire unordered list to a container element in the DOM
    var container = document.getElementById('ingredients'); // Replace 'container' with the ID of your container element
    container.appendChild(ul);
  }

  if (storedData.url) {
    document.getElementById('url').innerHTML = "Website: " + storedData.url;
  }

	//button stuff
	const button = document.getElementById('sendDataButton');
  console.log('Button element:', button);

  if (button) {
    button.addEventListener('click', function () {
      console.log('Button clicked');
      // Retrieve the data you want to send
			var data = storedData;

			// Send an HTTP request to your Python server
			fetch('http://127.0.0.1:5000/receive-recipe-data', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
			})
					.then(response => response.json())
					.then(result => {
							console.log('Data sent successfully:', result);
					})
					.catch(error => {
							console.error('Error sending data:', error);
					});
    	});
  } else {
    console.log('Button element not found');
  }

});

