const eventListContainer = document.querySelector(".eventListOne");
const eventListContainer2 = document.querySelector(".eventListTwo");

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
let presonlDetails = { image: "/assets/images/human.jpg" };
let detailsArray = [];
let invalidCount = [];


/** creating the list of events  in html using this array */
events.map((event, i) => {
  let li = document.createElement("li");
  li.setAttribute("data-eventId", event.id);
  li.classList.add(
    "flex",
    "flex-col",
    "gap-8",
    "p-5",
    "rounded-2xl",
    "justify-between",
    "bg-primary"
  );
  let content = `
      <div class="flex flex-col gap-2">
        <p class="font-semibold text-2xl">${event.name}</p>
        <div class="opacity-85 font-medium flex items-center">
          <p>${event.places}</p>
          <img
            src="assets/images/stool.png"
            alt="chair"
            class="size-4"
          />
        </div>
      </div>

      <p class="font-semibold text-md">${event.desc}</p>

      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold">
            15:00 - 17:00
            <span class="text-lg opacity-85">${event.date}</span>
          </p>
          <p class="font-semibold">${event.location}</p>
        </div>
        <img src="assets/images/right-arrow.png" class="size-5" />
      </div>
    `;
  li.innerHTML = content;
  if (i <= 3) {
    eventListContainer.appendChild(li);
    return;
  }
  eventListContainer2.appendChild(li);
});

const forward = document.querySelector(".plus-step");
const backward = document.querySelector(".minus-step");
const sectionSlider = document.querySelector(".sectionSlider");
const stepper = document.querySelectorAll(".stepper");
const mobileStepper = document.querySelector(".stepper-mobile");
const chooseEventButton = document.getElementById("choose-event-button");
const evantCards = document.querySelectorAll("[data-eventId]");
const ticketCounter = document.querySelector(".ticketCounter");
const previousButtons = document.querySelectorAll(".previous-b");
const nextButtons = document.querySelectorAll(".next-b");
const plus = document.querySelector(".counter-plus");
const minus = document.querySelector(".counter-minus");

// initialization
buttonInablerAndDisabler(chooseEventButton, eventId !== null ? false : true);
buttonInablerAndDisabler(nextButtons[0], ticketsBooked === 0 ? true : false);
buttonInablerAndDisabler(nextButtons[1], detailsArray.length === 0 ? true : false);
initializeAndUpdateProgress();

// event listenner to listen for the clicking of choosin an event
evantCards.forEach((event) => {
  event.addEventListener("click", (e) => {
    ticketsBooked = 0;
    ticketCounter.textContent = ticketsBooked;
    if (Number(event.getAttribute("data-eventId")) === eventId) {
      event.classList.remove("selected-event");
      eventId = null;
      ticketsDetailFiller();

      buttonInablerAndDisabler(chooseEventButton, true);
      return;
    }

    evantCards.forEach((oldEvent) =>
      oldEvent.classList.remove("selected-event")
    );
    eventId = Number(e.currentTarget.getAttribute("data-eventId"));
    buttonInablerAndDisabler(chooseEventButton, step !== null ? false : true);
    e.currentTarget.classList.toggle("selected-event");
    ticketsDetailFiller();
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
});

// addint the event details to the ticket one an event is shosen
const ticketsDetailFiller = () => {
  const ticketDetailContainer = document.querySelector(
    "[data-role='ticket-info-container']"
  );

  ticketDetailContainer.innerHTML = "";

  if (eventId === null) return;

  let content = `
      <p class="text-center font-semibold text-3xl md:hidden">${events[eventId].name}</p>
      <div class="flex items-center justify-between">
        <p class="date-ticket font-semibold sm:text-lg whitespace-nowrap">${events[eventId].date}</p>
        <p class="ticket-title max-md:hidden text-4xl font-semibold first-letter:capitalize text-center">${events[eventId].name}</p>
        <div class="flex max-md:w-full items-center justify-center gap-3 md:gap-6 font-medium">
          <p class="max-md:max-md:ml-auto">15:00 - 17:00</p>
          <p class="location-ticket max-md:ml-auto">${events[eventId].location}</p>
        </div>
      </div>
      <p class="font-medium max-sm:text-sm text-center text-white/75">Discover why your div still shifts 3px left for no reason. Bring tissues.</p>
      <div class="flex items-baseline justify-center">
        <img src="assets/images/ticketly-logo-ticket.png" class="md:ml-auto w-38 max-md:w-30" alt="logo">
        <p class="font-bold ml-auto max-md:hidden">00007541289</p>
      </div>
  `;

  ticketDetailContainer.innerHTML = content;
  console.log(ticketDetailContainer);
};

// traking the plus button that increase the tickets
plus.addEventListener("click", () => {
  if (ticketsBooked === events[eventId].places) return;
  ticketsBooked++;
  ticketCounter.textContent = ticketsBooked;
  buttonInablerAndDisabler(nextButtons[0], ticketsBooked === 0 ? true : false);
});

// traking the minus button that decrease the tickets
minus.addEventListener("click", () => {
  if (ticketsBooked === 0) return;
  ticketsBooked--;
  ticketCounter.textContent = ticketsBooked;
  buttonInablerAndDisabler(nextButtons[0], ticketsBooked === 0 ? true : false);
});

// tickets section

const detailList = document.querySelector("[data-name=ticket-list-details]");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let phoneRegex = /^\d{7,15}$/;
  let nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const fileReader = new FileReader();

  fileReader.onload = () => {
    presonlDetails.image = fileReader.result;
    renderTicketsDetail(e);
    console.log("object with image", presonlDetails);
  };

  for (const item of e.target.children) {
    const input = item.children[1];

    if (!input) continue;
    if (input.id === "name" || input.id === "familyName") {
      if (input.value.trim() === "" || !nameRegex.test(input.value)) {
        console.log("name is not it ");
        invalidCount = [...invalidCount, input.id];
      }
    }

    if (input.id === "email") {
      if (!emailRegex.test(input.value)) {
        console.log("email is not it ");
        invalidCount = [...invalidCount, input.id];
      }
    }

    if (input.id === "phone") {
      if (!phoneRegex.test(input.value)) {
        console.log("email is not it ");
        invalidCount = [...invalidCount, input.id];
      }
    }

    if (input.id === "image") {
      if (input.files.length === 0) {
        renderTicketsDetail(e);
        break;
      } else {
        fileReader.readAsDataURL(input.files[0]);
        break;
      }
    }

    presonlDetails[input.id] = input.value;
    input.value = "";
  }
});

