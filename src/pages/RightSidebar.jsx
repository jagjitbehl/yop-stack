import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  formatDecimal,
  getHashLink,
  getContractLink,
  getRoundFigure,
} from '../yop/utils';
import {
  Container, Row, Col, Input,
} from 'reactstrap';

const data = [
  {
    "pv": 0,
    "amt": 0
  },
  {
    "pv": 5,
    "amt": 5
  },
  {
    "pv": 8,
    "amt": 8
  },
  {
    "pv": 15,
    "amt": 15
  },
  {
    "pv": 15,
    "amt": 15
  },
  {
    "pv": 20,
    "amt": 20
  },
];

export function RightSidebar({
	stakerInfos,
	contractInfos,
  className,
}) {

  const {
    rewardsOwed,
    rewardPool,
    tvl,
  } = contractInfos;

  const {
    rewardTaken,
    hasStaked,
  } = stakerInfos;

  const rewardsRemaining = rewardsOwed && rewardPool ? (rewardPool - rewardsOwed) : 0;

  return (
    <Col md="3" xs="12">
	    <div className="ypBox ypBox--rBlock text-center h-md-100">
	      <div className="ypBox__block ypBox__block--border">
	        <div className="yBoxSmall">
	          <h5>Total Reward</h5>
	          <p>{getRoundFigure(formatDecimal(rewardPool, 8))}</p>
	        </div>
	      </div>
	      <div className="ypBox__block ypBox__block--border">
	        <div className="yBoxSmall">
	          <h5>Reward Remaining</h5>
	          <p>{getRoundFigure(formatDecimal(rewardsRemaining, 8))}</p>
	        </div>
	      </div>
	      <div className="ypBox__block">
	        <div className="yBoxSmall">
	          <h5>TVL</h5>
	          <p>{getRoundFigure(formatDecimal(tvl, 8))}</p>
	        </div>
	      </div>
	      <div className="ypBox__blockmb-0">
	        <div className={`graph ${className || ''}`}>
	        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
	          <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
	            <XAxis dataKey="name" tick={false} stroke="#cccccc" />
	            <Line type="monotone" dataKey="pv" stroke="#9900FF" dot={false} />
	          </LineChart>
	        </ResponsiveContainer>
	        </div>
	      </div>
	    </div>
	  </Col>
  )
}

export default RightSidebar;