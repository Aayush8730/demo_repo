const inputButton  = document.getElementById("input");
const addButton = document.getElementById("addButton");
const displayBlock = document.getElementById("display-tasks");


let taskArray = [];
localStorage.setItem("tasks",JSON.stringify(taskArray))
taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

let recentTask = "";

inputButton.addEventListener('input',(e)=>{
     recentTask = e.target.value;
})



function displayTasks(){
  displayBlock.innerHTML = "";
   taskArray.forEach((task,index)=>{
     const taskDiv = document.createElement("div");
     taskDiv.textContent = task;

     const delBtn = document.createElement("button");
     delBtn.textContent = "delete";

    delBtn.onclick = () =>{
       taskArray.splice(index,1);
       localStorage.setItem("tasks" , JSON.stringify(taskArray));
       displayTasks();
    }
    taskDiv.appendChild(delBtn);
    displayBlock.appendChild(taskDiv);
   })
}

addButton.addEventListener('click',()=>{
     if(recentTask.trim()!= ""){
         taskArray.push(recentTask);
         localStorage.setItem("tasks" , JSON.stringify(taskArray))
         displayTasks();
         inputButton.value = ""
     }
})
