import { CONTRACT_ADDRESS } from "../constants/state/contractAddress"
import abi from "../constants/state/contractAbi.json"
import { STATE_IMAGE_CONTRACT_ADDRESS } from "../constants/state/stateImageContractAddress"
import { abi as stateAbi } from "../constants/state/stateImageContractAbi.json"
import { useEffect, useState } from "react"
import { formatMapData } from "../utils/formatMapData"
import MapElement from "./MapElement"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { THIRDWEB_IPFS_CID } from "../constants/state/thirdWebIPFSCID"
import { BASE_IPFS } from "../constants/baseIPFS"
import LoadingSpinner from "./LoadingSpinner"

export default function GetUserNFT() {
  const { isWeb3Enabled, account } = useMoralis()

  const [mapData, setMapData] = useState(null)
  const [balance, setBalance] = useState(null)

  const { runContractFunction: getUserNFTBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    params: {
      owner: account,
    },
  })

  const getUserBalance = async () => {
    const balance = await getUserNFTBalance()
    setBalance(balance.toNumber())
  }

  const { runContractFunction: getUserNFTTokenId } = useWeb3Contract()

  const getTokenIdContractOptions = {
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "tokenOfOwnerByIndex",
    params: {
      owner: account,
    },
  }

  const getTokenURI = async (tokenId) => {
    const metadata = await (
      await fetch(BASE_IPFS + THIRDWEB_IPFS_CID + tokenId)
    ).json()
    const metadataURI = metadata.attributes.uri.replace("ipfs://", "")

    const coordsData = await (await fetch(BASE_IPFS + metadataURI)).json()
    // console.log(coordsJSON)
    return coordsData
  }

  const { runContractFunction: getStateImageNFTURI } = useWeb3Contract()

  const getStateImageNFTURIOptions = {
    abi: stateAbi,
    contractAddress: STATE_IMAGE_CONTRACT_ADDRESS,
    functionName: "getStateNftToTokenURI",
    params: {},
  }

  const getImageURI = async (tokenId) => {
    getStateImageNFTURIOptions.params.stateNftId = tokenId

    const stateImageURI = await getStateImageNFTURI({
      params: getStateImageNFTURIOptions,
    })

    return stateImageURI
  }

  const getMapData = async () => {
    let mapData = []
    let images = []
    if (balance > 0) {
      try {
        for (var i = 0; i < balance; i++) {
          getTokenIdContractOptions.params.index = i

          const userTokenId = await getUserNFTTokenId({
            params: getTokenIdContractOptions,
          })

          const coordsData = await getTokenURI(userTokenId.toNumber())
          const imagesData = await getImageURI(userTokenId.toNumber())

          mapData.push(coordsData)
          images.push(imagesData)
        }

        const formattedMapData = formatMapData(mapData, images)
        // console.log(formattedMapData)
        setMapData(formattedMapData)
      } catch (e) {
        console.error(e)
      }
    }
  }

  // console.log(mapData)

  useEffect(() => {
    getMapData()
  }, [account, balance])

  useEffect(() => {
    getUserBalance()
  }, [account, balance])

  return (
    <div className="flex flex-col align-middle">
      {mapData ? <MapElement nftBounds={mapData} /> : <LoadingSpinner />}
    </div>
  )
}
