//This is a mock database
let posts = [];

//Represents the ID since JS lang ito at hindi mongoDB na naggegenerate ng id automatically
let count = 1;


//This function will show/display the posts 
const showPosts = (posts) => {
	
	//dito papasok lahat ng entries 
	let post_entries = ''

//this part loops or dindaanan nya lahat ng entries na to at inaassign nya isa-isa sa matching html 
	posts.forEach((post)=> {
		post_entries += `
			<div id="post-${post.id}">
			    <h3 id="post-title-${post.id}">${post.title}</h3>
			    <p id="post-body-${post.id}">${post.body}</p>
			    <button onclick="editPost('${post.id}')">Edit</button>
			    <button onclick="deletePost('${post.id}')">Delete</button>
			</div>
		`
	});

//then the post_entries will be assigned in "div-post-entries"
	document.querySelector('#div-post-entries').innerHTML = post_entries
}


// Add new posts
document.querySelector('#form-add-post').addEventListener('submit', (event) => {
	event.preventDefault()

	//addEventListener: kapag may nagpindot na sa submit button sa add-post na part ng form gagana na siya at mapupush na yung info from id, input na Title and body na Text area sa post array

	posts.push({
		id: count, 
		title: document.querySelector('#txt-title').value,
		body: document.querySelector('#txt-body').value
	});

	// For incrementing the ID to be unique for each new post 
	count++


	//call the posts in order to show the updated/added posts 
	showPosts(posts);
	alert('Successfully added a new Post!');

})

//editing a post
const editPost = (id) => {
    let title = document.querySelector(`#post-title-${id}`).innerHTML;
    let body = document.querySelector(`#post-body-${id}`).innerHTML;

    document.querySelector('#txt-edit-id').value = id;
    document.querySelector('#txt-edit-title').value = title;
    document.querySelector('#txt-edit-body').value = body;
}

//updating post
document.querySelector('#form-edit-post').addEventListener('submit', (e) => {
    e.preventDefault();

    for (let i = 0; i < posts.length; i++) {
        // The value posts[i].id is a Number while document.querySelector('#txt-edit-id').value is a String.
        // Therefore, it is necesary to convert the Number to a String first.

        if (posts[i].id.toString() === document.querySelector('#txt-edit-id').value) {
            posts[i].title = document.querySelector('#txt-edit-title').value;
            posts[i].body = document.querySelector('#txt-edit-body').value;
    
            showPosts(posts);
            alert('Successfully updated.');
            
            break;
        }
    }
});

//deleting post
const deletePost = (id)=>{
    document.querySelector(`#post-${id}`).addEventListener("click", (e)=>{
       e.preventDefault();
      
      for(let post of posts){
        if(post.id == id){
            posts.splice(posts.indexOf(post), 1)
        }
        showPosts(posts)
      }
    })
}