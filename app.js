document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to add a new task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};


// Function to update the task list in the DOM
const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ""}">
                    <div style="width:15px; height:15px; display: flex; align-items: center;"><input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/></div>
                    <p>${task.text}</p>
                </div>
                <div class="icons" style="display: flex;">
                    <img src="./edit.png" onClick="editTask(${index})"/>
                    <img src="./delete.png" onClick="deleteTask(${index})"/>
                </div>
            </div>
        `;
        
        //listItem.addEventListener("change", () => toggleTaskComplete(index));
        // Append the list item to the task list
        taskList.append(listItem);

        // Attach the change event listener to the checkbox
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
    });
    //updateStats();
};

// Add event listener to the submit button
document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    addTask();
});

// Function to toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    //console.log({ tasks });
    updateTasksList();
    updateStats();
    saveTasks();
};

// Implement editTask and deleteTask functions
const editTask = (index) => {
    // Your logic for editing a task
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks/totalTasks)*100;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerHTML = `${completedTasks}/${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks)
    {
        //while()
        {
            blastConfetti();
        }
        
    }
};

const blastConfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ["star"],
        });
      
        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ["circle"],
        });
      }
      
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
};