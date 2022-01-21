import React, { useState } from 'react';
import { Button, Space, Switch } from 'antd';
import { PopupWindow } from '@rezerojs/components';

export default () => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [mode, setMode] = useState<'modal' | 'drawer'>('modal');

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <Button
          onClick={() => {
            setMode('modal');
            setVisible(true);
          }}
        >
          Open Modal
        </Button>
        <Button
          onClick={() => {
            setMode('drawer');
            setVisible(true);
          }}
        >
          Open Drawer
        </Button>
        <div>
          <>Submitter: </>
          <Switch
            checked={checked}
            onChange={setChecked}
            unCheckedChildren="关闭"
            checkedChildren={'开启'}
          />
        </div>
      </Space>

      <PopupWindow
        mode={mode}
        title={`Basic ${mode}`}
        visible={visible}
        submitter={
          checked
            ? {
                onFinish: () => {},
              }
            : false
        }
        onClose={handleClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </PopupWindow>
    </>
  );
};
