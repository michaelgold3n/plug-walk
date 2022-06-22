const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory("CountyImages")
    const contract = await contractFactory.deploy()
    await contract.deployed()
  
    console.log("County Image NFT contract deployed at:", contract.address)  
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
  