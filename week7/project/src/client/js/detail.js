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
  if (response.status === 400) {
    // const result = await response.json();
    window.alert((await response.json()).msg);
  } else {
    window.alert((await response.json()).msg);
    location.reload();
  }
};

const handleDeleteSubmit = async () => {
  const response = await fetch(`/api/comment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  window.alert(result.msg);
  if (response.status === 200) {
    location.href = "/";
  } else {
    return;
  }
};

updateBtn.addEventListener("click", handleUpdateSubmit);
deleteBtn.addEventListener("click", handleDeleteSubmit);
