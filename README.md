# Mini-Vue

这是一个简化版的 Vue.js 实现，用于学习和理解 Vue.js 的核心原理。项目使用 TypeScript 编写，实现了 Vue.js 的核心功能。

## 核心功能

### 1. 响应式系统 (Reactivity)

响应式系统是 Vue.js 最核心的特性之一，通过 Proxy 实现对数据的响应式处理。

#### 主要模块：

- **reactive.ts**: 实现响应式对象
  - 使用 Proxy 拦截对象的 get/set 操作
  - 在 get 时收集依赖
  - 在 set 时触发更新

- **effect.ts**: 实现副作用函数
  - 依赖收集：track 函数
  - 触发更新：trigger 函数
  - 支持嵌套的响应式效果

### 2. 运行时核心 (Runtime Core)

实现了 Vue.js 的运行时核心功能，包括组件的创建、渲染等。

#### 主要模块：

- **createApp.ts**: 创建 Vue 应用实例
  - 提供 mount 方法用于挂载组件
  - 处理组件的渲染逻辑

- **h.ts**: 创建虚拟节点的辅助函数
  - 简化虚拟节点的创建过程
  - 支持多种参数形式

- **vnode.ts**: 虚拟节点的实现
  - 定义虚拟节点的数据结构
  - 支持组件和普通元素的表示

## 项目结构

```
src/
├── reativity/
│   ├── effect.ts     # 副作用实现
│   ├── reactive.ts   # 响应式对象实现
│   └── tests/        # 测试文件
└── runtime-core/
    ├── component.ts   # 组件实现
    ├── createApp.ts   # 创建应用实例
    ├── h.ts          # 创建虚拟节点
    └── vnode.ts      # 虚拟节点实现
```

## 使用方法

1. 安装依赖：
```bash
npm install
```

2. 运行测试：
```bash
npm test
```

3. 构建项目：
```bash
npm run build
```

## 学习要点

1. **响应式原理**
   - Proxy 的使用方法
   - 依赖收集与触发更新的实现
   - 副作用函数的处理

2. **虚拟 DOM**
   - 虚拟节点的设计
   - 渲染过程的实现

3. **组件系统**
   - 组件的创建和更新
   - 组件生命周期的管理

## 注意事项

- 这是一个用于学习的简化实现，不建议在生产环境中使用
- 项目持续开发中，部分功能可能尚未完善

## 贡献指南

欢迎贡献代码或提出建议！请遵循以下步骤：

1. Fork 本仓库
2. 创建新的分支
3. 提交你的更改
4. 创建 Pull Request

## 许可证

[MIT License](LICENSE)
