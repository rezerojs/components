import ProCard, { ProCardProps } from '@ant-design/pro-card';
import { Steps } from 'antd';
import React, {
  createContext,
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import './index.less';

type Fragment = {
  //  组件唯一表示
  key: string;
  // 标题
  tab: string;
  //  表单成员集
  component: ReactNode;
  // 容器样式
  style?: CSSProperties;
};

type IndicatorCardProps = {
  /**
   * @description       指示器类型
   * @default           line
   */
  type?: 'line' | 'card' | 'editable-card' | 'steps';

  /**
   * @description       指示器方向
   * @default           top
   */
  position?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * @description       Child集合
   * @default           []
   */
  fragments: Fragment[];

  /**
   * @description       当前选中下标, 从0开始计数
   * @default           0
   */
  current?: number;

  /**
   * @description       切换回调
   * @default           -
   */
  onChange?: (current: number) => void;

  /**
   * @description       内容
   * @default           -
   */
  children?: ReactNode;
};

interface IndicatorContextType {
  current: number;
  total: number;
  setCurrent?: (index: number) => void;
}

export const IndicatorContext = createContext<IndicatorContextType>({
  current: 0,
  total: 0,
});

function IndicatorCard(
  props: IndicatorCardProps & Omit<ProCardProps, 'tabs' | 'type'>,
) {
  const {
    position = 'top',
    type = 'line',
    fragments,
    current: currentProps = 0,
    onChange,
    children,
  } = props;

  const cardProps: ProCardProps = {
    bordered: false,
    headerBordered: true,
    bodyStyle: { padding: 0 },
  };

  const isSideWay = position === 'left' || position === 'right';

  const [current, setCurrent] = useState(currentProps);

  useEffect(() => {
    setCurrent(currentProps);
  }, [currentProps]);

  const handleChange = (activeKey: string) => {
    const findIndex = fragments.findIndex((item) => item.key === activeKey);
    setCurrent(findIndex);
    onChange?.(findIndex);
  };

  const content = fragments.map((child, index) => {
    if (type === 'steps') {
      return (
        <div
          className={'rem-form-wrapper'}
          key={child.key}
          style={{
            contentVisibility: current === index ? 'visible' : 'hidden',
          }}
        >
          {child.component}
        </div>
      );
    }

    return (
      <ProCard.TabPane
        key={child.key}
        tab={child.tab}
        cardProps={{ bodyStyle: { padding: 0 } }}
      >
        {child.component}
      </ProCard.TabPane>
    );
  });

  const providerValue = { current, setCurrent, total: fragments.length };
  const renderChildren = (
    <IndicatorContext.Provider value={providerValue}>
      {children}
    </IndicatorContext.Provider>
  );

  if (type === 'steps') {
    const arr = [
      <ProCard
        key="step_container"
        bodyStyle={{ padding: 0 }}
        colSpan={isSideWay ? 21 : 24}
      >
        {content}
      </ProCard>,
    ];

    const stepDom = (
      <ProCard colSpan={isSideWay ? 3 : 24} key={'step'}>
        {
          <Steps
            current={current}
            direction={isSideWay ? 'vertical' : 'horizontal'}
            style={{
              height: isSideWay ? '100%' : 'auto',
              width: isSideWay ? 'auto' : '90%',
              margin: '0 auto',
            }}
          >
            {fragments.map((item) => (
              <Steps.Step title={item.tab} key={item.key} />
            ))}
          </Steps>
        }
      </ProCard>
    );

    if (position === 'right' || position === 'bottom') {
      arr.push(stepDom);
    } else {
      arr.unshift(stepDom);
    }

    if (position && position !== 'top') {
      cardProps.split = isSideWay ? 'vertical' : 'horizontal';
    } else {
      cardProps.bodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
      };
    }

    return (
      <ProCard {...cardProps}>
        {arr}
        {renderChildren}
      </ProCard>
    );
  } else {
    cardProps.tabs = {
      activeKey: fragments[current].key,
      tabPosition: position,
      type,
      onChange: handleChange,
    };

    return (
      <ProCard {...cardProps}>
        {content}
        {renderChildren}
      </ProCard>
    );
  }
}

export default IndicatorCard;
