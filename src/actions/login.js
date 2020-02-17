module.exports = async function login () {
  const archive = await DatArchive.selectArchive({
    filters: {
      isOwner: true,
    }
  })

  const profile = JSON.parse(await archive.readFile("profile.json"))
  return profile
}