function renderTicketsDetail(e = null) {
/*   for (let i = 0; i < 4; i++) {
    console.log(e.target.children[0].children[2]);
    if (!e.target.children[i].children[2].classList.contains("hidden")) {
      e.target.children[i].children[1].classList.remove("border-red-600");
      e.target.children[i].children[2].classList.add("hidden");
    }
  } */

      for (let child of e.target.children) {
        const input = child.children[1];
        const errorText = child.children[2];
        if (!input) continue;

        if (!errorText.classList.contains("hidde") && input.id !== "image") {
          input.classList.remove("border-red-600");
          errorText.classList.add("hidden");
        }
      }


  if (invalidCount.length > 0) {
    for (let child of e.target.children) {
      const input = child.children[1];
      const errorText = child.children[2];
      if (!input) continue;

      if (invalidCount.includes(input.id)) {
        input.classList.add("border-red-600");
        errorText.classList.remove("hidden");
      }
    }

    invalidCount = [];
    return;
  }


  const li = document.createElement("li");
  li.classList.add(
    "flex",
    "w-full",
    "max-md:max-w-[320px]",
    "items-center",
    "border-2",
    "border-primary",
    "min-h-11",
    "rounded-xl",
    "p-6"
  );

  let content = `
    <div
      class="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-6"
    >
      <div class="flex items-center flex-col md:flex-row gap-6">
        <img
          src="${presonlDetails.image}"
          alt=""
          class="object-cover rounded-xl w-36 md:w-28.25 md:h-20.25 border-2 border-primary"
        />
        <div class="flex flex-col">
          <p class="max-md:text-center">${presonlDetails.name} ${presonlDetails.familyName}</p>
          <p class="text-center">${presonlDetails.email}</p>
        </div>
      </div>
      <p>${presonlDetails.phone}</p>
    </div>
`;

  li.innerHTML = content;
  detailList.appendChild(li);
  detailsArray = [...detailsArray, presonlDetails]
  console.log(presonlDetails);
  presonlDetails = { image: "/assets/images/human.jpg" };
  console.log(detailsArray)

  buttonInablerAndDisabler(
    nextButtons[1],
    detailList.length === 0 ? true : false
  );

}

// previous and next buttons section
previousButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (step === 0 || step === 3) return;
    step--;
    initializeAndUpdateProgress();
  });
});

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (step === 1) {
      if (ticketsBooked === 0) return;
      step++;
      initializeAndUpdateProgress();
    }
    if (step === 2) {
      if (detailsArray.length === 0) return;
      step++;
      initializeAndUpdateProgress();
    }
    console.log("next");
  });
});

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
  ticketCounter = value;
  ticketCounter.textContent = value;
};

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
