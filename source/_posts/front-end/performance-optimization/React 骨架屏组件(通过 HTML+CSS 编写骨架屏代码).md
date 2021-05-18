---
title: React 骨架屏组件(通过 HTML+CSS 编写骨架屏代码)
tag: 性能优化
catogory:
  - front-end
  - 性能优化
  - 骨架屏
  - React 骨架屏组件(通过 HTML+CSS 编写骨架屏代码)
password: yuzhenliu
---

# React 骨架屏组件(通过 HTML+CSS 编写骨架屏代码)

## 骨架屏是什么?

可参考文章 骨架屏介绍

## 效果

### 基本使用

![image](/assets/images/performance-optimization/01.jpg)

```tsx
import React from "react";
import { Skeleton } from "../Skeleton";
export default () => {
  return <Skeleton />;
};
```

### 组合使用

![image](/assets/images/performance-optimization/02.jpg)

```tsx
import React from "react";
import { Skeleton } from "../Skeleton";
export default () => {
  return (
    <Skeleton
      avatar
      paragraph={{ rows: 4 }}
      image={{ color: "#bbb", size: 99 }}
    />
  );
};
```

### Avatar/Button/Input/Element/Image 使用

![image](/assets/images/performance-optimization/03.jpg)

```tsx
import React, { useState } from "react";
import { RadioGroup, Radio, Input, Form, Switch } from "../components";
import { Skeleton } from "../Skeleton";

export default () => {
  const [active, setActive] = useState<boolean>(true); // 是否显示动画
  const [size, setSize] = useState<any>("default");
  const [shape, setShape] = useState<any>("circle");
  const [imageSize, setImageSize] = useState<string>("96"); // 图片尺寸
  const [imageShowSize, setImageShowSize] = useState<number>(96); // 图片显示尺寸
  const [imageColor, setImageColor] = useState<string>("#bfbfbf"); // 图片颜色
  const [imageShowColor, setImageShowColor] = useState<string>("#bfbfbf"); // 图片显示颜色
  const [rows, setRows] = useState<string>("2"); // 段落行数
  const [showRows, setShowRows] = useState<number>(2); // 段落显示行数

  return (
    <Form>
      <Form.Item label="是否启用动画">
        <Switch value={active} onChange={setActive}>
          {active ? "已启用" : "未启用"}
        </Switch>
      </Form.Item>
      <Form.Item label="Avatar/Button/Input/Element尺寸">
        <RadioGroup value={size} onChange={setSize}>
          <Radio name="default">default</Radio>
          <Radio name="large">large</Radio>
          <Radio name="small">small</Radio>
        </RadioGroup>
      </Form.Item>
      <Form.Item label="Avatar/Button/Input/Element/Image/Paragraph形状">
        <RadioGroup value={shape} onChange={setShape}>
          <Radio name="default">default(all)</Radio>
          <Radio name="square">square(all)</Radio>
          <Radio name="circle">circle(Avatar/Element/Image)</Radio>
          <Radio name="round">round(Button/Element)</Radio>
        </RadioGroup>
      </Form.Item>
      <Form.Item label="图片尺寸(Skeleton.Image)">
        <Input
          placeholder="请输入图片尺寸"
          value={imageSize}
          onChange={setImageSize}
          onBlur={() => setImageShowSize(Number(imageSize))}
        />
      </Form.Item>
      <Form.Item label="图片颜色(Skeleton.Image)">
        <Input
          placeholder="请输入图片颜色"
          value={imageColor}
          onChange={setImageColor}
          onBlur={() => setImageShowColor(imageColor)}
        />
      </Form.Item>
      <Form.Item label="段落行数(Skeleton.Paragraph)">
        <Input
          placeholder="请输入段落行数"
          value={rows}
          onChange={setRows}
          onBlur={() => setShowRows(Number(rows))}
        />
      </Form.Item>
      <Form.Item label="Skeleton.Avatar">
        <Skeleton.Avatar size={size} shape={shape} active={active} />
      </Form.Item>
      <Form.Item label="Skeleton.Button">
        <Skeleton.Button size={size} shape={shape} active={active} />
      </Form.Item>
      <Form.Item label="Skeleton.Input">
        <Skeleton.Input size={size} shape={shape} active={active} />
      </Form.Item>
      <Form.Item label="Skeleton.Element">
        <Skeleton.Element size={size} shape={shape} active={active} />
      </Form.Item>
      <Form.Item label="Skeleton.Image">
        <Skeleton.Image
          size={imageShowSize}
          shape={shape}
          color={imageShowColor}
          active={active}
        />
      </Form.Item>
      <Form.Item label="Skeleton.Paragraph">
        <Skeleton.Paragraph rows={showRows} shape={shape} active={active} />
      </Form.Item>
    </Form>
  );
};
```

