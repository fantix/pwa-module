const path = require('path')
const sharp = require('sharp');

async function resize ({ input, distDir, sizes }) {
  const inputFile = sharp(input)

  await Promise.all(sizes.map(size => {
    const distFile = path.join(distDir, `${size}.png`)
    return new Promise(resolve => {
      inputFile.clone().resize(size, size, {fit: 'contain'}).toFile(distFile, () => resolve())
    })
  }))
}

resize(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
