// ====== Modo Escuro ======
const toggleDark = document.getElementById("toggleDarkMode");
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDark.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ====== Pomodoro ======
let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");

let time = 25 * 60;
let countdown;
let running = false;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    countdown = setInterval(() => {
      time--;
      updateDisplay();
      if (time <= 0) {
        clearInterval(countdown);
        alert("Tempo encerrado! Faça uma pausa. ☕");
        running = false;
      }
    }, 1000);
  }
});

pauseBtn.addEventListener("click", () => {
  clearInterval(countdown);
  running = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(countdown);
  time = 25 * 60;
  updateDisplay();
  running = false;
});

updateDisplay();

// ====== Tarefas ======
const addTaskBtn = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    li.addEventListener("click", () => {
      tasks[i].completed = !tasks[i].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  }
});

renderTasks();

// ====== Anotações ======
const noteArea = document.getElementById("noteArea");
noteArea.value = localStorage.getItem("note") || "";

noteArea.addEventListener("input", () => {
  localStorage.setItem("note", noteArea.value);
});