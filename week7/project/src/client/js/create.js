const btnSubmit = document.getElementById("create");
const authorInput = document.getElementById("input-author");
const titleInput = document.getElementById("input-title");
const commentInput = document.getElementById("input-comment");
const passwordInput = document.getElementById("input-password");

const handleSubmit = async (e) => {
  const title = titleInput.value;
  const author = authorInput.value;
  const comment = commentInput.value;
  const password = passwordInput.value;

  if (title !== "" && author !== "" && comment !== "" && password !== "") {
    const commentObj = {
      title,
      author,
      comment,
      password,
    };
    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentObj),
    });

    console.log(await response.json());
    // 만약 정상적으로 끝나면... 조건 추가할 것
    window.alert("제출이 완료되었습니다.");
    location.href = "/";
  } else {
    window.alert("모든 양식을 작성해주세요");
  }
};

btnSubmit.addEventListener("click", handleSubmit);