### 案例

![image](/assets/images/performance-optimization/04.jpg)

```tsx
import React, { useState } from "react";
import { Switch } from "../components";
import { Skeleton } from "./Skeleton";
import { item } from "./constants";

export default () => {
  const [active, setActive] = useState<boolean>(true); // 是否显示动画
  const [loading, setLoading] = useState<boolean>(true); // 是否加载中
  const [avatar, setAvatar] = useState<boolean>(true); // 是否显示头像占位
  const [title, setTitle] = useState<boolean>(true); // 是否显示头像占位
  const [paragraph, setParagraph] = useState<boolean>(true); // 是否显示段落占位
  const [image, setImage] = useState<boolean>(true); // 是否显示图片占位

  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <Switch value={loading} onChange={setLoading}>
          {loading ? "加载中" : "加载完成"}
        </Switch>
      </div>
      <div style={{ marginBottom: "12px" }}>
        <Switch value={active} onChange={setActive}>
          {active ? "启用动画" : "不启用动画"}
        </Switch>
      </div>
      <div style={{ marginBottom: "12px" }}>
        <Switch value={avatar} onChange={setAvatar}>
          {avatar ? "显示头像占位" : "不显示头像占位"}
        </Switch>
      </div>
      <div style={{ marginBottom: "12px" }}>
        <Switch value={title} onChange={setTitle}>
          {title ? "显示标题占位" : "不显示标题占位"}
        </Switch>
      </div>
      <div style={{ marginBottom: "12px" }}>
        <Switch value={paragraph} onChange={setParagraph}>
          {paragraph ? "显示段落占位" : "不显示段落占位"}
        </Switch>
      </div>
      <div style={{ marginBottom: "12px" }}>
        <Switch value={image} onChange={setImage}>
          {image ? "显示图片占位" : "不显示图片占位"}
        </Switch>
      </div>
      <div>
        {[...Array(6).fill(item)].map(({ url, desc }, index) => {
          return (
            <Skeleton
              loading={loading}
              avatar={avatar}
              title={title}
              paragraph={paragraph}
              image={image}
              active={active}
              key={index}
              style={{ marginBottom: "4px" }}
            >
              <div style={{ display: "table" }}>
                <div style={{ display: "table-cell", paddingRight: "16px" }}>
                  <img src={url} alt="" />
                </div>
                <div style={{ display: "table-cell", width: "100%" }}>
                  {desc}
                </div>
              </div>
            </Skeleton>
          );
        })}
      </div>
    </>
  );
};
```

### API

#### SkeletonProps

