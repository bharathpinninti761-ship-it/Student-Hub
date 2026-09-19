const $ = (id) => document.getElementById(id);

$("menuToggle").addEventListener("click", () => $("navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => $("navLinks").classList.remove("open")));

$("gpaBtn").addEventListener("click", () => {
  const values = $("gpaInput").value.split(",").map(v => Number(v.trim())).filter(v => v !== 0 || v.trim() === "0");
  if (!values.length || values.some(v => Number.isNaN(v) || v < 0 || v > 10)) {
    $("gpaResult").textContent = "Enter valid GPAs from 0 to 10, separated by commas.";
    return;
  }
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  $("gpaResult").textContent = `Estimated average CGPA: ${average.toFixed(2)}`;
});

$("attendanceBtn").addEventListener("click", () => {
  const attended = Number($("attended").value);
  const conducted = Number($("conducted").value);
  const target = Number($("target").value);
  if (conducted <= 0 || attended < 0 || attended > conducted || target <= 0 || target > 100) {
    $("attendanceResult").textContent = "Enter valid attendance values.";
    return;
  }
  const current = attended / conducted * 100;
  if (current >= target) {
    $("attendanceResult").textContent = `Current attendance: ${current.toFixed(2)}%. You are above the target.`;
    return;
  }
  let extra = 0;
  while ((attended + extra) / (conducted + extra) * 100 < target && extra < 10000) extra++;
  $("attendanceResult").textContent = `Current: ${current.toFixed(2)}%. Attend ${extra} consecutive classes to reach ${target}%.`;
});

$("addTask").addEventListener("click", () => {
  const text = $("taskInput").value.trim();
  if (!text) return;
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  label.append(checkbox, document.createTextNode(" " + text));
  li.appendChild(label);
  $("taskList").appendChild(li);
  $("taskInput").value = "";
});

$("year").textContent = new Date().getFullYear();
