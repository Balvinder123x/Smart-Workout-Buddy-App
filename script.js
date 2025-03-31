// // Function to toggle sidebar
// function toggleSidebar() {
//   let sidebar = document.getElementById("sidebar");
//   if (sidebar.style.left === "0px") {
//     sidebar.style.left = "-250px"; // Hide sidebar
//   } else {
//     sidebar.style.left = "0px"; // Show sidebar
//   }
// }

// // Function to load different sections dynamically
// function loadPage(page) {
//   const content = document.getElementById("content");
//   let pages = {
//     dashboard: "<h2>Dashboard</h2><p>Your progress overview.</p>",
//     profile: "<h2>Profile</h2><p>Manage your profile details.</p>",
//     streaks: "<h2>Streaks</h2><p>Track your fitness streaks.</p>",
//     reminders: "<h2>Reminders</h2><p>Set up fitness reminders.</p>",
//     chatbot: "<h2>AI Chatbot</h2><p>Chat with our AI assistant.</p>",
//   };
//   content.innerHTML = pages[page] || "<h2>Welcome</h2><p>Select a feature.</p>";
// }
// //streak progress bar


// Toggle Sidebar
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px"; // Hide sidebar
  } else {
    sidebar.style.left = "0px"; // Show sidebar
  }
}

// Update Progress Bar Dynamically
function updateProgress() {
  let progressValue = document.getElementById("progressInput").value;
  if (progressValue < 0) progressValue = 0;
  if (progressValue > 100) progressValue = 100;
  
  document.getElementById("progressBar1").style.width = progressValue + "%";
}

// Set Default Progress (Example: 70%)
window.onload = function () {
  document.getElementById("progressBar1").style.width = "70%";
};


async function sendMessage() {
  let userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  // Display user message
  let chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div>User: ${userInput}</div>`;

  document.getElementById("user-input").value = ""; // Clear input field

  // Fetch AI response
  let response = await fetchAIResponse(userInput);

  // Display AI response
  chatBox.innerHTML += `<div>AI: ${response}</div>`;
}

async function fetchAIResponse(message) {
  let apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key

  let response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });

  let data = await response.json();
  return data.choices[0].message.content;
}

document.addEventListener("DOMContentLoaded", loadReminders);

function addReminder() {
  let input = document.getElementById("reminderInput");
  let reminderText = input.value.trim();

  if (reminderText === "") return; // Prevent empty input

  let reminder = { text: reminderText, completed: false };
  let reminders = getStoredReminders();
  reminders.push(reminder);

  saveReminders(reminders);
  input.value = ""; // Clear input field
  renderReminders();
}

function renderReminders() {
  let todayGoals = document.getElementById("todayGoals");
  let completedGoals = document.getElementById("completedGoals");

  todayGoals.innerHTML = "";
  completedGoals.innerHTML = "";

  let reminders = getStoredReminders();

  reminders.forEach((reminder, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" ${
      reminder.completed ? "checked" : ""
    } onclick="toggleReminder(${index})">
                        ${reminder.text}`;

    if (reminder.completed) {
      completedGoals.appendChild(li);
    } else {
      todayGoals.appendChild(li);
    }
  });
}

function toggleReminder(index) {
  let reminders = getStoredReminders();
  reminders[index].completed = !reminders[index].completed;

  saveReminders(reminders);
  renderReminders();
}

function getStoredReminders() {
  return JSON.parse(localStorage.getItem("reminders")) || [];
}

function saveReminders(reminders) {
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

function loadReminders() {
  renderReminders();
}
