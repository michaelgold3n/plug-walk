import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

import dotenv from "dotenv"
dotenv.config()

const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
    ),
);

(async () => {
    try {
        const address = await sdk.getSigner().getAddress();
        console.log("SDK initialized by address:", address)
    } catch (err) {
        console.error("Failed to get apps from the sdk", err);
        process.exit(1);
    }
})();

export default sdk;