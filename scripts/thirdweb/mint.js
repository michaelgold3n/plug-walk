import sdk from "./init-sdk.js"

const nftDrop = sdk.getNFTDrop("0x5c6c8189daA81Ff73D800854fea1886Faa8d610d")

const BASE_METADATA_URI =
  "ipfs://bafybeibuby4n2ulydp2ip72ispexsxduhbfk4qz4vhet4xbwqjs7hwlbhu/"

const NUM_TO_MINT = 20

const generateRandomIds = () => {
  const ids = []
  while (ids.length < NUM_TO_MINT) {
    var r = Math.floor(Math.random() * 52) + 1
    if (ids.indexOf(r) === -1) ids.push(r)
  }
  return ids
}

const createMetadata = (BASE_METADATA_URI) => {
  const metadatas = []
  const ids = generateRandomIds()

  for (let i = 0; i < NUM_TO_MINT; i++) {
    let metadata = {
      name: `Map NFT #${ids[i]}`,
      description: "This is a map NFT",
      attributes: {
        uri: `${BASE_METADATA_URI}${ids[i]}.json`,
      },
    }
    metadatas.push(metadata)
  }
  return metadatas
}

const mint = async (metadatas) => {
  const result = await nftDrop.createBatch(metadatas)
  console.log(result[0].id)
}

const main = async () => {
  const metadatas = createMetadata(BASE_METADATA_URI)
  await mint(metadatas)
}

main()
