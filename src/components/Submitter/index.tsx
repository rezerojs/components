import React, {
  CSSProperties,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Button, Space } from 'antd';
import { PopupContainerContext } from '../PopupContainer';
import { IndicatorContext } from '../IndicatorCard';

export interface SubmitterProps {
  /**
   * @description       取消按钮回调
   * @default           -
   */
  onCancel?: () => void;

  /**
   * @description       返回上一步回调
   * @default           -
   */
  onPrev?: (current: number) => void;

  /**
   * @description       onFinish触发前钩子, 推荐用于表单数据校验等场景
   * @default           -
   */
  beforeFinish?: (current: number) => void;

  /**
   * @description       提交回调事件, 推荐用于表单的提交服务器等场景
   * @default           -
   */
  onFinish: (current: number) => void;

  /**
   * @description       onFinish触发后钩子, 推荐用于表单完成后续的操作场景
   * @default           -
   */
  afterFinish?: (current: number, goto?: (index: number) => void) => void;

  /**
   * @description       onFinish失败触发钩子, 这里包括beforeFinish, afterFinish都会进来这里
   * @default           -
   */
  onFinishFailed?: (error: any, current?: number) => void;

  /**
   * @description       类名
   * @default           -
   */
  className?: string;

  /**
   * @description       样式对象
   * @default           -
   */
  style?: CSSProperties;

  /**
   * @description       自定义返回按钮
   * @default           -
   */
  cancelDom?: ReactNode | boolean;

  //
  /**
   * @description       自定义上一步按钮
   * @default           -
   */
  prevDom?: ReactNode | boolean;

  /**
   * @description       自定义下一步按钮
   * @default           -
   */
  nextDom?: ReactNode;

  /**
   * @description       自定义提交按钮
   * @default           -
   */
  okDom?: ReactNode;

  /**
   * @description       自定义渲染
   * @default           -
   */
  customRender?: (
    cancelDom: ReactNode,
    okDom: ReactNode,
    nextDom: ReactNode,
    prevDom?: ReactNode,
  ) => JSX.Element;
}

export default function Submitter(props: SubmitterProps) {
  const {
    cancelDom: cancelDomProps,
    prevDom: prevDomProps,
    nextDom: nextDomProps,
    okDom: okDomProps,
    onCancel,
    onPrev,
    className,
    style,
    customRender,
    beforeFinish,
    onFinish,
    afterFinish,
    onFinishFailed,
  } = props;

  const [isLoading, setLoading] = useState(false);

  const { onFinished } = useContext(PopupContainerContext);
  const { current, setCurrent, total } = useContext(IndicatorContext);

  const handlePrev = async () => {
    if (onPrev) {
      await onPrev?.(current);
    } else {
      setCurrent?.(current - 1);
    }
  };

  const handleCancel = async () => {
    onCancel?.();
  };

  const handleAfterFinish = (res: any) => {
    if (afterFinish) {
      afterFinish?.(current, setCurrent);
    } else {
      const isNext = current < total - 1;
      if (isNext) {
        setCurrent?.(current + 1);
      } else {
        onFinished?.(res);
      }
    }
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      await beforeFinish?.(current);
      const res = await onFinish?.(current);
      await handleAfterFinish(res);
    } catch (err) {
      onFinishFailed?.(err, current);
    } finally {
      setLoading(false);
    }
  };

  const cancelDom = useMemo(() => {
    if (current === 0 && cancelDomProps != false) {
      return (
        <div key="back" onClick={handleCancel}>
          {cancelDomProps || <Button disabled={isLoading}>取 消</Button>}
        </div>
      );
    }
    return;
  }, [current, cancelDomProps, isLoading]);

  const prevDom = useMemo(() => {
    if (current > 0 && prevDomProps != false) {
      return (
        <div key="prev" onClick={handlePrev}>
          {prevDomProps || <Button disabled={isLoading}>上一步</Button>}
        </div>
      );
    }
    return;
  }, [current, prevDomProps, isLoading]);

  const okDom = useMemo(() => {
    const isNext = total > 1 && current < total - 1;
    return (
      <div key="submit" onClick={handleFinish}>
        {okDomProps || (
          <Button type="primary" loading={isLoading}>
            {isNext ? '下一步' : '确定'}
          </Button>
        )}
      </div>
    );
  }, [current, total, nextDomProps, okDomProps, isLoading]);

  return customRender ? (
    customRender(cancelDom, okDom, okDom, prevDom)
  ) : (
    <div className={className} style={style}>
      <Space>
        {cancelDom}
        {prevDom}
        {okDom}
      </Space>
    </div>
  );
}
