import React, {useState} from 'react'
import { Range } from 'react-range';

import '../style/rangeBar.css'

const MAX = 40;
const MIN = 5;

function RangeBar({onChange}) {
  const [value, setValue] = useState([5]);
  return (
    <div className="range-slider-wrapper">
      <div className="range-slider">
        <p className="min-label">{MIN}</p>
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={value}
          onChange={(values) => {
            setValue(values);
            onChange(values[0]);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '8px',
                width: '100%',
                backgroundColor: '#ccc'
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '15px',
                width: '15px',
                borderRadius: '10px',
                backgroundColor: '#664aff'
              }}
            />
          )}
        />
        <p className="max-label">{MAX}</p>
      </div>
      <h4 className="current-value">{`${value}x${value}`}</h4>
    </div>
  )
}

export default RangeBar
