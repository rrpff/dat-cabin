module.exports = async function loadPosts (archiveUrls) {
  const allPostsByUser = await Promise.all(archiveUrls.map(async url => {
    const archive = await DatArchive.load(url)
    const user = JSON.parse(await archive.readFile("profile.json"))

    if (!("posts.json" in await archive.readdir("/"))) {
      return []
    }

    const postsManifest = JSON.parse(await archive.readFile("posts.json"))
    return postsManifest.posts.map(post => ({
      user: user.name,
      timestamp: post.timestamp,
      content: post.content,
    }))
  }))

  return allPostsByUser.reduce((acc, posts) => [...acc, ...posts], [])
}
