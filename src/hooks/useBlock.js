import { useEffect, useState } from 'react'
import { web3 } from '../yop/web3';

const useBlock = () => {
  const [block, setBlock] = useState(0);
  useEffect(() => {
    if (!web3) return;

    const interval = setInterval(async () => {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber);
      }
    }, window.etherem ? 2000 : 60000);

    return () => clearInterval(interval);
  }, [web3]);

  return block;
}

export default useBlock;
