import { IndicatorCard } from '@rezerojs/components';
import { Card, Radio } from 'antd';
import React, { useState } from 'react';

const options = [
  { label: 'line', value: 'line' },
  { label: 'card', value: 'card' },
  { label: 'editable-card', value: 'editable-card' },
  { label: 'steps', value: 'steps' },
];

const positionOptions = [
  { label: 'top', value: 'top' },
  { label: 'right', value: 'right' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' },
];

function Tab1() {
  return (
    <Card
      style={{
        backgroundColor: 'red',
        height: '200px',
        color: 'white',
      }}
    >
      TAB 1
    </Card>
  );
}

function Tab2() {
  return (
    <Card
      style={{
        backgroundColor: 'blue',
        height: '200px',
        color: 'white',
      }}
    >
      TAB 2
    </Card>
  );
}

function Tab3() {
  return (
    <Card
      style={{
        backgroundColor: 'green',
        height: '200px',
        color: 'white',
      }}
    >
      TAB 3
    </Card>
  );
}

export default () => {
  const [type, setType] = useState<any>('line');
  const [position, setPosition] = useState<any>('top');

  return (
    <div>
      <div style={{ paddingBottom: 8 }}>
        <span style={{ paddingRight: 8 }}>类型:</span>
        <Radio.Group
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={options}
        />
      </div>

      <div style={{ paddingBottom: 8 }}>
        <span style={{ paddingRight: 8 }}>方向:</span>
        <Radio.Group
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          options={positionOptions}
        />
      </div>
      <IndicatorCard
        type={type}
        position={position}
        fragments={[
          {
            key: 'tab1',
            tab: 'sub1',
            component: Tab1,
          },
          {
            key: 'tab2',
            tab: 'sub2',
            component: Tab2,
          },
          {
            key: 'tab3',
            tab: 'sub3',
            component: Tab3,
          },
        ]}
      />
    </div>
  );
};
