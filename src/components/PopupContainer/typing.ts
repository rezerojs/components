import { ReactNode } from 'react';

export type PopupActionType = {
  /**
   * @description       激活Child
   * @default           -
   */
  trigger: (
    key: string,
    opts?: {
      //  传递数据
      params?: any;
      //  当前child完成时回调(child在处理完某个事件的回调, 例如表单提交成功后触发)
      onFinished?: <T = any>(resp?: T) => void;
      //  终止当前child回调Container事件
      stopParentFinished?: boolean;
    },
  ) => void;
};

export type PopupContainerProps = {
  /**
   * @description     给予popups child激活后的回调钩子
   * @default         -
   */
  onFinished?: (key: string, resp?: any) => void;

  children?: ReactNode | undefined;
};

export type PopupContainerContextType = {
  //  显示
  visible?: boolean;
  //  当前child完成时回调(child在处理完某个事件的回调, 例如表单提交成功后触发)
  onFinished?: <T = any>(resp?: T) => void;
  //  终止当前child回调顶层事件(onFinished)
  stopParentFinished?: boolean;
  // 数据
  params?: any;
  //  关闭回调
  onClose?: () => void;
};
