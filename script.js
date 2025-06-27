document.getElementById("themeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("toolForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput").files[0];
  const textInput = document.getElementById("textInput").value;
  const formData = new FormData();

  if (fileInput) formData.append("file", fileInput);
  if (textInput.trim() !== "") formData.append("text", textInput);

  const responseBox = document.getElementById("responseBox");
  responseBox.style.display = "block";
  responseBox.innerHTML = "⏳ Processing...";

  try {
    const res = await fetch("http://localhost:5000/api", {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    responseBox.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  } catch (err) {
    responseBox.innerHTML = `❌ Error: ${err.message}`;
  }
});
