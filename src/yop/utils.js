const { web3, connector } = require('./web3');
const BigNumber = require('bignumber.js');

const sendTransaction = async (connectType, fromAddress, toAddress, encodedABI, /*gasLimit,*/ wei = `0x0`) => {
  if (connectType === 'metamask') {
    const web3 = window.web3;
    if (window.ethereum && web3) {
      try {
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: fromAddress,
          to: toAddress,
          // gas: gasLimit,
          gasPrice: web3.utils.toHex(gasPrice),//`0xAB5D04C00`,
          // chainId: 3,
          data: encodedABI,
          value: wei
        };

        return new Promise((resolve, reject) => {
          web3.eth.sendTransaction(tx)
            .on('transactionHash', (hash) => { console.log('hash: ', hash) })
            .on('receipt', (receipt) => {
              resolve(receipt);
            })
            .on('error', (err) => {
              reject(err);
            });
        });
      } catch (err) {
        console.log('err :>> ', err);
        return null;
      }
    } else {
      return null;
    }
  } else if (connectType === 'walletConnect') {
    if (connector.connected) {
      try {
        const tx = {
          from: fromAddress,
          to: toAddress,
          // gas: gasLimit,
          // chainId: 3,
          data: encodedABI,
          value: wei
        };

        return new Promise((resolve, reject) => {
          connector.sendTransaction(tx)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } catch (err) {
        console.log('err :>> ', err);
        return null;
      }
    } else {
      return null;
    }
  }
}

const bnToDec = (bn, decimals = 18) => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

const bnDivdedByDecimals = (bn, decimals = 18) => {
  return bn.dividedBy(new BigNumber(10).pow(decimals))
}

const bnMultipledByDecimals = (bn, decimals = 18) => {
  return bn.multipliedBy(new BigNumber(10).pow(decimals))
}

const decToBn = (dec, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

const getETHBalance = async (address) => {
  var result;
  await web3.eth.getBalance(address, (err, balance) => {
    result = new BigNumber(balance);
  });
  return result;
}

const formatDecimal = (value, decimal = 18, numPoint = 4) => {
  BigNumber.config({
    DECIMAL_PLACES: 18,
    FORMAT: {
      // string to prepend
      prefix: '',
      // decimal separator
      decimalSeparator: '.',
      // grouping separator of the integer part
      groupSeparator: ',',
      // primary grouping size of the integer part
      groupSize: 3,
    }
  });

  const data = new BigNumber(value).dividedBy(new BigNumber(10).pow(decimal));
  if (data.isGreaterThan(1)) {
    return data.toFormat(2);
  }
  return data.toFormat(numPoint);
}

const getHashLink = (networkId, txHash) => {
  let url = 'https://';
  if (networkId === '1') {
    url += `etherscan.io/tx/${txHash}`;
  } else if (networkId === '3') {
    url += `ropsten.etherscan.io/tx/${txHash}`;
  } else {
    url += `etherscan.io`;
  }
  return url;
}

export {
  sendTransaction,
  bnToDec,
  bnDivdedByDecimals,
  bnMultipledByDecimals,
  decToBn,
  formatDecimal,
  getETHBalance,
  getHashLink,
};
