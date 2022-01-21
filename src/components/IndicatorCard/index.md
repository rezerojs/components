## IndicatorCard

基于[ProCard](https://procomponents.ant.design/components/card)组件做进一步封装, 在它的基础上, 整合`antd steps`组件, 提供更简易的模板实现, 搭配`Submitter`使用更佳, 具体查看[Submitter 示例](/widget/submitter)。

<code src="./demos/base.tsx" />

## API

这里只展示扩展字段, 更多支持字段请移步[ProCard API](https://procomponents.ant.design/components/card#api)

| 参数      | 说明                        | 类型                                           | 默认值 |
| --------- | --------------------------- | ---------------------------------------------- | ------ |
| type      | 指示器类型                  | `line` \| `card` \| `editable-card` \| `steps` | `line` |
| position  | 指示器方向                  | `top` \| `right` \| `bottom` \| `left`         | `top`  |
| fragments | Child 集合                  | `Fragment[]`                                   | `[]`   |
| current   | 当前选中下标, 从 0 开始计数 | `number`                                       | `0`    |
| onChange  | 切换回调                    | `(current: number) => void`                    | `0`    |
| children  | 内容                        | `FC` \| `ReactNode`                            | `-`    |
