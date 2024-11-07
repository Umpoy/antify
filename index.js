const DELAY_IN_MS = 100;
const VIDEO_LENGTH_IN_MS = 20000;
const MAX_Z_INDEX = 2147483647;

const links = document.getElementsByTagName("a");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (event) {
    event.preventDefault();
  });
}

let hasRendered = false;
let timeoutId;

function getCenafyVideo() {
  const video = document.createElement("video");
  video.src = chrome.runtime.getURL("scary.mp4");
  Object.assign(video.style, {
    position: "fixed",
    background: "black",
    zIndex: MAX_Z_INDEX,
    height: "100vh",
    width: "100vw",
    inset: 0,
  });

  return video;
}

function cenafy() {
  if (hasRendered) {
    return;
  }

  if (timeoutId != null) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    if (document.hidden) {
      return;
    }

    const body = document.body;
    const previousPointerEvents = body.style.pointerEvents;
    body.style.pointerEvents = "none";
    const previousBackgroundColor = body.style.backgroundColor;
    body.style.backgroundColor = "black";

    const video = getCenafyVideo();
    body.appendChild(video);

    window.removeEventListener("mouseup", cenafy);

    video.addEventListener("ended", () => {
      body.style.backgroundColor = previousBackgroundColor;
      body.style.pointerEvents = previousPointerEvents;
      body.removeChild(video);
      hasRendered = true;
    });

    video.play();
  }, DELAY_IN_MS);
}

if (true) {
  window.addEventListener("mouseup", cenafy);
}
