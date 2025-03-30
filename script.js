// Function to toggle sidebar
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px"; // Hide sidebar
  } else {
    sidebar.style.left = "0px"; // Show sidebar
  }
}

// Function to load different sections dynamically
function loadPage(page) {
  const content = document.getElementById("content");
  let pages = {
    dashboard: "<h2>Dashboard</h2><p>Your progress overview.</p>",
    profile: "<h2>Profile</h2><p>Manage your profile details.</p>",
    streaks: "<h2>Streaks</h2><p>Track your fitness streaks.</p>",
    reminders: "<h2>Reminders</h2><p>Set up fitness reminders.</p>",
    chatbot: "<h2>AI Chatbot</h2><p>Chat with our AI assistant.</p>",
  };
  content.innerHTML = pages[page] || "<h2>Welcome</h2><p>Select a feature.</p>";
}
