const ethers = require("ethers");
const ssabi = require("./abi/ss.json");

const { ALCHEMY_ID } = process.env;
const mainnetProvider = new ethers.AlchemyProvider("mainnet", ALCHEMY_ID);

const getContract = (type) => {
  let contract;
  switch (type) {
    case "ss":
      contract = new ethers.Contract(
        "0x884Ba86FAA29745b6C40B7098567A393E91335CF",
        ssabi,
        mainnetProvider
      );
      break;
    default:
      throw new Error("No contract for that type.");
  }

  return contract;
};

module.exports = { getContract };
