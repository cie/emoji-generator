const text = document.getElementById("text");
const emoji = document.getElementById("emoji");
const copiedFeedback = document.getElementById("copiedFeedback");

text.addEventListener("keydown", async (event) => {
  if (event.key == "Enter") {
    emoji.textContent = "…";
    const response = await fetch("/api/getemoji?text=" + text.value);
    emoji.textContent = await response.text();
    console.log("Hello word");
    copyEmoji();
  }
});

emoji.addEventListener("click", async () => {
  if (!emoji.textContent || emoji.textContent === "…") return;
  copyEmoji();
});

async function copyEmoji() {
  try {
    await navigator.clipboard.writeText(emoji.textContent);
  } catch (err) {
    console.error("Failed to copy emoji: ", err);
    return;
  }
  // Reset any ongoing animations
  copiedFeedback.getAnimations().forEach((animation) => animation.cancel());

  // Reset styles
  copiedFeedback.style.opacity = "0";
  copiedFeedback.style.transform = "translate(-50%, -50%)";

  // Force reflow to ensure styles are applied before animation
  void copiedFeedback.offsetWidth;

  // Animate using Web Animations API
  copiedFeedback.animate(
    [
      { opacity: 1, top: "-20px", offset: 0 },
      { opacity: 0, top: "-40px", offset: 1 },
    ],
    {
      duration: 1400,
      easing: "cubic-bezier(0.4, 0.7, 0.9, 1)",
    }
  );

  // Reset after animation completes
  setTimeout(() => {
    copiedFeedback.style.opacity = "0";
  }, 1000);
}
