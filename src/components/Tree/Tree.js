import React, { Component } from "react";
import { joinClasses, createChainedFunction } from "../../utils";
import classNames from "classnames";
import "./index.less";

// function handleKeyDown(e) {
//   e.preventDefault();
// }

export default class Tree extends Component {
      
  static trees = []
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleChecked = (isChk, c, e) => {
    if (this.props.onChecked) {
      this.props.onChecked(isChk, c, e);
    }
  }
  handleSelect = (isSel, c, e) => {
    if (this.props.onSelect) {
      this.props.onSelect(isSel, c, e);
    }
  };

  // all keyboard events callbacks run from here at first
  // todo
  handleKeyDown = (e) => {
    e.preventDefault();
  };

  renderTreeNode = (child, index) => {
    var props = this.props;
    var cloneProps = {
      prefixCls: props.prefixCls,
      checkable: props.checkable,
      //selected: props.selected,
      _level: props._level || 0,
      _pos: (props._pos || 0) + '-' + index,
      showLine: props.showLine,
      _checked: props._checked,
      onChecked: this.handleChecked,
      onSelect: createChainedFunction(child.props.onSelect, this.handleSelect)
    };
    return React.cloneElement(child, cloneProps);
  };

  render() {
    var props = this.props;
    //var state = this.state;

    var classes = {};
    var prefixCls = props.prefixCls;
    classes[prefixCls] = true;

    var domProps = {
      className: joinClasses(props.className, classNames(classes)),
      style: props.expanded ? { display: "block" } : { display: "none" },
      role: "tree-node",
      "aria-activedescendant": "",
      "aria-labelledby": "",
      "aria-expanded": props.expanded ? "true" : "false",
      "aria-selected": props.selected ? "true" : "false",
      "aria-level": ""
    };
    if (props.id) {
      domProps.id = props.id;
    }
    if (props.focusable) {
      domProps.tabIndex = "0";
      domProps.onKeyDown = this.handleKeyDown;
    }

    //this.newChildren = rcUtil.Children.toArray(props.children).map(this.renderTreeNode, this);
    this.newChildren = React.Children.map(props.children, this.renderTreeNode, this);

    return <ul {...domProps}>{this.newChildren}</ul>;
  }
}
Tree.defaultProps = {
  prefixCls: "rc-tree",
  expanded: true,
  showLine: true
};
// export default function Tree({
//   onSelect,
//   prefixCls = "rc-tree",
//   className,
//   expanded = true,
//   selected,
//   checkable,
//   id,
//   focusable,
//   children
// }) {
//   const domProps = useMemo(() => {
//     const obj = {
//       className: joinClasses(className, classNames({ prefixCls: true })),
//       style: expanded ? { display: "block" } : { display: "none" },
//       role: "tree-node",
//       "aria-activedescendant": "",
//       "aria-labelledby": "",
//       "aria-expanded": expanded ? "true" : "false",
//       "aria-selected": selected ? "true" : "false",
//       "aria-level": ""
//     };
//     if (id) {
//       obj.id = id;
//     }
//     if (focusable) {
//       obj.tabIndex = "0";
//       obj.onKeyDown = handleKeyDown;
//     }
//     return obj;
//   }, [className, expanded, selected, id, focusable]);

//   const handleSelect = useCallback(
//     function (isSel, c, e) {
//       if (onSelect) {
//         onSelect(isSel, c, e);
//       }
//     },
//     [onSelect]
//   );

//   function renderTreeNode(child) {
//     var cloneProps = {
//       prefixCls: prefixCls,
//       checkable: checkable,
//       selected: selected,
//       onSelect: createChainedFunction(child.props.onSelect, handleSelect)
//     };
//     return React.cloneElement(child, cloneProps);
//   }

//   const newChildren = React.Children.map(children, renderTreeNode, this);

//   return <ul {...domProps}>{newChildren}</ul>;
// }
