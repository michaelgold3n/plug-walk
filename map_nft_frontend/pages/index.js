import Header from "../components/Header"
import { useMoralis } from "react-moralis"
import MapElement from "../components/MapElement"
import GetAllNFT from "../components/county/GetAllNFT"
import MintNFT from "../components/county/MintNFT"
import GetUserNFT from "../components/county/GetUserNFT"

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
    </div>
  )
}