| 参数      | 类型                                                         | 默认值 | 说明                                         |
| --------- | ------------------------------------------------------------ | ------ | -------------------------------------------- |
| active    | boolean                                                      | false  | 是否展示动画效果                             |
| loading   | boolean                                                      | true   | 为 true 时，显示占位图。反之则直接展示子组件 |
| avatar    | [SkeletonAvatarProps](#SkeletonAvatarProps) \| boolean       | false  | 是否显示头像占位图                           |
| title     | [SkeletonTitleProps](#SkeletonTitleProps) \| boolean         | true   | 是否显示标题占位图                           |
| paragraph | [SkeletonParagraphProps](#SkeletonParagraphProps) \| boolean | true   | 是否显示段落占位图                           |
| image     | [SkeletonImageProps](#SkeletonImageProps) \| boolean         | false  | 是否显示图片占位图                           |
| className | string                                                       | -      | 组件自定义类名                               |
| style     | React.CSSProperties                                          | -      | 组件自定义样式                               |

#### SkeletonAvatarProps

| 参数      | 类型                                      | 默认值    | 说明             |
| --------- | ----------------------------------------- | --------- | ---------------- |
| size      | 'default' \| 'large' \| 'small' \| number | 'default' | 占位图的大小     |
| shape     | 'default' \| 'square' \| 'circle'         | 'default' | 占位图的大小     |
| active    | boolean                                   | false     | 是否展示动画效果 |
| className | string                                    | -         | 组件自定义类名   |
| style     | React.CSSProperties                       | -         | 组件自定义样式   |

#### SkeletonButtonProps

| 参数      | 类型                                      | 默认值    | 说明             |
| --------- | ----------------------------------------- | --------- | ---------------- |
| size      | 'default' \| 'large' \| 'small' \| number | 'default' | 占位图的大小     |
| shape     | 'default' \| 'square' \| 'round'          | 'default' | 占位图的大小     |
| active    | boolean                                   | false     | 是否展示动画效果 |
| className | string                                    | -         | 组件自定义类名   |
| style     | React.CSSProperties                       | -         | 组件自定义样式   |

#### SkeletonInputProps

| 参数      | 类型                                      | 默认值    | 说明             |
| --------- | ----------------------------------------- | --------- | ---------------- |
| size      | 'default' \| 'large' \| 'small' \| number | 'default' | 占位图的大小     |
| shape     | 'default' \| 'square'                     | 'default' | 占位图的大小     |
| active    | boolean                                   | false     | 是否展示动画效果 |
| className | string                                    | -         | 组件自定义类名   |
| style     | React.CSSProperties                       | -         | 组件自定义样式   |

#### SkeletonImageProps

| 参数      | 类型                              | 默认值    | 说明             |
| --------- | --------------------------------- | --------- | ---------------- |
| color     | string                            | '#bfbfbf' | 占位图填充颜色   |
| size      | number                            | 96        | 占位图大小       |
| active    | boolean                           | false     | 是否展示动画效果 |
| shape     | 'default' \| 'square' \| 'circle' | 'default' | 形状             |
| className | string                            | -         | 组件自定义类名   |
| style     | React.CSSProperties               | -         | 组件自定义样式   |

#### SkeletonParagraphProps

| 参数               | 类型                                     | 默认值    | 说明                                                                |
| ------------------ | ---------------------------------------- | --------- | ------------------------------------------------------------------- |
| width              | number \| string \| number[] \| string[] | 61%       | 设置段落占位图的宽度，若为数组则为对应的每行宽度                    |
| height             | number \| string \| number[] \| string[] | 16        | 设置段落占位图的高度，若为数组则为对应的每行高度                    |
| rows               | number                                   | 2         | 设置段落占位图的行数                                                |
| widthApplyLastLine | boolean                                  | true      | 设置的段落宽度只应用于最后一行(在 width 为 number \| string 时有效) |
| shape              | 'default' \| 'square'                    | 'default' | 形状                                                                |
| active             | boolean                                  | false     | 是否展示动画效果                                                    |
| className          | string                                   | -         | 组件自定义类名                                                      |
| style              | React.CSSProperties                      | -         | 组件自定义样式                                                      |

#### SkeletonTitleProps

| 参数      | 类型                | 默认值 | 说明           |
| --------- | ------------------- | ------ | -------------- |
| width     | number\|string      | 50%    | 占位宽度       |
| height    | number\|string      | 16     | 占位高度       |
| className | string              | -      | 组件自定义类名 |
| style     | React.CSSProperties | -      | 组件自定义样式 |

#### SkeletonElementProps

| 参数      | 类型                                          | 默认值    | 说明             |
| --------- | --------------------------------------------- | --------- | ---------------- |
| size      | 'default' \| 'large' \| 'small' \| number     | 'default' | 占位图的大小     |
| shape     | 'default' \| 'square' \| 'circle' \| 'round'; | 'default' | 占位图的大小     |
| active    | boolean                                       | false     | 是否展示动画效果 |
| className | string                                        | -         | 组件自定义类名   |
| style     | React.CSSProperties                           | -         | 组件自定义样式   |

`*` 为必填参数

### 结构

├── Skeleton
│   ├── Skeleton.less
│   ├── Skeleton.tsx
│   ├── animation.less
│   ├── components
│   │   ├── Avatar.tsx
│   │   ├── Button.tsx
│   │   ├── Element.tsx
│   │   ├── Image.tsx
│   │   ├── Input.tsx
│   │   ├── Paragraph.tsx
│   │   ├── Title.tsx
│   │   └── index.tsx
│   ├── index.ts
│   ├── types.ts
│   └── utils.ts

#### 实现

```Skeleton.tsx
import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { withStatics } from '../../utils';
import { Element, Avatar, Image, Paragraph, Title, Button, Input } from './components';
import {
  SkeletonProps,
  SkeletonAvatarProps,
  SkeletonTitleProps,
  SkeletonParagraphProps,
  SkeletonImageProps,
} from './types';
import {
  getComponentProps,
  getAvatarBasicProps,
  getTitleBasicProps,
  getParagraphBasicProps,
} from './utils';
import './Skeleton.less';

const prefix = 'skeleton';

const SkeletonWrap: React.FC<PropsWithChildren<SkeletonProps>> = (props) => {
  const {
    active = false,
    loading = true,
    avatar = false,
    title = true,
    paragraph = true,
    children = '',
    className = '',
    style = {},
    image = false,
  } = props;

  if (loading) {
    const hasAvatar = !!avatar;
    const hasTitle = !!title;
    const hasParagraph = !!paragraph;
    const hasImage = !!image;

    // 组合左边 Avatar
    let avatarNode: React.ReactNode;
    if (hasAvatar) {
      const avatarProps: SkeletonAvatarProps = {
        ...getAvatarBasicProps(hasTitle, hasParagraph),
        ...getComponentProps(avatar),
      };
      avatarNode = (
        <div className={`${prefix}-left`}>
          <Avatar {...avatarProps} />
        </div>
      );
    }

    // 组合中间 Content(Title & Paragraph)
    let contentNode: React.ReactNode;
    if (hasTitle || hasParagraph) {
      let titleNode: React.ReactNode;
      if (hasTitle) {
        const titleProps: SkeletonTitleProps = {
          ...getTitleBasicProps(hasAvatar, hasParagraph),
          ...getComponentProps(title),
        };

        titleNode = <Title {...titleProps} />;
      }

      let paragraphNode: React.ReactNode;
      if (hasParagraph) {
        const paragraphProps: SkeletonParagraphProps = {
          ...getParagraphBasicProps(hasAvatar, hasTitle),
          ...getComponentProps(paragraph),
        };

        paragraphNode = <Paragraph {...paragraphProps} />;
      }

      contentNode = (
        <div className={`${prefix}-content`}>
          {titleNode}
          {paragraphNode}
        </div>
      );
    }

    // 组合右边 Image
    let rightNode: React.ReactNode;
    if (hasImage) {
      const imageProps: SkeletonImageProps = {
        ...getComponentProps(image),
      };
      rightNode = (
        <div className={`${prefix}-right`}>
          <Image {...imageProps} />
        </div>
      );
    }

    const cls = classNames(
      prefix,
      {
        [`${prefix}-with-avatar`]: hasAvatar,
        [`${prefix}-active`]: active,
      },
      className,
    );

    return (
      <div className={cls} style={style}>
        {avatarNode}
        {contentNode}
        {rightNode}
      </div>
    );
  }
  return <>{children}</>;
};

const Skeleton = withStatics(SkeletonWrap, {
  Element,
  Avatar,
  Image,
  Paragraph,
  Title,
  Button,
  Input,
});

export { Skeleton };

```

```utils.ts
import { SkeletonParagraphProps } from './types';

// 处理组件属性, 如 avatar 可 boolean 可 SkeletonAvatarProps
export const getComponentProps = (props: any) => {
  if (props && typeof props === 'object') {
    return props;
  }
  return {};
};

// 处理组合 avatar 默认 props
export const getAvatarBasicProps = (hasTitle: boolean, hasParagraph: boolean) => {
  // 有标题 & 无段落: 大尺寸/方形
  if (hasTitle && !hasParagraph) {
    return { size: 'large', shape: 'square' };
  }

  // 否: 大尺寸
  return { size: 'large' };
};

// 处理组合 title 默认 props
export const getTitleBasicProps = (hasAvatar: boolean, hasParagraph: boolean) => {
  // 没有头像 & 有段落: title 宽度 38%
  if (!hasAvatar && hasParagraph) {
    return { width: '38%' };
  }

  return {};
};

// 处理组合 paragraph  默认 props
export const getParagraphBasicProps = (hasAvatar: boolean, hasTitle: boolean) => {
  const basicProps: SkeletonParagraphProps = {};

  // 没有头像 & 有标题: 段落行数 3
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3;
  }

  return basicProps;
};

```

```otherUtils
import hoistNonReactStatics from 'hoist-non-react-statics';

export function withStatics<C extends React.ComponentType<any>, S = {}>(
  component: C,
  statics?: S,
): C & S {
  return hoistNonReactStatics(component, statics as any) as any;
}

```

```animation.less
@keyframes skeleton-animation-default {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.skeleton-animate-default() {
  background: linear-gradient(90deg, #bebebe33 25%, #d6d3d3 37%, #bebebe33 63%);
  background-size: 400% 100%;
  animation: skeleton-animation-default 1.5s ease infinite;
}

```

```Skeleton.less
@import './animation.less';

@skeleton-default-height: 32px; // 默认尺寸高度
@skeleton-large-height: 40px; // 大尺寸高度
@skeleton-small-height: 24px; // 小尺寸高度
@skeleton-color: #bebebe33; // 骨架屏颜色
@skeleton-border-raduis: 4px; // 默认圆角
@skeleton-paragraph-li-height: 16px; // 段落 li 高度
@skeleton-paragraph-li-margin-top: 16px; // 段落 li marginTop
@skeleton-title-height: 16px; // 标题高度
@skeleton-title-group-margin-top: 16px; // 组合中标题 marginTop
@skeleton-paragraph-group-margin-top: 24px; // 组合中段落 marginTop
@skeleton-button-width: 64px; // 按钮宽度
@skeleton-input-width: 200px; // 按钮宽度

// 处理高度
.size(@size) {
  height: @size;
  line-height: @size;
}

// Element
.skeleton-element {
  margin: 0;
  padding: 0;
  background-color: @skeleton-color;
  border-radius: @skeleton-border-raduis;

  .skeleton-element-size(@size) {
    .size(@size);
    &.skeleton-element-circle {
      width: @size;
      border-radius: 50%;
    }
    &.skeleton-element-square {
      border-radius: 0;
    }
    &.skeleton-element-round {
      border-radius: @size;
    }
  }

  .skeleton-element-size(@skeleton-default-height);

  &-lg {
    .skeleton-element-size(@skeleton-large-height);
  }

  &-sm {
    .skeleton-element-size(@skeleton-small-height);
  }
  &-active {
    .skeleton-animate-default();
  }
}

// Avatar
.skeleton-avatar {
  display: inline-block;

  &-element {
    margin: 0;
    padding: 0;
    background-color: @skeleton-color;
    border-radius: @skeleton-border-raduis;

    .skeleton-avatar-element-size(@size) {
      width: @size;
      .size(@size);
      &.skeleton-avatar-element-circle {
        border-radius: 50%;
      }
      &.skeleton-avatar-element-square {
        border-radius: 0;
      }
    }

    .skeleton-avatar-element-size(@skeleton-default-height);

    &-lg {
      .skeleton-avatar-element-size(@skeleton-large-height);
    }

    &-sm {
      .skeleton-avatar-element-size(@skeleton-small-height);
    }

    &-active {
      .skeleton-animate-default();
    }
  }
}

// Button
.skeleton-button {
  display: inline-block;

  &-element {
    margin: 0;
    padding: 0;
    width: @skeleton-button-width;
    background-color: @skeleton-color;
    border-radius: @skeleton-border-raduis;

    .skeleton-button-element-size(@size) {
      .size(@size);
      &.skeleton-button-element-square {
        border-radius: 0;
      }
      &.skeleton-button-element-round {
        border-radius: @size;
      }
    }

    .skeleton-button-element-size(@skeleton-default-height);

    &-lg {
      .skeleton-button-element-size(@skeleton-large-height);
    }

    &-sm {
      .skeleton-button-element-size(@skeleton-small-height);
    }

    &-active {
      .skeleton-animate-default();
    }
  }
}

// Input
.skeleton-input {
  display: inline-block;

  &-element {
    margin: 0;
    padding: 0;
    width: @skeleton-input-width;
    background-color: @skeleton-color;
    border-radius: @skeleton-border-raduis;

    .size(@skeleton-default-height);

    &-lg {
      .size(@skeleton-large-height);
    }

    &-sm {
      .size(@skeleton-small-height);
    }

    &-square {
      border-radius: 0;
    }

    &-active {
      .skeleton-animate-default();
    }
  }
}

// Image
.skeleton-image {
  width: 96px;
  height: 96px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @skeleton-color;
  border-radius: @skeleton-border-raduis;

  &-circle {
    border-radius: 50%;
  }
  &-square {
    border-radius: 0;
  }

  // &-svg {
  // }
  // &-path {
  // }

  &-active {
    .skeleton-animate-default();
  }
}

// Paragraph
.skeleton-paragraph {
  margin: 0;
  padding: 0;

  &-li {
    width: 100%;
    height: @skeleton-paragraph-li-height;
    list-style: none;
    background: @skeleton-color;
    border-radius: @skeleton-border-raduis;

    + li {
      margin-top: @skeleton-paragraph-li-margin-top;
    }
  }

  &-square {
    .skeleton-paragraph-li {
      border-radius: 0;
    }
  }

  &-active {
    .skeleton-paragraph-li {
      .skeleton-animate-default();
    }
  }
}

// Title
.skeleton-title {
  margin: 0;
  padding: 0;
  width: 50%;
  height: @skeleton-title-height;
  background: @skeleton-color;
  border-radius: @skeleton-border-raduis;
}

// 组合
.skeleton {
  display: table;
  width: 100%;

  &-left {
    display: table-cell;
    padding-right: 16px;
    vertical-align: top;
  }
  &-content {
    display: table-cell;
    width: 100%;
    vertical-align: top;

    .skeleton-title {
      margin-top: @skeleton-title-group-margin-top;
    }
    .skeleton-paragraph {
      margin-top: @skeleton-paragraph-group-margin-top;
    }
  }

  &-right {
    display: table-cell;
    padding-left: 16px;
    vertical-align: middle;
  }

  &-with-avatar {
    .skeleton-content {
      .skeleton-title {
        margin-top: 12px;
      }
    }
  }

  &-active {
    .skeleton-left {
      .skeleton-avatar-element {
        .skeleton-animate-default();
      }
    }
    .skeleton-content {
      .skeleton-title {
        .skeleton-animate-default();
      }
      .skeleton-paragraph {
        .skeleton-paragraph-li {
          .skeleton-animate-default();
        }
      }
    }
    .skeleton-right {
      .skeleton-image {
        .skeleton-animate-default();
      }
    }
  }
}

```

```types.ts
import { StyleProps } from '../../type';

export type SkeletonSizeProps = 'default' | 'large' | 'small' | number;
export type SkeletonShapeProps = 'default' | 'square' | 'circle' | 'round';
export type SkeletonWidthUnit = number | string;

export interface SkeletonProps extends StyleProps {
  /**
   * 是否展示动画效果
   * @default false
   */
  active?: boolean;
  /**
   * 为 true 时，显示占位图。反之则直接展示子组件
   * @default true
   */
  loading?: boolean;
  /**
   * 是否显示头像占位图
   * @default false
   */
  avatar?: SkeletonAvatarProps | boolean;
  /**
   * 是否显示标题占位图
   * @default true
   */
  title?: SkeletonTitleProps | boolean;
  /**
   * 是否显示段落占位图
   * @default true
   */
  paragraph?: SkeletonParagraphProps | boolean;
  /**
   * 是否显示图片占位图
   * @default false
   */
  image?: SkeletonImageProps | boolean;
}

export interface SkeletonElementProps extends StyleProps {
  /**
   * class前缀 不用透传外部
   * @default 'skeleton-element'
   */
  prefixCls?: string;
  /**
   * 占位图的大小
   * @default 'default'
   */
  size?: SkeletonSizeProps;
  /**
   * 形状
   * @default 'default'
   */
  shape?: SkeletonShapeProps;
  /**
   * 是否展示动画效果
   * @default false
   */
  active?: boolean;
}

export interface SkeletonAvatarProps extends Omit<SkeletonElementProps, 'prefixCls'> {
  /**
   * 形状
   * @default 'circle'
   */
  shape?: 'default' | 'square' | 'circle';
}

export interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'prefixCls'> {
  /**
   * 形状
   * @default 'default'
   */
  shape?: 'default' | 'square' | 'round';
}

export interface SkeletonInputProps extends Omit<SkeletonElementProps, 'prefixCls'> {
  /**
   * 形状
   * @default 'default'
   */
  shape?: 'default' | 'square';
}

export interface SkeletonImageProps extends StyleProps {
  /**
   * 占位图填充颜色
   * @default '#bfbfbf'
   */
  color?: string;
  /**
   * 占位图大小
   * @default 96
   */
  size?: number;
  /**
   * 是否展示动画效果
   * @default false
   */
  active?: boolean;
  /**
   * 形状
   * @default 'default'
   */
  shape?: 'default' | 'square' | 'circle';
}

export interface SkeletonParagraphProps extends StyleProps {
  /**
   * 设置段落占位图的宽度，若为数组则为对应的每行宽度
   * @default '61%'
   */
  width?: SkeletonWidthUnit | SkeletonWidthUnit[];
  /**
   * 设置段落占位图的高度，若为数组则为对应的每行高度
   * @default 16
   */
  height?: SkeletonWidthUnit | SkeletonWidthUnit[];
  /**
   * 设置段落占位图的行数
   * @default 2
   */
  rows?: number;
  /**
   * 设置的段落宽度只应用于最后一行(在width 为 widthUnit 时有效)
   * @default true
   */
  widthApplyLastLine?: boolean;
  /**
   * 形状
   * @default 'default'
   */
  shape?: 'default' | 'square';
  /**
   * 是否展示动画效果
   * @default false
   */
  active?: boolean;
}

export interface SkeletonTitleProps extends StyleProps {
  /**
   * 占位宽度
   * @default 50%
   */
  width?: SkeletonWidthUnit;
  /**
   * 占位高度
   * @default 16
   */
  height?: SkeletonWidthUnit;
}

```

```Element.tsx
import React from 'react';
import classNames from 'classnames';
import { SkeletonElementProps } from '../types';

const Element: React.FC<SkeletonElementProps> = (props) => {
  const {
    prefixCls = 'skeleton-element',
    size = 'default',
    shape = 'default',
    className = '',
    style = {},
    active = false,
  } = props;

  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });

  const shapeCls = classNames({
    [`${prefixCls}-circle`]: shape === 'circle',
    [`${prefixCls}-square`]: shape === 'square',
    [`${prefixCls}-round`]: shape === 'round',
  });

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
        }
      : {};

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-active`]: active,
    },
    sizeCls,
    shapeCls,
    className,
  );

  return <div className={cls} style={{ ...sizeStyle, ...style }} />;
};

