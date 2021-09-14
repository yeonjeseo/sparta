const likeBtn = document.getElementById("like");
const dislikeBtn = document.getElementById("dislike");
const logoutBtn = document.getElementById("logout");
const postingBtn = document.getElementById("posting");
const deletePostingBtn = document.getElementById("delete-posting");
const submitCommentBtn = document.getElementById("submit-comment");

const handleLikeClick = (e) => {
  const name = e.target.textContent;
  console.log(name);
  $.ajax({
    type: "POST",
    url: "/api/like",
    data: {
      target: "그린 북",
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
      target: "그린 북",
    },
    success: function (response) {
      console.log(response);
    },
  });
};

const handleLogoutClick = () => {
  $.removeCookie("mytoken");
};

const handlePostingClick = () => {
  $.ajax({
    type: "POST",
    url: "/api/url",
    data: {
      url: "https://movie.naver.com/movie/bi/mi/basic.naver?code=171539",
    },
    success: function (response) {
      console.log(response);
    },
  });
};

const handleDeletePostingClick = () => {
  $.ajax({
    type: "POST",
    url: "/api/delete",
    data: {
      title: "그린 북",
    },
    success: function (response) {
      console.log(response);
    },
  });
};

const handleCommentClick = () => {
  const comment = document.getElementById("comment-box").value;
  $.ajax({
    type: "POST",
    url: "/api/add-comment",
    data: {
      comment: comment,
      owner: "그린 북",
    },
    success: function (response) {
      console.log(response);
    },
  });
};

likeBtn.addEventListener("click", handleLikeClick);
dislikeBtn.addEventListener("click", handleDislikeClick);
logoutBtn.addEventListener("click", handleLogoutClick);
postingBtn.addEventListener("click", handlePostingClick);
deletePostingBtn.addEventListener("click", handleDeletePostingClick);
submitCommentBtn.addEventListener("click", handleCommentClick);
