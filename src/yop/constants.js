export const contractAddresses = {
  yopToken: {
    1: process.env.REACT_APP_MAIN_YOP_TOKEN_ADDRESS || '',
    3: process.env.REACT_APP_TEST_YOP_TOKEN_ADDRESS || '',
  },
  staking: {
    1: process.env.REACT_APP_MAIN_STAKING_ADDRESS || '',
    3: process.env.REACT_APP_TEST_STAKING_ADDRESS || '',
  },
}
