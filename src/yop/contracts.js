/* eslint-disable quote-props */
/* eslint-disable max-len */
const YopTokenAbi = require('./abis/YopToken.json');
const StakingAbi = require('./abis/Staking.json');
const config = require('../config');
const networkId = config.networkId;
const { web3 } = require('./web3');
const {
  contractAddresses,
} = require('./constants');

const yopTokenAddress = contractAddresses['yopToken'][networkId]
const yopTokenAbiContract = new web3.eth.Contract(YopTokenAbi, yopTokenAddress);
const stakingAddress = contractAddresses['staking'][networkId]
const stakingAbiContract = new web3.eth.Contract(StakingAbi, stakingAddress);

module.exports = {
  yopTokenContract: {
    address: yopTokenAddress,
    contract: yopTokenAbiContract
  },
  stakingContract: {
    address: stakingAddress,
    contract: stakingAbiContract
  },
};

