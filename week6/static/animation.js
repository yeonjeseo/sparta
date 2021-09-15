const leftBtns = document.querySelectorAll(".left-btn");
const rightBtns = document.querySelectorAll(".right-btn");
const list = document.getElementById("romance-grid");

// console.log(list.childElementCount);
let idx = 0;

const handleSlideClick = (e) => {
  e.preventDefault();
  direction = e.target.parentNode.id;
  const gridId =
    e.target.parentNode.parentNode.nextSibling.nextSibling.childNodes[1].id;
  if (direction.includes("left")) {
    leftAnimation(gridId);
  }
  if (direction.includes("right")) {
    rightAnimation(gridId);
  }
};

const leftAnimation = (gridId) => {
  idx < 0 ? (idx = 5) : idx--;

  $(`#${gridId}`).animate(
    {
      left: -335 * idx,
    },
    600
  );
};

const rightAnimation = (gridId) => {
  idx > 5 ? (idx = 0) : idx++;

  $(`#${gridId}`).animate(
    {
      left: -335 * idx,
    },
    600
  );
};

leftBtns.forEach((leftBtn) => {
  leftBtn.addEventListener("click", handleSlideClick);
});
rightBtns.forEach((rightBtn) => {
  rightBtn.addEventListener("click", handleSlideClick);
});
