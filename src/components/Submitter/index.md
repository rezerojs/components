## Submitter

Submitter 针对按钮操作上进行了一层封装, 提供表单提交、分布表单提交形式的预设行为, 省却繁琐的状态维护。

## 代码演示

<div style="width: 100%; display: flex;">

<div style="flex: 1;">
    <code src="./demos/base.tsx" title="基本" desc="结合表单实现" />
</div>

<div style="flex: 1; padding: 0 24px">
    <code src="./demos/step.tsx" title="结合分布表单方式实现" desc="`Submitter`默认同步`IndicatorCard`组件数据, 只需要关注对应的回调即可, 其余的请交给`Submitter`来维护" />
</div>

</div>

<API></API>

## 常见问题

1. 如果不想显示返回上一步, 设置`prevDom=false`即可
