// assume first node is root
// validate that children exist in the tree somewhere
// each node only has one parent

interface DomNode {
    "id": number,
    "children": number[];
}

const checkParentsValid = (nodes: DomNode[]) => {
    // is the root node a child of something else?
    const rootId = nodes[0].id;
    if (nodes.find(n=> n.children.includes(rootId))) return false;

    // check that parents are unique
    const allChildren = nodes.flatMap(n=> n.children);
    const hasDuplicates = allChildren.some(child => allChildren.filter(c=>c==child).length > 1);
    
    return !hasDuplicates;
}

const childNodesExist = (nodes:DomNode[]) => {
    const allNodeIds = nodes.flatMap(n => n.id);
    const allChildren = nodes.flatMap(n=> n.children);
    const allChildrenExist = allChildren.every(c => allNodeIds.includes(c));
    return allChildrenExist;
}

const allIdsUnique = (nodes:DomNode[]) => {
    const allNodeIds = nodes.flatMap(n=>n.id);
    const foundInvalid = allNodeIds.find(id => allNodeIds.filter(n=> n == id).length > 1);
    return !foundInvalid;
}

const isTreeValid = (nodes: DomNode[]) => {
    return checkParentsValid(nodes) && childNodesExist(nodes) && allIdsUnique(nodes);
}
