async function fetchRepos(e) {
  e.preventDefault()

  const text = document.querySelector("#search").value
  const error = document.querySelector("#error")
  const repo = document.querySelector(".repo")

  if (text.length < 2) {
    return error.style.display = "block"
  } else {
    error.style.display = "none"

    repo.innerHTML = ""

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${text}+in:name`);
      const data = await response.json();
      const repos = data.items
    
      for (let i = 0; i < 10; i++) {
        const element = repos[i];
        const dataCreate = element.created_at.slice(0, -10)
    
        const block = `
          <div class="repo__card">
            <a target="_blank" href=${element.html_url}>${element.name}</a>
            <div class="repo__info">
              <span>создан: ${dataCreate}</span>
              <span>набрано звездочек: ${element.stargazers_count}</span>
            </div>
          </div>`
    
        repo.insertAdjacentHTML("afterbegin", block)
      }
      
    } catch (error) {
      console.log(error.message);
      repo.insertAdjacentHTML("afterbegin", "<h3>Увы... Ничего не найдено</h3>")
    }
  }

}

const forma = document.querySelector(".forma")
forma.addEventListener("submit", fetchRepos)

const superReset = document.querySelector("#reset__all")
superReset.addEventListener("click", () => {
  const repo = document.querySelector(".repo")
  repo.innerHTML = ""
})
