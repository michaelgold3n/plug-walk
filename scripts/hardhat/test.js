const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory("CountyImages")
  const contract = await contractFactory.deploy()
  await contract.deployed()

  console.log("NFT contract deployed at:", contract.address)

  const [owner, add1] = await hre.ethers.getSigners()

  let img_url =
    "https://bafybeigc4cgcuoo6mh7zqcxxolqvefxuowibm3jzo6xgtmuwtzcthykrie.ipfs.nftstorage.link/"
  let state_nft_id = 2

  let tx = await contract.addImage(state_nft_id, img_url)

  img_url =
    "https://bafkreictfbgbeimqpieu4mvqmxfcxycdl6xg6tphswcmmkdieknkmsnqau.ipfs.nftstorage.link/"
  
  tx = await contract.connect(add1).addImage(4, img_url)

  let uri = await contract.getStateNftToTokenURI(2)
  console.log(uri)

  console.log("Updating URI")
  let updateTx = await contract.updateImage(2, img_url);

  uri = await contract.getStateNftToTokenURI(2)
  console.log(uri)

}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
