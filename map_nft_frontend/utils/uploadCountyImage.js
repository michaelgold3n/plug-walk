import { NFT_STORAGE_KEY } from "../constants/nftStorage"
import { NFTStorage } from "nft.storage"

export const uploadCountyImage = async (file) => {
  console.log("Uploading county image...")
  const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })
  const cid = await nftStorage.storeBlob(file)

  return cid
}
