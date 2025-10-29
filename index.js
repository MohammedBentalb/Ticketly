const forward = document.querySelector(".plus-step");
const backward = document.querySelector(".minus-step");
const sectionSlider = document.querySelector(".sectionSlider");
const stepper = document.querySelectorAll(".stepper");
const chooseEventButton = document.getElementById("choose-event-button");
const events = document.querySelectorAll("[data-eventId]");

let step = 0;
let eventId = null;

// initialization
// buttonInablerAndDisabler(chooseEventButton, eventId !== null ? true : false);
initializeStepper();




// event listenner to listen for the clicking of choosin an event
events.forEach((event) => {
  event.addEventListener("click", (e) => {
  events.forEach((oldEvent) => oldEvent.classList.remove("selected-event"));

    eventId = e.currentTarget.getAttribute("data-eventId");
    console.log(eventId);
    e.currentTarget.classList.toggle("selected-event");
  });
});


// event listenner to listen for the click of the choose event button to go to the next step

chooseEventButton.addEventListener("click", (e) => {
  if (eventId === null) {
    buttonInablerAndDisabler(chooseEventButton, false);
    return;
  }
  buttonInablerAndDisabler(chooseEventButton, step !== null ? false : true);
  step++;
  formProgress(step);
});

forward.addEventListener("click", (e) => {
  if (step === 3) return;
  if (step >= 0 && step < 4) step += 1;
  initializeStepper();
  formProgress(step);
});

backward.addEventListener("click", (e) => {
  if (step === 0) return;
  if (step > 0 && step <= 3) step--;

  initializeStepper();
  formProgress(step);
});

function buttonInablerAndDisabler(element, disable) {
  if (disable) {
    element.disabled = false;
    return;
  }
  element.disabled = true;
  console.log(element.disabled)
}

function formProgress(step) {
  sectionSlider.style.transform = `translateX(${-100 * step}%)`;
  initializeStepper();
}

function initializeStepper() {
  stepper.forEach((item, i) => {
    if (step === i) {
      item.classList.add("active");
      item.classList.remove("done");
    }
    if (step > i) {
      item.classList.add("done");
      item.classList.remove("active");
    }

    if (step < i) {
      item.classList.remove("done");
      item.classList.remove("active");
    }
  });
}

