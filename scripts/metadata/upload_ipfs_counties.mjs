import { NFTStorage, File } from "nft.storage"
import fs from "fs"
import path from "path"
import mime from "mime"
import dotenv from "dotenv"

dotenv.config()


const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath)
  return new File([content], path.basename(filePath), { type })
}

async function main() {
  const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })

  const files = []
  for (var i = 1; i <= 100; i++) {
    const file_path = `utils/data_counties/${i}.json`
    files.push(await fileFromPath(file_path))
  }

  const cid = await nftStorage.storeDirectory(files)

  console.log(files)
}

main()
