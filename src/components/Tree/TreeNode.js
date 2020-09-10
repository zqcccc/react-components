import React, { Component } from "react";
import { joinClasses } from "../../utils";
import Tree from "./Tree";
import classNames from "classnames";

import "./index.less";

export default class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
      selected: this.props.selected,
      checked: this.props.checked
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    var sta = {
      selected: nextProps.selected,
      checked: nextProps.selected
    };
    this.setState(sta);
  }
  switchExpandedState = (newState, onStateChangeComplete) => {
    this.setState(
      {
        expanded: newState
      },
      onStateChangeComplete
    );
  };

  handleExpandedState = () => {
    this.switchExpandedState(!this.state.expanded);
  };

  handleSelect = () => {
    this.setState({
      selected: !this.state.selected
    });
    if (this.props.onSelect) {
      this.props.onSelect(!this.state.selected, this);
    }
  };

  handleChecked = () => {
    var checked = !this.state.checked;
    this.setState({
      checked: checked,
      selected: checked
    });
  };

  renderChildren(children) {
    var newChildren = null;
    if (
      children.type === TreeNode ||
      (Array.isArray(children) &&
        children.every(function (item) {
          return item.type === TreeNode;
        }))
    ) {
      var treeProps = {
        className: this.props.prefixCls + "-child-tree",
        expanded: this.state.expanded,
        selected: this.state.checked,
        checked: this.state.checked,
        checkable: this.props.checkable,
        onSelect: this.props.onSelect
      };
      newChildren = <Tree {...treeProps}>{children}</Tree>;
    } else {
      newChildren = children;
    }

    return newChildren;
  }
  render() {
    var props = this.props;
    var state = this.state;

    var prefixCls = props.prefixCls;
    var switchCls = state.expanded ? "open" : "close";

    var switcherCls = {};
    switcherCls[prefixCls + "-treenode-switcher"] = true;
    switcherCls[prefixCls + "-switcher__" + switchCls] = true;

    var switcherProps = {
      className: joinClasses(props.className, classNames(switcherCls)),
      onClick: this.handleExpandedState
    };

    var iconEleCls = {};
    iconEleCls[prefixCls + "-iconEle"] = true;
    iconEleCls[prefixCls + "-icon__" + switchCls] = true;

    // can replace with checkbox
    var userIconEle = null;
    if (props.iconEle && React.isValidElement(props.iconEle)) {
      userIconEle = props.iconEle;
    }
    var iconEleProps = {
      className: classNames(iconEleCls)
    };
    if (props.checkable) {
      iconEleProps.onClick = this.handleChecked;
    }

    var content = props.title;
    var newChildren = this.renderChildren(props.children);
    if (newChildren === props.children) {
      content = newChildren;
      newChildren = null;
    }

    return (
      <li>
        <span {...switcherProps}></span>
        <a title={content}>
          <span {...iconEleProps}>{userIconEle}</span>
          <span
            className={state.selected ? prefixCls + "-selected" : ""}
            onClick={this.handleSelect}
          >
            {content}
          </span>
        </a>
        {newChildren}
      </li>
    );
  }
}
TreeNode.defaultProps = {
  title: "---",
  expanded: true,
  selected: false,
  checked: false
};
// export default function TreeNode({
//   title = "---",
//   expanded: expandedProps = true,
//   selected: selectedProps = false,
//   checked: checkedProps = false,
//   onSelect,
//   prefixCls,
//   checkable,
//   className,
//   iconEle,
//   children
// }) {
//   const [expanded, setExpanded] = useState(expandedProps);
//   const [selected, setSelected] = useState(selectedProps);
//   const [checked, setChecked] = useState(checkedProps);

//   function switchExpandedState(newState, onStateChangeComplete) {
//     setExpanded(newState);
//     if (onStateChangeComplete && typeof onStateChangeComplete === "function")
//       onStateChangeComplete();
//   }
//   function handleExpandedState() {
//     switchExpandedState(!expanded);
//   }
//   function handleSelect() {
//     setSelected(!selected);
//     if (onSelect) {
//       onSelect(!selected, this);
//     }
//   }
//   function handleChecked() {
//     const temp = !checked;
//     setChecked(temp);
//     setSelected(temp);
//   }
//   function renderChildren(children) {
//     var newChildren = null;
//     if (
//       children.type === TreeNode ||
//       (Array.isArray(children) &&
//         children.every(function (item) {
//           return item.type === TreeNode;
//         }))
//     ) {
//       var treeProps = {
//         className: prefixCls + "-child-tree",
//         expanded: expanded,
//         selected: checked,
//         checked: checked,
//         checkable: checkable,
//         onSelect: onSelect
//       };
//       newChildren = <Tree {...treeProps}>{children}</Tree>;
//     } else {
//       newChildren = children;
//     }

//     return newChildren;
//   }

//   var switchCls = expanded ? "open" : "close";

//   var switcherCls = {};
//   switcherCls[prefixCls + "-treenode-switcher"] = true;
//   switcherCls[prefixCls + "-switcher__" + switchCls] = true;

//   var switcherProps = {
//     className: joinClasses(className, classNames(switcherCls)),
//     onClick: handleExpandedState
//   };

//   var iconEleCls = {};
//   iconEleCls[prefixCls + "-iconEle"] = true;
//   iconEleCls[prefixCls + "-icon__" + switchCls] = true;

//   // can replace with checkbox
//   var userIconEle = null;
//   if (iconEle && React.isValidElement(iconEle)) {
//     userIconEle = iconEle;
//   }
//   var iconEleProps = {
//     className: classNames(iconEleCls)
//   };
//   if (checkable) {
//     iconEleProps.onClick = handleChecked;
//   }

//   var content = title;
//   var newChildren = renderChildren(children);
//   if (newChildren === children) {
//     content = newChildren;
//     newChildren = null;
//   }

//   return (
//     <li>
//       <span {...switcherProps}></span>
//       <a title={content} href="#">
//         <span {...iconEleProps}>{userIconEle}</span>
//         <span
//           className={selected ? prefixCls + "-selected" : ""}
//           onClick={handleSelect}
//         >
//           {content}
//         </span>
//       </a>
//       {newChildren}
//     </li>
//   );
// }
