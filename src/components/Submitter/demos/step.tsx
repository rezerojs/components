import React, { useState } from 'react';
import { IndicatorCard, Submitter } from '@rezerojs/components';
import { Card, Form } from 'antd';

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
  return (
    <IndicatorCard
      type={'steps'}
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
    >
      <Submitter
        onFinish={(current) => {
          console.log('------onFinish--------');
        }}
        onFinishFailed={(error) => {
          console.log('------onFinishFailed--------');
          console.log(error);
        }}
      />
    </IndicatorCard>
  );
};
