const html = require("choo/html")
const login = require("../actions/login")
const createPost = require("../actions/createPost")

const header = (state, emit) => {
  const onClickLogin = async e => {
    e.preventDefault()
    const profile = await login()
    emit("login", profile)
  }

  const onClickLogout = e => {
    e.preventDefault()
    emit("logout")
  }

  return html`
    <main>
      ${state.profile === null
        ? html`<a href="#!" onclick=${onClickLogin}>login</a> <a href="#signup">sign up</a>`
        : html`you are ${state.profile.name} <a href="#!" onclick=${onClickLogout}>log out</a>`}
    </main>
  `
}

module.exports = function home (state, emit) {
  const onClickLogin = async e => {
    e.preventDefault()
    const profile = await login()
    emit("login", profile)
  }

  const onClickLogout = e => {
    e.preventDefault()
    emit("logout")
  }

  const submitPost = e => {
    e.preventDefault()

    createPost(state.profile.url, {
      timestamp: Date.now(),
      content: e.target[0].innerHTML
    })
  }

  if (state.profile === null) return `<main>${header(state, emit)}</main>`

  return html`
    <main>
      ${header(state, emit)}

      <h3>write</h3>

      <form onsubmit=${submitPost}>
        <textarea name="content">write something...</textarea>
        <input type="submit" />
      </form>

      <h3>posts</h3>

      ${state.posts.map(post => html`<div>~${post.user.name} @ ${post.timestamp}: ${post.content}</div>`)}
    </main>
  `
}