export { Element };

```

```Image.tsx
import * as React from 'react';
import classNames from 'classnames';
import { SkeletonImageProps } from '../types';

const prefix = 'skeleton-image';

const path =
  'M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z';

const Image: React.FC<SkeletonImageProps> = (props) => {
  const {
    color = '#bfbfbf',
    size = 96,
    active = false,
    shape = 'default',
    className = '',
    style = {},
  } = props;

  const shapeCls = classNames({
    [`${prefix}-circle`]: shape === 'circle',
    [`${prefix}-square`]: shape === 'square',
  });

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
        }
      : {};

  const cls = classNames(
    prefix,
    shapeCls,
    {
      [`${prefix}-active`]: active,
    },
    className,
  );

  return (
    <div className={cls} style={{ ...sizeStyle, ...style }}>
      <svg
        viewBox="0 0 1098 1024"
        xmlns="http://www.w3.org/2000/svg"
        width={size / 2}
        height={size / 2}
        className={`${prefix}-svg`}
      >
        <path d={path} fill={color} className={`${prefix}-path`} />
      </svg>
    </div>
  );
};

export { Image };

```

```Paragraph.tsx
import * as React from 'react';
import classNames from 'classnames';
import { SkeletonParagraphProps } from '../types';

const prefix = 'skeleton-paragraph';

