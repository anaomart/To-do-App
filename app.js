let input = document.querySelector(".input");
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks');
let i = 0
    // Empty ARray to store the tasks
let arrayOfTasks = [];
// check if there  task in local strage 
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


getDataFromLocalStorage();
//add task

submit.onclick = function() {
        if (input.value !== "") {
            addTaskToArry(input.value) // Add Task to array of tasks;
            input.value = ""; // Empty input Field 
        }
    }
    //Click on task Element 
taskDiv.addEventListener("click", e => {
    if (e.target.classList.contains("del")) {
        //remove the element fomr the page 
        e.target.parentElement.remove()
        deleteTaskWIth(e.target.parentElement.getAttribute("data-id"))
    }
    // Task Element 
    if (e.target.classList.contains("task")) {
        //toggle complete for the task 
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        //toggle done class
        e.target.classList.toggle("done");
    }
})

function addTaskToArry(taskText) {
    // Task Data 

    const task = {
            id: Date.now(), // uniqe id and to know the data that add in 
            title: taskText,
            completed: false,
        }
        // push task to array of tasks 
    arrayOfTasks.push(task)
        //Add Tasks to page 
    addElementsToPageFrom(arrayOfTasks);
    // add data to localstorage
    addDataToLocalStorageFrom(arrayOfTasks);


}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty task div
    taskDiv.innerHTML = "";

    //looping on array of tasks
    arrayOfTasks.forEach(task => {
        //create the main Div 
        let div = document.createElement("div");
        div.className = ("task");
        if (task.completed) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title))
            //create the delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        //Append Button to Main div 
        div.appendChild(span)
            //Add Task to task Container 
        taskDiv.appendChild(div)


    })
}

function addDataToLocalStorageFrom(arrayOfTask) {

    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTask))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWIth(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}


function DeleteAll() {
    taskDiv.innerHTML = "";
    localStorage.clear()
}

input.addEventListener("focus", function(e) {
    e.target.onEnter = function() {
        console.log("bb")
    }
})
