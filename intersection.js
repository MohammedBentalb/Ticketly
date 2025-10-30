let sections = document.querySelectorAll(".section");

const options = {
  root: document.querySelector(".windowIntersect"),
  rootMargin: "0px",
  threshold: 0.5,
};

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.style.height = entry.isIntersecting ? "100%" : "500px";
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});
