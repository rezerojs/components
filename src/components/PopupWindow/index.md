## PopupWindow

`PopupWindow` 在 `antd`的`Modal,Drawer`组件上进行了一层封装，整合了 API, 保持一致性, 移除 footer 相关属性, 如需事件操作, 请通过[submitter 参数](/widget/submitter)使用。

结合[PopupContainer](/widget/popup-container)使用, 自动实现 visible 状态维护以及多个 PopupWindow 模块间通讯(唤醒, 数据传递)

### 代码演示

<code src="./demos/base.tsx" title="基本" desc="默认实现" />

### API

这里只列出扩展 api, 支持 [Modal](https://ant-design.gitee.io/components/modal-cn/#API) 部分属性, 涉及到 footer 相关属性将无效。

<API hideTitle></API>
