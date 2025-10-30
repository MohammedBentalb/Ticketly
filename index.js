const forward = document.querySelector(".plus-step");
const backward = document.querySelector(".minus-step");
const sectionSlider = document.querySelector(".sectionSlider");
const stepper = document.querySelectorAll(".stepper");
const mobileStepper = document.querySelector(".stepper-mobile");
const chooseEventButton = document.getElementById("choose-event-button");
const evantCards = document.querySelectorAll("[data-eventId]");
const ticketCounter = document.querySelector(".ticketCounter");
const previousButtons = document.querySelectorAll(".previous-b")
const nextButtons = document.querySelectorAll(".next-b")

let step = 0;
let eventId = null;
let ticketsBooked = 0;

let events = [
  {
    id: 0,
    name: "monitoring css",
    places: 42,
    location: "oneline",
    desc: "Discover why your div still shifts 3px left for no reason. Bring tissues.",
    date: "4 may",
  },
  {
    id: 1,
    name: "Modern SASS",
    places: 6,
    location: "casablanca",
    desc: "Nesting gone wild. Learn to write SASS so elegant even your variables feel classy.",
    date: "4 may",
  },
  {
    id: 2,
    name: "Express is future",
    places: 2,
    location: "marrakech",
    desc: "Build APIs so fast you'll question HTTP itself. Coffee mandatory, sleep optional.",
    date: "18 oct",
  },
  {
    id: 3,
    name: "why grit?",
    places: 12,
    location: "oneline",
    desc: "A motivational rollercoaster: code, fail, cry, succeed, repeat. Grit makes it art.",
    date: "1 oct",
  },
  {
    id: 4,
    name: "JAVA is future",
    places: 56,
    location: "youssofia",
    desc: "Enter the land of semicolons and stack traces. Bring patience and caffeine.",
    date: "9 nov",
  },
  {
    id: 5,
    name: "MERN",
    places: 1,
    location: "oujda",
    desc: "Full-stack in one go. Mongo to React before lunch—burnout by dinner.",
    date: "1 oct",
  },
  {
    id: 6,
    name: "MERN on action",
    places: 22,
    location: "oujda",
    desc: "Code live with MongoDB, Express, React, Node. Expect bugs, cheers, and mild panic.",
    date: "2 oct",
  },
  {
    id: 7,
    name: "RIP CS",
    places: 22,
    location: "ifrana",
    desc: "Farewell to computer science fundamentals—JavaScript frameworks have taken over.",
    date: "1 jan",
  },
];

// initialization
buttonInablerAndDisabler(chooseEventButton, eventId !== null ? false : true);
buttonInablerAndDisabler(nextButtons[0], ticketsBooked === 0 ? true : false);
initializeAndUpdateProgress();




// event listenner to listen for the clicking of choosin an event
evantCards.forEach((event) => {
  event.addEventListener("click", (e) => {
      ticketsBooked = 0;
      ticketCounter.textContent = ticketsBooked;
    if (Number(event.getAttribute("data-eventId")) === eventId) {
      event.classList.remove("selected-event");
      eventId = null;

      buttonInablerAndDisabler(chooseEventButton, true);
      return;
    }

    evantCards.forEach((oldEvent) =>
      oldEvent.classList.remove("selected-event")
    );
    eventId = Number(e.currentTarget.getAttribute("data-eventId"));
    buttonInablerAndDisabler(chooseEventButton, step !== null ? false : true);
    e.currentTarget.classList.toggle("selected-event");
  });
});



// event listenner to listen for the click of the choose event button to go to the next step
chooseEventButton.addEventListener("click", (e) => {
  if (eventId === null) {
    buttonInablerAndDisabler(chooseEventButton, false);
    return;
  }
  step++;
  formProgress(step);
  console.log(eventId);
});

let plus = document.querySelector(".counter-plus");
let minus = document.querySelector(".counter-minus");

plus.addEventListener("click", () => {
  if (ticketsBooked === events[eventId - 1].places) return;
  ticketsBooked++;
  ticketCounter.textContent = ticketsBooked;
  buttonInablerAndDisabler(nextButtons[0], ticketsBooked === 0 ? true : false);
});



minus.addEventListener("click", () => {
  if (ticketsBooked === 0) return;
  ticketsBooked--;
  ticketCounter.textContent = ticketsBooked;
  buttonInablerAndDisabler(nextButtons[0], ticketsBooked === 0 ? true : false);
});





// previous button in second section
previousButtons.forEach(button => {
  button.addEventListener("click", () =>{
    if(step == 1){
      step--
      initializeAndUpdateProgress()
    }
  })
})

nextButtons.forEach(button => {
  button.addEventListener("click", () =>{
    if(step == 1){
      if(ticketsBooked === 0) return
    }
    console.log('next')
  })
})
















// functions

function buttonInablerAndDisabler(element, disable) {
  if (disable) {
    element.disabled = true;
    return;
  }
  element.disabled = false;
}

function formProgress(step) {
  sectionSlider.style.transform = `translateX(${-100 * step}%)`;
  mobileStepper.style.transform = `translateY(${-100 * step}%)`;
  initializeAndUpdateProgress();
}

function initializeAndUpdateProgress() {
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
  mobileStepper.style.transform = `translateY(${-100 * step}%)`;
  sectionSlider.style.transform = `translateX(${-100 * step}%)`;
}




const initializeTicketCounter = (value) => {
  ticketCounter = value
  ticketCounter.textContent = value;
}














// testing evantCards to be removed

forward.addEventListener("click", (e) => {
  if (step === 3) return;
  if (step >= 0 && step < 4) step += 1;
  initializeAndUpdateProgress();
  formProgress(step);
});

backward.addEventListener("click", (e) => {
  if (step === 0) return;
  if (step > 0 && step <= 3) step--;

  initializeAndUpdateProgress();
  formProgress(step);
});
