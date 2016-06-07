// Variables for selecting DOM elements
var taskInput=document.getElementById("input-add");
var addButton=document.getElementById("add-button");
var incompleteList=document.getElementById("current");
var completeList=document.getElementById("finished");

// New Task List Item
var createNewTaskElement=function(taskString){
		// Create List Item
		var listItem=document.createElement("li");
		// Create div item
		var div=document.createElement("div");
		// input(checkbox)
		var checkbox=document.createElement("input");
		// Label
		var label=document.createElement("label");
		// Input Text
		var editInput=document.createElement("input");
		// Edit Button
		var editButton=document.createElement("button");
		// Delete Button
		var deleteButton=document.createElement("button");

		// Modify list items
		checkbox.type="checkbox";
		editInput.type="text";

		editButton.innerText="Edit";
		editButton.className="edit";
		deleteButton.innerText="Delete";
		deleteButton.className="delete";

		label.innerText=taskString;

		// append items
		listItem.appendChild(checkbox);
		listItem.appendChild(label);
		listItem.appendChild(editInput);
		listItem.appendChild(div)
		div.appendChild(editButton);
		div.appendChild(deleteButton);
		return listItem
	}
//Adds a new task when add button clicked
var addTask = function(){
	console.log("add")
	if(taskInput.value.length >0){
		var listItem=createNewTaskElement(taskInput.value);
		// Append List Item to incompleteList
		incompleteList.appendChild(listItem);
		bindTaskEvents(listItem, taskComplete);
		taskInput.value = "";
	}
	
	}

// Edit an existing task
var editTask=function(){
	console.log("edit");
	var listItem=this.parentNode.parentNode;
	var editInput=listItem.querySelector("input[type=text]");
	var label=listItem.querySelector("label");

	var containsClass=listItem.classList.contains("editMode");

	if(containsClass){
		label.innerText=editInput.value;
	}else{
		editInput.value=label.innerText;
	}

		// Toggle Edit mode on the list item
		listItem.classList.toggle("editMode");
	}

// Delete an existing task
var deleteTask=function(){
	console.log("delete");
	var listItem=this.parentNode.parentNode;
	var ul=listItem.parentNode;
	ul.removeChild(listItem);
}

// Marks taska as complete
var taskComplete=function(){
	console.log("task complete")
	var listItem=this.parentNode;
	completeList.appendChild(listItem);
	bindTaskEvents(listItem,taskIncomplete);
}

// Marks task as incomplete 
var taskIncomplete=function(){
	console.log("task incomplete")
	var listItem=this.parentNode;
	incompleteList.appendChild(listItem);
	bindTaskEvents(listItem,taskComplete);
}

var bindTaskEvents = function(taskListItem, checkBoxeventHandler){
	console.log("Bacon and Eggs");
		// select list item children
		var checkBox=taskListItem.querySelector('input[type=checkbox]');
		var editButton=taskListItem.querySelector('div button.edit');
		var deleteButton=taskListItem.querySelector('div button.delete');
			// bind editTask to edit button
			editButton.onclick=editTask;
			// bind deleteTask to delete button
			deleteButton.onclick=deleteTask;
			// bind checkBoxEventHandler to checkbox
			checkBox.onchange=checkBoxeventHandler;
		}	
// Click handler for the addTask function
addButton.onclick=addTask;

taskInput.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode == 13) {
		addButton.click();
	}
});

// Cycle over incompleteList task items
for(var i=0;i<incompleteList.children.length;i++){
		//bind events to list items children
		bindTaskEvents(incompleteList.children[i],taskComplete);
	}
// Cycle over completeList task items
for(var i=0;i<completeList.children.length;i++){
		//bind events to list items children
		bindTaskEvents(completeList.children[i],taskIncomplete);
	}
