import { useEffect, useState } from 'react';
import { stakingContract } from '../yop/contracts';
import BigNumber from 'bignumber.js'

export default function useContractInfos() {
    const [contractInfos, setContractInfos] = useState({})

    useEffect(() => {
        Promise.all([stakingContract.contract.methods.TVL().call(),
        stakingContract.contract.methods.RewardsOwed().call(),
        stakingContract.contract.methods.RewardPool().call(),
        stakingContract.contract.methods.AllTimeStaked().call()]).then(([tvl, RewardsOwed, RewardPool, AllTimeStaked]) => {
            setContractInfos({
                tvl: new BigNumber(tvl),
                rewardsOwed: new BigNumber(RewardsOwed),
                rewardPool: new BigNumber(RewardPool),
                allTimeStaked: new BigNumber(AllTimeStaked)
            })
        })

    }, [setContractInfos])

    return contractInfos;
}
