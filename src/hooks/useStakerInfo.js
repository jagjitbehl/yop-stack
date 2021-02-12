import { useEffect, useState } from 'react';
import { stakingContract } from '../yop/contracts';
import BigNumber from 'bignumber.js'

export default function useStakerInfo(address) {
    const [stakerInfo, setStakerInfo] = useState({ hasStaked: false })

    useEffect(() => {
        const fetchStakerInfo = async () => {
            if (!address) {
                return
            }
            const stakerInfoResponse = await stakingContract.contract.methods.getStakerInfo(address).call()
            const rewardResponse = await stakingContract.contract.methods.calculateReward(address).call()
            setStakerInfo({
                hasStaked: true,
                amount: new BigNumber(stakerInfoResponse[0]),
                stakingTime: parseInt(stakerInfoResponse[1], 10),
                option: parseInt(stakerInfoResponse[2], 10),
                rewardTaken: stakerInfoResponse[3],
                reward: new BigNumber(rewardResponse)
            })
        }
        fetchStakerInfo()
    }, [setStakerInfo, address])

    return stakerInfo;
}
