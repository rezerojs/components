## PopupContainer

`PopupContainer`用于维护`child`之间加载(显示/隐藏), 并透传`trigger`方法让`child`之间可以相互通讯(激活, 数据传递)

## 代码演示

<code src="./demos/base.tsx" title="基本" desc="日常结合PopWindow + Submitter + Form 使用"  />

<API></API>

### PopupActionType

| 参数    | 说明       | 类型                                                                                                                    | 默认值 |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- | ------ |
| trigger | 激活 Child | `(key: string, opts?: {params?: any, onFinished?: <T = any> (resp?: T) => void, stopParentFinished?: boolean}) => void` | -      |

## 常见问题

1. 想要阻止 onFinished 往下执行, 请在`trigger`方法第二个参数传递`stopParentFinished: true`即可
2. 唤起另一个窗口有遮挡的情况, 请使用 zIndex 属性解决
