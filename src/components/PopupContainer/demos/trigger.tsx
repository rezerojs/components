import React, { useRef } from 'react';
import { PopupContainer, PopupWindow } from '@rezerojs/components';
import { Button, Divider, Space } from 'antd';
import { PopupAction } from '../index';

function FirstModal(props: PopupAction<{ message: string }>) {
  return (
    <PopupWindow title={'First Modal'} zIndex={10002}>
      <p>this my first modal.</p>
      <Divider />
      <p>second: {props.params?.message}</p>
    </PopupWindow>
  );
}

function SecondModal(props: PopupAction<{ message: string }>) {
  const handleMessage = () => {
    props.trigger?.('First', { params: { message: 'Hello first!' } });
  };

  return (
    <PopupWindow title={'Second Modal'} zIndex={10001}>
      <p>this my second modal.</p>
      <Divider />
      <p>{props.params?.message}</p>
      <Button onClick={handleMessage}>{'Send message to first >'}</Button>
    </PopupWindow>
  );
}

export default () => {
  const popupRef = useRef<any>();

  return (
    <div>
      <Space>
        <Button onClick={() => popupRef.current?.trigger('First')}>
          First Modal
        </Button>
        <Button onClick={() => popupRef.current?.trigger('Second')}>
          Second Modal
        </Button>
      </Space>
      <PopupContainer
        popupRef={popupRef}
        popups={[
          { key: 'First', component: <FirstModal /> },
          { key: 'Second', component: <SecondModal /> },
        ]}
      />
    </div>
  );
};
