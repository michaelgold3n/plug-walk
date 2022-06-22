import sdk from "./init-sdk.js"

const CONTRACT_ADDRESS = "0x5c6c8189daA81Ff73D800854fea1886Faa8d610d"

const nftDrop = sdk.getNFTDrop(CONTRACT_ADDRESS)

const getData = async (_tokenId) => {
  let data = await nftDrop.get("3")
  return data
}

const main = async () => {
  const data = (await getData())
  console.log(data)
}

main()
