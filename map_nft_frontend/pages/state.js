import Header from "../components/Header"
import { useMoralis } from "react-moralis"
import MapElement from "../components/MapElement"
import GetAllNFT from "../components/GetAllNFT"
import MintNFT from "../components/MintNFT"
import GetUserNFT from "../components/GetUserNFT"
import Description from "../components/Description"


export default function Home() {
  const { isWeb3Enabled, account } = useMoralis()
  
  return (
    <div>
      <Header />
      {isWeb3Enabled && account ? (
        <div>
          <div className="flex flex-col items-center justify-center">
            <MintNFT />
            <GetUserNFT />
          </div>
        </div>
      ) : (
        <div className="font-bold">
          <GetAllNFT />
        </div>
      )}

<div className="flex flex-col items-center justify-center">
         <Description />
            </div>
    </div>
  )
}
