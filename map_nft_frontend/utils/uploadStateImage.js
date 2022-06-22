import { NFT_STORAGE_KEY } from "../constants/nftStorage"
import { NFTStorage } from "nft.storage"

export const uploadStateImage = async (file) => {
  console.log("Uploading state image...")
  const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })
  const cid = await nftStorage.storeBlob(file)

  return cid
}
