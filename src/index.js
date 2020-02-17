const choo = require("choo")
const html = require("choo/html")
const css = require("sheetify")
const loadPosts = require("./actions/loadPosts")

const app = choo({
  hash: true
})

app.use((state, emitter) => {
  state.signup = {}
  state.profile = null
  state.posts = []

  emitter.on("signup:complete", profile => {
    state.signup.errors = []
    emitter.emit("login", profile)
    emitter.emit("pushState", "/")
  })

  emitter.on("signup:errors", errors => {
    state.signup.errors = errors
    emitter.emit("render")
  })

  emitter.on("login", async profile => {
    window.localStorage.setItem("profile", profile.url)

    state.profile = profile
    emitter.emit("render")
    emitter.emit("load:posts")
  })

  emitter.on("logout", profile => {
    window.localStorage.removeItem("profile")

    state.profile = null
    emitter.emit("render")
  })

  emitter.on("load:posts", async () => {
    state.posts = await loadPosts([state.profile.url])
    emitter.emit("render")
  })
})

app.use(async (state, emitter) => {
  const profileArchiveUrl = window.localStorage.getItem("profile")
  if (profileArchiveUrl) {
    const archive = await DatArchive.load(profileArchiveUrl)
    const profile = JSON.parse(await archive.readFile("profile.json"))
    emitter.emit("login", profile)
  }
})

app.route("/", require("./pages/home"))
app.route("/signup", require("./pages/signup"))

app.mount("#app")
