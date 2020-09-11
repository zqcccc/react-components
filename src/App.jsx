import React from "react";
import Tree, { TreeNode } from "./components/Tree";
// import "./components/Tree/index.less";
import "./styles.less";

function handleSelect(selected, c) {
  console.log(selected, c);
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox1111</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Tree className="myCls" onSelect={handleSelect} checkable={true}>
        <TreeNode title="parent 1" expanded={false} onSelect={handleSelect}>
          <TreeNode>leaf </TreeNode>
          <TreeNode title="parent 1-1">
            <TreeNode>leaf </TreeNode>
            <TreeNode>leaf </TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode>leaf </TreeNode>
        <TreeNode>
          <TreeNode>leaf </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  );
}
