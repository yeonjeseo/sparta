const updateBtn = document.getElementById("submitUpdate");
const deleteBtn = document.getElementById("submitDelete");

const id = document.getElementById("postId").dataset.id;

const handleUpdateSubmit = async () => {
  const title = document.getElementById("input-title").value;
  const author = document.getElementById("input-author").value;
  const comment = document.getElementById("input-comment").value;
  const password = document.getElementById("input-password").value;

  if (password === "") {
    window.alert("비밀번호를 입력해주세요!");
    return;
  }

  const updatedPost = {
    title,
    author,
    comment,
    password,
  };

  const response = await fetch(`/api/comment/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });

  const result = await response.json();
  console.log(result);
};

updateBtn.addEventListener("click", handleUpdateSubmit);
