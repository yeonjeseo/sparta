const handleLoadContent = async () => {
  const parentNode = document.getElementById("postContainer");

  const response = await fetch("/api/comment", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(await response.json());

  const comments = (await response.json()).comments;

  let html = "";
  comments.forEach((comment) => {
    html += `<div class="post">
    <div class="card__typo">
        <div class="userName">
            <span>By : ${comment.author}</span>
        </div>
        <div class="createdAt">
            <span>Posted At : ${comment.createdAt}</span>
        </div>
        <div class="title">
            ${comment.title}    
        </div>
        <p class="body">
            ${comment.comment}
        </p>
    </div>
    <div class="card__modify">
        <a href="/comment/${comment._id}">
            <img class="modify-icon" src="/static/img/pencil.png" alt="">
        </a>
    </div>
</div>`;
  });
  parentNode.innerHTML = html;
};
window.addEventListener("DOMContentLoaded", handleLoadContent);
// var getData = [];
// var usersList = [];

// function status(response) {
//   //Check Promise
//   if (response.status >= 200 && response.status < 300) {
//     return Promise.resolve(response);
//   } else {
//     return Promise.reject(new Error(response.statusText));
//   }
// }

// function json(response) {
//   //Return JSON format
//   return response.json();
// }

// function getUsers() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then(status)
//     .then(json)
//     .then(function (dataList) {
//       usersList = dataList;
//       dataList.forEach(function (data) {
//         $("#selUser").append(
//           $("<option>", {
//             value: data.id,
//             text: data.name,
//           })
//         );
//       });
//       getPosts("");
//     })
//     .catch(function (error) {
//       console.log("Fetch User Error :-S", error);
//     });
// }

// function getPosts(option) {
//   fetch("https://jsonplaceholder.typicode.com/posts" + option)
//     .then(status)
//     .then(json)
//     .then(function (dataList) {
//       getData = dataList;
//       var divReply = $(".reply");
//       divReply.empty();

//       dataList.forEach(function (data) {
//         var post = $('<p class="post"/>');

//         var divID = $('<div class="userName"/>').append(
//           $("<span>").append("By: ", usersList[data.userId - 1].name)
//         );
//         var divTitle = $('<div class="title"/>').append(data.title);
//         var divBody = $('<div class="body"/>').append(data.body);

//         divReply.append(post.append(divID, divTitle, divBody));
//       });
//     })
//     .catch(function (error) {
//       console.log("Fetch Post Error :-S", error);
//     });
// }

// $(document).ready(function () {
//   //Get Post On Document Ready
//   getUsers();
// });

// function searchUser() {
//   var userSelected = $("#selUser").val();

//   if (userSelected != 0) {
//     getPosts("?userId=" + userSelected);
//   } else {
//     getPosts("");
//   }
// }

// // post

//   <p class="post">
//   <div class="userName">
//     <span>By: Leanne Graham</span>
//   </div>
//   <div class="title">sunt aut facere repellat provident occaecati excepturi optio reprehenderit</div>
//   <div class="body">quia et suscipit
// suscipit recusandae consequuntur expedita et cum
// reprehenderit molestiae ut ut quas totam
// nostrum rerum est autem sunt rem eveniet architecto</div>
// </p>
