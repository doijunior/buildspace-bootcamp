const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    ["Agumon", "Aang", "Pikachu"],       // Names
    ["https://i.imgur.com/MYgkWEz.jpeg", // Images
    "https://i.imgur.com/xVu4vFL.png", 
    "https://i.imgur.com/WMB6g9u.png"],
    [100, 200, 300],                    // HP values
    [100, 50, 25],                       // Attack damage values
    "Black Mamba", // Boss name
    "https://i.imgur.com/U7vuAF8.jpg", // Boss image
    10000, // Boss hp
    50 // Boss attack damage    
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();