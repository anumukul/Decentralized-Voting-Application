require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { API_URL, PRIVATE_KEY } = process.env;

const networks = {
  hardhat: {},
};
if (API_URL && PRIVATE_KEY) {
  networks.sepolia = {
    url: API_URL,
    accounts: [`0x${PRIVATE_KEY}`],
  };
}

module.exports = {
  solidity: '0.8.11',
  defaultNetwork: networks.sepolia ? 'sepolia' : 'hardhat',
  networks,
};
