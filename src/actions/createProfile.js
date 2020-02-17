module.exports = async function createProfile (options) {
  const errors = []

  if (options.name === undefined || options.name.trim() === "") {
    errors.push("name must be set")
  }

  const valid = errors.length === 0
  let profile = null

  if (valid) {
    const archive = await DatArchive.create({
      title: `${options.name} (social profile)`,
      types: ["profile"],
      prompt: true,
    })

    profile = {
      name: options.name,
      url: archive.url
    }

    await archive.writeFile("profile.json", JSON.stringify(profile))
  }

  return {
    profile,
    errors
  }
}
