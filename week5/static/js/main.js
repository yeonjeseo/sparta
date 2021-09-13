$(document).ready(function () {
  showStar();
});

const showStar = async () => {
  const cardContainer = document.getElementById("star-box");
  const response = await fetch("/api/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) console.log("GET request error!");
  const result = await response.json();
  const stars = result.stars;
  let html = "";

  stars.forEach((star) => {
    html += `<div class="card">
                      <div class="card-content">
                        <div class="media">
                          <div class="media-left">
                            <figure class="image is-48x48">
                              <img
                                src=${star.img_url} />
                            </figure>
                          </div>
                          <div class="media-content">
                            <a href="#" target="_blank" class="star-name title is-4">${star.name} (좋아요: ${star.like})</a>
                            <p class="subtitle is-6">${star.recent}</p>
                          </div>
                        </div>
                      </div>
                      <footer class="card-footer">
                        <a href="#" onclick="likeStar('${star.name}')" class="card-footer-item has-text-info">
                          위로!
                          <span class="icon">
                            <i class="fas fa-thumbs-up"></i>
                          </span>
                        </a>
                        <a href="#" onclick="deleteStar('${star.name}')" class="card-footer-item has-text-danger">
                          삭제
                          <span class="icon">
                            <i class="fas fa-ban"></i>
                          </span>
                        </a>
                      </footer>
                    </div>`;
  });
  cardContainer.innerHTML = html;
};

// showStar();

// function showStar() {
//   $.ajax({
//     type: "GET",
//     url: "/api/list",
//     data: {},
//     success: function (response) {
//       const cardContainer = document.getElementById("star-box");
//       const stars = response.stars;
//       let html = "";
//       //sort stars by like, DESC
//       // sortedStars = response.stars.sort((prev, curr) => curr.like - prev.like);
//       stars.forEach((star) => {
//         html += `<div class="card">
//                   <div class="card-content">
//                     <div class="media">
//                       <div class="media-left">
//                         <figure class="image is-48x48">
//                           <img
//                             src=${star.img_url} />
//                         </figure>
//                       </div>
//                       <div class="media-content">
//                         <a href="#" target="_blank" class="star-name title is-4">${star.name} (좋아요: ${star.like})</a>
//                         <p class="subtitle is-6">${star.recent}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <footer class="card-footer">
//                     <a href="#" onclick="likeStar('${star.name}')" class="card-footer-item has-text-info">
//                       위로!
//                       <span class="icon">
//                         <i class="fas fa-thumbs-up"></i>
//                       </span>
//                     </a>
//                     <a href="#" onclick="deleteStar('${star.name}')" class="card-footer-item has-text-danger">
//                       삭제
//                       <span class="icon">
//                         <i class="fas fa-ban"></i>
//                       </span>
//                     </a>
//                   </footer>
//                 </div>`;
//       });
//       cardContainer.innerHTML = html;
//     },
//   });
// }

function likeStar(name) {
  $.ajax({
    type: "POST",
    url: "/api/like",
    data: {
      target: name,
    },
    success: function (response) {
      alert(response["msg"]);
      window.location.reload();
    },
  });
}

function deleteStar(name) {
  $.ajax({
    type: "POST",
    url: "/api/delete",
    data: {
      sample_give: "샘플데이터",
      target: name,
    },
    success: function (response) {
      alert(response["msg"]);
      window.location.reload();
    },
  });
}
