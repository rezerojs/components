import { Drawer, Modal, ModalProps } from 'antd';
import React, { CSSProperties, ReactNode, useContext } from 'react';
import { PopupContainerContext } from '../PopupContainer';
import Submitter, { SubmitterProps } from '../Submitter';
import './index.less';

export type PopupWindowProps = {
  /**
   * @description       弹出类型
   * @default           modal
   */
  mode?: 'modal' | 'drawer';

  /**
   * @description       关闭回调
   * @default           -
   */
  onClose?: () => void;

  /**
   * @description       内容
   * @default           -
   */
  children?: ReactNode;

  /**
   * @description       事件组件
   * @default           -
   */
  submitter?: SubmitterProps | false;
} & Omit<
  ModalProps,
  | 'onCancel'
  | 'cancelButtonProps'
  | 'okButtonProps'
  | 'cancelText'
  | 'confirmLoading'
  | 'footer'
  | 'okText'
  | 'okType'
  | 'onOk'
>;

const defaultBodyStyle: CSSProperties = {
  padding: '24px',
  fontSize: '14px',
  lineHeight: '1.5715',
  wordWrap: 'break-word',
};

const drawerBodyStyle: CSSProperties = {
  padding: 0,
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  height: '100vh',
};

export default function PopupWindow(props: PopupWindowProps) {
  const {
    mode = 'modal',
    children,
    onClose,
    bodyStyle = defaultBodyStyle,
    width = 550,
    submitter,
    ...rest
  } = props;

  const { onClose: onContextClose, visible } = useContext(
    PopupContainerContext,
  );

  const modalProps: PopupWindowProps = { visible, width, ...rest };

  const handleClose = () => {
    if (onClose) {
      onClose?.();
    } else {
      onContextClose?.();
    }
  };

  return mode === 'drawer' ? (
    <Drawer {...modalProps} onClose={handleClose} bodyStyle={drawerBodyStyle}>
      <div className={'rem-popup-window-container-drawer'}>
        <div style={bodyStyle}>{children}</div>
      </div>
      {submitter && (
        <Submitter
          className={'rem-popup-window-submitter'}
          onCancel={handleClose}
          {...submitter}
        />
      )}
    </Drawer>
  ) : (
    <Modal
      {...modalProps}
      footer={
        submitter ? <Submitter onCancel={handleClose} {...submitter} /> : false
      }
      bodyStyle={bodyStyle}
      onCancel={handleClose}
    >
      {children}
    </Modal>
  );
}
