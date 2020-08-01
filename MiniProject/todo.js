//Get card list div by id
let list=document.getElementById("cardlist"); 

//To fetch todos from localStorage and display in card list 
let todolist=localStorage.getItem('todolist'); 
todolist=todolist?JSON.parse(todolist):[];  

todolist.forEach(todo=>{ 
	//let todos=JSON.parse(todo);
	todoId=todo['id'];
	title=todo['title'];
	desc=todo['desc']; 

	let tit=document.createElement('h4'); 
	tit.setAttribute("style","font-weight:bold;"); 
	tit.innerHTML=title; 

	let des=document.createElement('p'); 
	des.id=todoId;
	let text=document.createTextNode(desc);
	let icon=document.createElement('i'); 
	icon.setAttribute('class','fa fa-trash');
	icon.id="delete"; 
	icon.addEventListener("click",del);
	des.appendChild(text);
	des.appendChild(icon);

	let container=document.createElement('div'); 
	container.classList.add('container'); 
	container.appendChild(tit);
	container.appendChild(des);
	
	let card=document.createElement('div'); 
	card.classList.add('card');  
	card.appendChild(container);  

	list.appendChild(card);
	}); 

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("create");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];  

//Get save button of modal
var save = document.getElementById("save"); 

//Get cancel button of Modal
var cancel = document.getElementById("cancel");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
	let title=document.getElementById("title");
	let desc=document.getElementById("desc"); 
	title.value=desc.value="";
    modal.style.display = "none";
}
//When the user clicks on cancel button, close the modal
cancel.onclick = function() {
  let title=document.getElementById("title");
  let desc=document.getElementById("desc"); 
  title.value=desc.value="";
  modal.style.display = "none";
}
//When the user clicks on save button, save todo in localStorage
save.onclick=function(){
	let title=document.getElementById("title");
	let desc=document.getElementById("desc"); 
	if(title.value.length!=0 && desc.value.length!=0)
	{
		let todolist=localStorage.getItem('todolist'); 
		todolist=todolist?JSON.parse(todolist):[]; 

		let id;
		if(todolist.length==0)
			{
				id=1;
			}
		else{
		   id=todolist[todolist.length-1].id+1;
		}

		let todo={};
		todo['id']=id;
		todo['title']=title.value;
		todo['desc']=desc.value; 
		title.value=desc.value="";
		todolist.push(todo); 
		localStorage.setItem('todolist',JSON.stringify(todolist)); 
		location.reload();
	}
	else{
		alert("Fields cannot be empty");
	}
}  

//When the user clicks on delete button, delete todo in database
function del(e)
{ 
	let delId=e.target.parentElement.id;
	let todolist=localStorage.getItem('todolist'); 
	todolist=todolist?JSON.parse(todolist):[];  
	todolist=todolist.filter(todo=> todo.id!=delId);
	localStorage.setItem('todolist',JSON.stringify(todolist));  
	console.log("deleted successfuly");
	setTimeout(()=>location.reload(),500); 
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) { 
  	let title=document.getElementById("title");
	let desc=document.getElementById("desc"); 
	title.value=desc.value="";
    modal.style.display = "none";
  }
}