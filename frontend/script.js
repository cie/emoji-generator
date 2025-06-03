const text = document.getElementById("text");
const emoji = document.getElementById("emoji");
text.addEventListener("keydown", async (event) => {
  if (event.key == "Enter") {
    const response = await fetch("/api/getemoji?text=" + text.value);
    emoji.textContent = await response.text();
    console.log("Hello word");
  }
});
