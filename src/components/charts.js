import React, { useState, PureComponent } from 'react';
import styled from '@emotion/styled'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
import {
  rankedDraftPayouts,
  traditionalDraftPayouts,
  premierDraftPayouts
} from '../utils/constants';
import {
  estimateRankedPayout,
  estimateTraditionalDraftPayout
} from '../utils/simulation';

const FormatOptions = styled.div({
  display: 'flex',
  flexDirection: 'column',
  color: '#ffffff'
});
const radioStyles = {
  margin: '10px'
};
const data = [
  {
    name: '0%', gems: 2400, 
  },
  {
    name: '10%', gems: 1398,
  },
  {
    name: '20%', gems: 9800,
  },
  {
    name: '30%', gems: 3908,
  },
  {
    name: '40%', gems: 4800,
  },
  {
    name: '50%', gems: 3800,
  },
  {
    name: '60%', gems: 4300,
  },
  {
    name: '70%', gems: 4300,
  },
  {
    name: '80%', gems: 4300,
  },
  {
    name: '90%', gems: 4300,
  },
  {
    name: '100%', gems: 4300,
  },
];
const makeData = format => {
  let data = [];
  let payoutMap;
  let estimateFunc;
  switch(format) {
    case 'premiumDraft':
      payoutMap = premierDraftPayouts;
      estimateFunc = estimateRankedPayout;
      break;
    case 'traditionalDraft':
      payoutMap = traditionalDraftPayouts;
      estimateFunc = estimateTraditionalDraftPayout;
      break;
    default:
      payoutMap = rankedDraftPayouts;
      estimateFunc = estimateRankedPayout;
  }
  for (let i = 0; i <= 10; i++) {
    const newData = {
      name: `${i * 10}%`,
      gems: estimateFunc((i / 10), payoutMap).gems,
      packs: estimateFunc((i / 10), payoutMap).packs
    }
    data.push(newData);
  }
  return data;
}

const Charts = () => {
  const [format, setFormat] = useState('quickDraft');
  const handleOptionChange = e => setFormat(e.target.value);
  const data = makeData(format);
  console.log(data);
  return (
    <div>
      <div>
        <LineChart
          width={550}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="gems" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
      <div>
        <LineChart
          width={550}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="packs" stroke="#F47C44" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
      <form>
        <FormatOptions>
          <label>
            <input
              type='radio'
              value='quickDraft'
              checked={format === 'quickDraft'}
              onChange={handleOptionChange}
              style={radioStyles}
            />
            Quick Draft
          </label>
          <label>
            <input
              type='radio'
              value='premiumDraft'
              checked={format === 'premiumDraft'}
              onChange={handleOptionChange}
              style={radioStyles}
            />
            Premium Draft
          </label>
          <label>
            <input
              type='radio'
              value='traditionalDraft'
              checked={format === 'traditionalDraft'}
              onChange={handleOptionChange}
              style={radioStyles}
            />
            Traditional Draft
          </label>
        </FormatOptions>
      </form>
    </div>
  )
};

export default Charts;