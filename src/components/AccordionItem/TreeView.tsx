import React from "react";

export interface TreeNode {
  id: number;
  title: string;
  open: boolean;
  children: TreeNode[];
}

interface AccordionItemProps {
  node: TreeNode;
  onToggle: (id: number) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ node, onToggle }) => {
  return (
    <div>
      <div
        style={{
          paddingLeft: `${node.title.split(">").length * 10}px`,
          display: "flex",
        }}
      >
        <div onClick={() => onToggle(node.id)} style={{ cursor: "pointer" }}>
          {node.open ? "v" : ">"}
        </div>
        <div>{node.title}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
