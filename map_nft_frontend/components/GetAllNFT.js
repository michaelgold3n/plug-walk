import { CONTRACT_ADDRESS } from "../constants/state/contractAddress"
import abi from "../constants/state/contractAbi.json"
import { STATE_IMAGE_CONTRACT_ADDRESS } from "../constants/state/stateImageContractAddress"
import { abi as stateAbi } from "../constants/state/stateImageContractAbi.json"
import { useEffect, useState } from "react"
import { formatMapData } from "../utils/formatMapData"
import MapElement from "./MapElement"
import { ethers } from "ethers"
import { THIRDWEB_IPFS_CID } from "../constants/state/thirdWebIPFSCID"
import { BASE_IPFS } from "../constants/baseIPFS"
import LoadingSpinner from "./LoadingSpinner"

export default function GetAllNFT() {
  const provider = new ethers.providers.AlchemyProvider("maticmum")
  const [mapData, setMapData] = useState(null)

  const mapContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)
  const stateImageContract = new ethers.Contract(
    STATE_IMAGE_CONTRACT_ADDRESS,
    stateAbi,
    provider
  )

  const totalSupply = async () => {
    const supplyClaimed = await mapContract.totalSupply()
    return supplyClaimed.toNumber()
  }

  const getTokenURI = async (tokenId) => {
    const metadata = await (
      await fetch(BASE_IPFS + THIRDWEB_IPFS_CID + tokenId)
    ).json()
    const metadataURI = metadata.attributes.uri.replace("ipfs://", "")

    const coordsData = await (await fetch(BASE_IPFS + metadataURI)).json()
    // console.log(coordsData)
    return coordsData
  }

  const getImageURI = async (tokenId) => {
    const stateImageURI = stateImageContract
      .getStateNftToTokenURI(tokenId)
      .then(
        (result) => {
          return result
        },
        (error) => {
          return undefined
        }
      )

    return stateImageURI
  }

  const getAllNFT = async () => {
    const supplyClaimed = await totalSupply()
    let mapData = []
    let images = []

    if (supplyClaimed > 0) {
      try {
        for (var i = 0; i < supplyClaimed; i++) {
          const coordData = await getTokenURI(i)
          const imagesData = await getImageURI(i)

          mapData.push(coordData)
          images.push(imagesData)
        }
        const combinedMapData = formatMapData(mapData, images)
        // console.log(combinedMapData)
        setMapData(combinedMapData)
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    getAllNFT()
  }, [])

  return (
    <div className="flex flex-col align-middle">
      {mapData ? <MapElement nftBounds={mapData} /> : <LoadingSpinner />}
    </div>
  )
}
