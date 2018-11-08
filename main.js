let textBtn 	= document.getElementById('getText');	 // Get Text button
let jsonBtn 	= document.getElementById('getJson');	 // Get json button
let apiBtn 		= document.getElementById('getApi');	 // Get API button
let addPostForm	= document.getElementById('addPost');	 // Get AddPost form
let outputDiv	= document.getElementById('output');	 // Get output div

// Adding click event listener for GET TEXT BUTTON
textBtn.addEventListener('click', getText);

// Adding click event listener for GET JSON BUTTON
jsonBtn.addEventListener('click', getJson);

// Adding click event listener for GET JSON BUTTON
apiBtn.addEventListener('click', getApi);

// Adding submit event listener for ADD FORM
addPostForm.addEventListener('submit', addPost);

// getText function expression
function getText() {
	// fetch expression for extracting the contents of sample.txt file

	fetch('sample.txt')
		.then(res => res.text())
		.then(data => outputDiv.innerHTML = data)
		.catch(err => console.log(err))
}


// getJson function expression
function getJson() {
	// fetch expression for extracting the contents of users.json file

	fetch('users.json')
		.then(res => res.json())
		.then(data => {
			let result = '<h2 class="mb-4">Users</h2>';
			data.forEach(user => {
				result += `
				<ul class='list-group mb-4'>
				<li class='list-group-item'>ID: ${user['id']}</li>
				<li class='list-group-item'>Name: ${user['name']}</li>
				<li class='list-group-item'>Email: ${user['email']}</li>
				</ul>
				`
			})
			outputDiv.innerHTML = result;
		})
		.catch(err => console.log(err))
}


// getApi function expression
function getApi() {
	// fetch expression for extracting the contents posts from the https://jsonplaceholder.typicode.com/posts
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(res => res.json())
		.then(data => {
			let result = '<h2 class="mb-4">Posts</h2>';
			data.forEach(post => {
				if(post) {
					result += `
					<div class='card card-body mb-3' id='post'>
					<h3>${post['title']}</h3>
					<p>${post['body']}</p>
					</div>
					`
				}
			})
			outputDiv.innerHTML = result;
		})
		.catch(err => console.log(err))
}


// function expression for adding new post

function addPost(e) {
	e.preventDefault();

	let title	 = document.getElementById('title').value;
	let body	 = document.getElementById('body').value; 

	fetch('https://jsonplaceholder.typicode.com/posts',{
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({title: title, body: body})
	})
	.then(res => res.json())
	.then(data => console.log(data))
}