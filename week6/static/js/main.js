const likeBtn = document.getElementById("like");
const dislikeBtn = document.getElementById("dislike");

console.log("sdfsdf");

const handleLikeClick = (e) => {
  const name = e.target.textContent;
  console.log(name);
  $.ajax({
    type: "POST",
    url: "/api/like",
    data: {
      target: "test",
    },
    success: function (response) {
      console.log(response);
    },
  });
};

const handleDislikeClick = (e) => {
  const name = e.target.textContent;
  console.log(name);
  $.ajax({
    type: "POST",
    url: "/api/dislike",
    data: {
      target: "test",
    },
    success: function (response) {
      console.log(response);
    },
  });
};

likeBtn.addEventListener("click", handleLikeClick);
dislikeBtn.addEventListener("click", handleDislikeClick);