const Paragraph: React.FC<SkeletonParagraphProps> = (props) => {
  const {
    width = '61%',
    height = '',
    rows = 2,
    className = '',
    style = {},
    widthApplyLastLine = true,
    shape = 'default',
    active = false,
  } = props;

  const getWidth = (index: number) => {
    if (Array.isArray(width)) {
      return width[index];
    }

    if (widthApplyLastLine) {
      if (rows - 1 === index) {
        return width;
      }
      return undefined;
    }

    return width || undefined;
  };

  const getHeight = (index: number) => {
    if (Array.isArray(height)) {
      return height[index];
    }
    return height || undefined;
  };

  const rowList = [...Array(rows)].map((_, idx) => (
    <li
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      className="skeleton-paragraph-li"
      style={{ width: getWidth(idx), height: getHeight(idx) }}
    />
  ));

  const shapeCls = classNames({
    [`${prefix}-square`]: shape === 'square',
  });

  const cls = classNames(
    prefix,
    {
      [`${prefix}-active`]: active,
    },
    shapeCls,
    className,
  );

  return (
    <ul className={cls} style={style}>
      {rowList}
    </ul>
  );
};

export { Paragraph };

```

```Avatar.tsx
import React from 'react';
import classNames from 'classnames';
import { Element } from './Element';
import { SkeletonAvatarProps } from '../types';

