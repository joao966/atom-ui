import { Tabs as AntdTabs } from "antd";
import React from "react";
import { string, arrayOf, shape, node, bool, oneOf } from "prop-types";
import styled from "styled-components";

const { TabPane } = AntdTabs;

const StyledTabs = styled(AntdTabs)`
  && .ant-tabs-nav::before {
    border-bottom: none;
  }

  && .ant-tabs-nav-list {
    color: ${(props) => props.theme.color.neutral[1000]};
  }

  & .ant-tabs-tab:hover {
    color: ${(props) => props.theme.color.brand.primary};
  }

  & .ant-tabs-tab.ant-tabs-tab-disabled:hover {
    color: ${(props) => props.theme.color.neutral[500]};
  }

  & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.color.brand.primary};
  }

  .ant-tabs-ink-bar {
    background-color: ${(props) => props.theme.color.brand.primary};
  }
`;

function Tabs({
  id,
  components,
  defaultActiveKey,
  onChange,
  tabPosition,
  ...props
}) {
  return (
    <StyledTabs
      id={id ? id : "id-tabs"}
      defaultActiveKey={defaultActiveKey}
      aria-label={props["aria-label"] ? props["aria-label"] : "aria-label-tabs"}
      tabPosition={tabPosition}
      {...props}
    >
      {components.map((component, index) => (
        <TabPane
          closable={!!component.closable}
          disabled={!!component.disabled}
          tab={component.title}
          key={index + 1}
          {...props}
        >
          {component.value}
        </TabPane>
      ))}
    </StyledTabs>
  );
}

Tabs.propTypes = {
  id: string,
  "aria-label": string,
  components: arrayOf(
    shape({
      title: string,
      value: node,
      disabled: bool,
    })
  ),
  defaultActiveKey: string,
  tabPosition: oneOf(["top", "right", "bottom", "left"]),
};

export default Tabs;
