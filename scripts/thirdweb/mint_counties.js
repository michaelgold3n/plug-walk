import sdk from "./init-sdk.js"

const nftDrop = sdk.getNFTDrop("0xAA25a91f507a0A2ED9c6161EAEe68F2Aa0B5E96A")

const BASE_METADATA_URI =
  "ipfs://bafybeihzvk6d7nvg4ovlts2nfac7hqn5kszk22b53nx4noqq3sdzqpcx7e/"

const NUM_TO_MINT = 50

const generateRandomIds = () => {
  const ids = []
  while (ids.length < NUM_TO_MINT) {
    var r = Math.floor(Math.random() * 100) + 1
    if (ids.indexOf(r) === -1) ids.push(r)
  }
  return ids
}

const createMetadata = (BASE_METADATA_URI) => {
  const metadatas = []
  const ids = generateRandomIds()

  for (let i = 0; i < NUM_TO_MINT; i++) {
    let metadata = {
      name: `County NFT #${ids[i]}`,
      description: "This is a county NFT",
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