const prefix = 'skeleton-avatar';

const Avatar: React.FC<SkeletonAvatarProps> = (props) => {
  const { className = '', shape = 'circle', style = {}, ...otherProps } = props;

  return (
    <div className={classNames(prefix, className)} style={style}>
      <Element prefixCls={`${prefix}-element`} shape={shape} {...otherProps} />
    </div>
  );
};

export { Avatar };

```

```Title.tsx
import * as React from 'react';
import classNames from 'classnames';
import { SkeletonTitleProps } from '../types';

const prefix = 'skeleton-title';

const Title: React.FC<SkeletonTitleProps> = (props) => {
  const { width, height, className = '', style = {} } = props;
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h3 className={classNames(prefix, className)} style={{ width, height, ...style }} />;
};

export { Title };

```

```Button.tsx
import React from 'react';
import classNames from 'classnames';
import { Element } from './Element';
import { SkeletonButtonProps } from '../types';

const prefix = 'skeleton-button';

const Button: React.FC<SkeletonButtonProps> = (props) => {
  const { className = '', style = {}, ...otherProps } = props;

  return (
    <div className={classNames(prefix, className)} style={style}>
      <Element prefixCls={`${prefix}-element`} {...otherProps} />
    </div>
  );
};

export { Button };

```

```
import React from 'react';
import classNames from 'classnames';
import { Element } from './Element';
import { SkeletonInputProps } from '../types';

const prefix = 'skeleton-input';

const Input: React.FC<SkeletonInputProps> = (props) => {
  const { className = '', style = {}, ...otherProps } = props;

  return (
    <div className={classNames(prefix, className)} style={style}>
      <Element prefixCls={`${prefix}-element`} {...otherProps} />
    </div>
  );
};

export { Input };

```
