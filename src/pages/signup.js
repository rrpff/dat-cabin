const html = require("choo/html")
const createProfile = require("../actions/createProfile")

module.exports = function signup (state, emit) {
  const submit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const options = {}
    for (let [key, value] of data.entries())
      options[key] = value

    const { profile, errors } = await createProfile(options)
    if (profile) emit("signup:complete", profile)
    else emit("signup:errors", errors)
  }

  return html`
    <main>
      <form onsubmit=${submit}>
        <pre><code>${JSON.stringify(state.signup.errors)}</code></pre>

        <p>
          <label for="signup_name">name</label>
          <input type="text" name="name" id="signup_name" />
        </p>

        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </main>
  `
}
