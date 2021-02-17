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

            if (!new BigNumber(stakerInfoResponse[0]).isZero()) {
                const [rewardResponse, ...stakedFor] = await Promise.all([
                    stakingContract.contract.methods.calculateReward(address).call(),
                    stakingContract.contract.methods.stakedFor1().call(),
                    stakingContract.contract.methods.stakedFor2().call(),
                    stakingContract.contract.methods.stakedFor3().call(),
                ])

                console.log('stakerInfoResponse', stakerInfoResponse);
                const option = parseInt(stakerInfoResponse[2], 10)
                const stakingTime = parseInt(stakerInfoResponse[1], 10)
                const stakedForNumbers = stakedFor.map(value => parseInt(value, 10))

                const startOfStakeMillis = stakingTime * 1000
                const endOfStakeMillis = (stakedForNumbers[option] + stakingTime) * 1000
                setStakerInfo({
                    hasStaked: true,
                    amount: new BigNumber(stakerInfoResponse[0]),
                    stakingTime,
                    startOfStakeMillis,
                    endOfStakeMillis,
                    startOfStake: new Date(startOfStakeMillis),
                    endOfStake: new Date(endOfStakeMillis),
                    option,
                    rewardTaken: stakerInfoResponse[3],
                    reward: new BigNumber(rewardResponse)
                })
            }
        }
        fetchStakerInfo()
    }, [setStakerInfo, address])

    return stakerInfo;
}
