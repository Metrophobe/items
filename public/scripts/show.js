document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.getElementsByTagName("button")).forEach((btn) => {
    btn.addEventListener("click", (b) => {
      makeRequest("/" + b.target.className, b.target.parentElement.id);
    });
  });
});

makeRequest = async (url, id) => {
  let form = document.createElement("form");
  form.encoding = "application/x-www-form-urlencoded";
  form.action = url;
  form.method = "POST";

  let fid = document.createElement("input");
  fid.setAttribute("type", "hidden");
  fid.setAttribute("name", "id");
  fid.setAttribute("value", id);

  form.appendChild(fid);
  document.body.appendChild(form);
  form.submit();
};
