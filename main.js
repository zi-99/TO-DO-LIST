// setting up variables

let theInput = document.querySelector(".add-task input");
let theAddInput = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCompleted = document.querySelector(".tasks-completed span");
let allDelete = document.querySelector(".finish-delete .delete-all")
let allFinish = document.querySelector(".finish-delete .finish-all")
let taskContainer = []

//  focus On Input Field

window.onload = function () {
    theInput.focus();
}


// Function To Create No Tasks Message
function createNoTasks() {

    // Create Message Span Element
    let msgSpan = document.createElement("span");

    // Create Text Message
    let msgText = document.createTextNode("No Tasks To Show");

    // Add Text To Message Span element
    msgSpan.appendChild(msgText);

    // Add Class To Message Span
    msgSpan.className = 'no-tasks-message';

    // Append The Message Span Element TO The Task Container
    tasksContainer.appendChild(msgSpan);
}


// Function To Calculate Tasks
// function calculateTasks() {
//     let tasksCount = document.querySelector(".tasks-count span");

//     //Calculate Tasks
//     tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length; 

//     //Calculate Completed Tasks
//     tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finish").length; 
// }

// Calculate All Tasks
function calcAllTasks() {
    let tasksCount = document.querySelector(".tasks-count span");

    //Calculate Tasks
    tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;
}

// Calculate Finished Tasks
function calcFinishTask() {

    //Calculate Completed Tasks
    tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finish").length;
}

// Delete All Tasks

allDelete.addEventListener('click', function () {
    for (let i = 0; i < taskContainer.length; i++) {
        deleteTask(i, taskContainer.length);

        Swal.fire({
            icon: 'success',
            title: 'You Deleted All Tasks!'
        });
    }

    // Check Number Of Tasks Inside The Container
    if (tasksContainer.childElementCount == 0) {
        createNoTasks();
    }
    // Calc All Tasks
    calcAllTasks();
    // Calc Finished Tasks
    calcFinishTask();

})

// 
// Finish All Tasks
allFinish.addEventListener('click', function () {
    let Tasks = document.querySelectorAll('.tasks-content .task-box');
    Tasks.forEach(task => {
        task.classList.add('finish');
        Swal.fire({
            icon: 'success',
            title: 'You Finished All Tasks!'
        })
    });
    calcFinishTask();


})



if (localStorage.getItem("OurTasks") != null) {
    taskContainer = JSON.parse(localStorage.getItem("OurTasks"));
    displayTasks()
}




// Task Display
function displayTasks() {
    let container = ``;
    for (var i = 0; i < taskContainer.length; i++) {
        container += `<span class="task-box">${taskContainer[i]}
        <span class="delete" id= "${i}" >Delete</span>
         </span>`
    }
    if (container == '') {
        tasksContainer.innerHTML = ` <span class="no-tasks-message">No Tasks To Show</span> ` + container
    }
    else {

        tasksContainer.innerHTML = container;

    }

    calcFinishTask()
}


// Add Task
function addTask() {

    // Create Span Element
    let mainSpan = document.createElement("span");

    // Create Delete Button
    let deleteElement = document.createElement("span");

    // Create The Span Text
    let text = document.createTextNode(theInput.value);

    // Create The  Delete Button Text
    let deleteText = document.createTextNode("Delete");

    //  Add Text to span
    mainSpan.appendChild(text);

    //  Add Text to span
    mainSpan.className = 'task-box';

    // Add text To Delete Button
    deleteElement.appendChild(deleteText);

    // Add Class To Delete Button
    deleteElement.className = 'delete';

    // Add Delete Button To Span
    mainSpan.appendChild(deleteElement);

    // Add The Task to The Container
    tasksContainer.appendChild(mainSpan);

    // Empty The Input
    theInput.value = "";

    // focus on field
    theInput.focus();

    // Calculate Tasks
    calcAllTasks();
    calcFinishTask();

    // the sweet alert to success added task
    Swal.fire(
        'You Added New Task',
        ' ',
        'success'
    )

}

// Check If Tasks Exist
function checkValue() {

    const term = theInput.value;

    taskContainer.forEach(todo => {

        if (todo === term) {

            // Sweet Alert Express That Task Already Exist In Array
            swal.fire({
                icon: 'error',
                title: 'Task Already Exist!',
                text: 'Please, Enter Another Task.'
            });
            theInput.value = "";
            return;

        }
    })

    if (theInput.value != '') {

        // Add Tasks
        addTask();
        taskContainer.push(term);

        // To Add Task To LocalStorage
        localStorage.setItem('OurTasks', JSON.stringify(taskContainer));
        // Sweet Alert Express About Adding New Task
        Swal.fire({
            icon: 'success',
            title: 'You Added New Task!'
        })
        // Empty Field
        theInput.value = "";
    }

}


// delete Task
function deleteTask(index, count) {

    taskContainer.splice(index, count);
    localStorage.setItem('OurTasks', JSON.stringify(taskContainer));
    displayTasks();
    calcAllTasks();
    calcFinishTask()
}


//  Adding The Task
theAddInput.onclick = function () {

    // if input is empty

    if (theInput.value === "") {
        console.log(" No Value")

        // the sweet alert to error add text
        Swal.fire(
            'No Value To Add',
            'Please Add Text To The Input...',
            'error'
        )

    } else {

        let noTaskMsg = document.querySelector(".no-tasks-message");

        // check If Span With No Tasks Message Is Exist
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {
            // Remove No Tasks Msg
            noTaskMsg.remove();
        }

        // console.log(theInput.value);
        checkValue();
        calcAllTasks();
        theInput.focus();




    }
}
document.addEventListener('click', function (e) {

    // Delete Task
    if (e.target.className == 'delete') {

        // Delete Task
        let taskIndex = e.target.getAttribute('id')
        deleteTask(taskIndex, 1);

        // Remove Current Task
        // e.target.parentNode.remove()

        // the sweet alert to delete  task
        Swal.fire(
            'You Deleted This Tasks',
            ' ',
            'success'
        )

        // Check Number Of Tasks Inside The Container
        if (tasksContainer.childElementCount == 0) {

            createNoTasks();

        }
        // Calculate Tasks
        calcAllTasks();
        calcFinishTask();

    }




    // Finish task
    if (e.target.classList.contains("task-box")) {

        console.log("This Is Our Element");

        // Toggle Class Finish
        e.target.classList.toggle("finish");


        if (e.target.classList.contains("finish")) {
            // the sweet alert to finish  task
            Swal.fire(
                'You Finished This Task',
                ' ',
                'success'
            )
        } else {
            // the sweet alert to unfinish  task
            Swal.fire(
                'You Unfinished This Task',
                ' ',
                'success'
            )
        }


    }



    // Calculate Tasks
    calcAllTasks();
    calcFinishTask();
})

