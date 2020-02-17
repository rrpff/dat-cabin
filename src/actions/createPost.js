module.exports = async function createPost (archiveUrl, post) {
  const archive = await DatArchive.load(archiveUrl)

  const postsManifest = "posts.json" in await archive.readdir("/")
    ? await archive.readFile("posts.json")
    : { posts: [] }

  postsManifest.posts = [...postsManifest.posts, post]

  await archive.writeFile("posts.json", JSON.stringify(postsManifest))

  return post
}
