class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    // base case: empty tree
    if (!this.root) {
      this.root = newNode;
    }
    // normal case
    else {
      let currNode = this.root;
      while (currNode) {
        if (val < currNode.val) {
          if (currNode.left) {
            currNode = currNode.left;
          }
          else {
            currNode.left = newNode;
            currNode = null;
          }
        }
        else {
          if (currNode.right) {
            currNode = currNode.right;
          }
          else {
            currNode.right = newNode;
            currNode = null;
          }
        }
      }
    }
    return this;
  }

  /** insertRecursivelyHelper(node, val): insert a new node with value val into
   * the subtree with node as its root. */

  insertRecursivelyHelper(node, val) {
    if (val < node.val) {
      if (node.left) {
        this.insertRecursivelyHelper(node.left, val);
      }
      else {
        node.left = new Node(val);
      }
    }
    else {
      if (node.right) {
        this.insertRecursivelyHelper(node.right, val);
      }
      else {
        node.right = new Node(val);
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    // special case for empty tree
    if (!this.root) {
      this.root = new Node(val);
    }
    else {
      this.insertRecursivelyHelper(this.root, val);
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currNode = this.root;
    while (currNode) {
      if (val === currNode.val) {
        return currNode;
      }
      if (val < currNode.val) {
        currNode = currNode.left;
      }
      else {
        currNode = currNode.right;
      }
    }
  }

  /** findRecursivelyHelper(node, val): search the subtree with node as its
   * root for a node with value val.
   * return the node, if found; else undefined. */

  findRecursivelyHelper(node, val) {
    if (node) {
      if (val === node.val) {
        return node;
      }
      if (val < node.val) {
        return this.findRecursivelyHelper(node.left, val);
      }
      return this.findRecursivelyHelper(node.right, val);
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    return this.findRecursivelyHelper(this.root, val);
  }

  /** dfsPreOrderHelper(node, out): Traverse the subtree with node as its root
   * using pre-order DFS. Add visited nodes to out. */

  dfsPreOrderHelper(node, out) {
    if (node) {
      out.push(node.val);
      this.dfsPreOrderHelper(node.left, out);
      this.dfsPreOrderHelper(node.right, out);
    }
  }

  /** dfsPreOrder(): Traverse the tree using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const out = [];
    this.dfsPreOrderHelper(this.root, out);
    return out;
  }

  /** dfsInOrderHelper(node, out): Traverse the subtree with node as its root
   * using in-order DFS. Add visited nodes to out. */

  dfsInOrderHelper(node, out) {
    if (node) {
      this.dfsInOrderHelper(node.left, out);
      out.push(node.val);
      this.dfsInOrderHelper(node.right, out);
    }
  }

  /** dfsInOrder(): Traverse the tree using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const out = [];
    if (!this.root) {
      return out;
    }

    const nodeStack = [this.root];
    let counter = 0;
    while (nodeStack.length) {
      // if (counter === 10) {
      //   break;
      // }
      // counter++;
      console.log(nodeStack);
      console.log(out);
      let currNode = nodeStack.pop();
      if (currNode.left) {
        nodeStack.push(currNode);
        nodeStack.push(currNode.left);
      }
      else {
        out.push(currNode.val);
        // keep adding nodes upward until can go right
        while (currNode && !currNode.right && nodeStack.length) {
          currNode = nodeStack.pop();
          out.push(currNode.val);
        }
        if (currNode && currNode.right) {
          nodeStack.push(currNode.right);
        }
      }
    }
    return out;
  }

  // using recursion
  // dfsInOrder() {
  //   const out = [];
  //   this.dfsInOrderHelper(this.root, out);
  //   return out;
  // }

  /** dfsPostOrderHelper(node, out): Traverse the subtree with node as its root
   * using post-order DFS. Add visited nodes to out. */

  dfsPostOrderHelper(node, out) {
    if (node) {
      this.dfsPostOrderHelper(node.left, out);
      this.dfsPostOrderHelper(node.right, out);
      out.push(node.val);
    }
  }

  /** dfsPostOrder(): Traverse the tree using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const out = [];
    this.dfsPostOrderHelper(this.root, out);
    return out;
  }

  /** bfs(): Traverse the tree using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const out = [];
    // special case for empty tree
    if (!this.root) {
      return out;
    }
    const nodeQueue = [this.root];
    while (nodeQueue.length) {
      const currNode = nodeQueue.shift();
      out.push(currNode.val);
      if (currNode.left) {
        nodeQueue.push(currNode.left);
      }
      if (currNode.right) {
        nodeQueue.push(currNode.right);
      }
    }
    return out;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    // remove node by replacing node with its successor or predecessor

    let parentOfNodeToDelete = null;
    let nodeToDelete = this.root;
    while (val !== nodeToDelete.val) {
      parentOfNodeToDelete = nodeToDelete;
      if (val < nodeToDelete.val) {
        nodeToDelete = nodeToDelete.left;
      }
      else {
        nodeToDelete = nodeToDelete.right;
      }
    }

    // if nodeToDelete has no children, can simply remove it
    if (!nodeToDelete.left && !nodeToDelete.right) {
      if (parentOfNodeToDelete) {
        if (parentOfNodeToDelete.left == nodeToDelete) {
          parentOfNodeToDelete.left = null;
        }
        else {
          parentOfNodeToDelete.right = null;
        }
      }
      else {
        this.root = null;
      }
    }
    else {
      // replace nodeToDelete with successor or predecessor
      if (nodeToDelete.right) {
        // special case if right child is successor
        if (!nodeToDelete.right.left) {
          const successor = nodeToDelete.right;
          successor.left = nodeToDelete.left;
          if (parentOfNodeToDelete) {
            if (parentOfNodeToDelete.left == nodeToDelete) {
              parentOfNodeToDelete.left = successor;
            }
            else {
              parentOfNodeToDelete.right = successor;
            }
          }
          else {
            this.root = successor;
          }
        }
        // otherwise, search for parent of successor
        else {
          let parentOfSuccessor = nodeToDelete.right;
          let successor = parentOfSuccessor.left;
          while (successor.left) {
            parentOfSuccessor = successor;
            successor = successor.left;
          }
          parentOfSuccessor.left = successor.right;
          successor.left = nodeToDelete.left;
          successor.right = nodeToDelete.right;
          if (parentOfNodeToDelete) {
            if (parentOfNodeToDelete.left == nodeToDelete) {
              parentOfNodeToDelete.left = successor;
            }
            else {
              parentOfNodeToDelete.right = successor;
            }
          }
          else {
            this.root = successor;
          }
        }
      }
      else {
        // special case if left child is predecessor
        if (!nodeToDelete.left.right) {
          const predecessor = nodeToDelete.left;
          predecessor.right = nodeToDelete.right;
          if (parentOfNodeToDelete) {
            if (parentOfNodeToDelete.left == nodeToDelete) {
              parentOfNodeToDelete.left = predecessor;
            }
            else {
              parentOfNodeToDelete.right = predecessor;
            }
          }
          else {
            this.root = predecessor;
          }
        }
        // otherwise, search for parent of predecessor
        else {
          let parentOfPredecessor = nodeToDelete.left;
          let predecessor = parentOfPredecessor.right;
          while (predecessor.right) {
            parentOfPredecessor = predecessor;
            predecessor = predecessor.right;
          }
          parentOfPredecessor.right = predecessor.left;
          predecessor.left = nodeToDelete.left;
          predecessor.right = nodeToDelete.right;
          if (parentOfNodeToDelete) {
            if (parentOfNodeToDelete.left == nodeToDelete) {
              parentOfNodeToDelete.left = predecessor;
            }
            else {
              parentOfNodeToDelete.right = predecessor;
            }
          }
          else {
            this.root = predecessor;
          }
        }
      }
    }

    return nodeToDelete;
  }

  /** getNumOfNodes(node): Returns num of nodes in subtree with node as
   * root. */

  getNumOfNodes(node) {
    if (!node) {
      return 0;
    }
    let count = 1;
    count += this.getNumOfNodes(node.left);
    count += this.getNumOfNodes(node.right);
    return count;
  }

  /** getDepth(node): Returns depth of subtree with node as root. */

  getDepth(node) {
    if (!node || (!node.left && !node.right)) {
      return 0;
    }
    return Math.max(this.getDepth(node.left), this.getDepth(node.right)) + 1;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    // special case for empty tree
    if (!this.root) {
      return true;
    }

    // counting all nodes and checking if depth is too big
    const numOfNodes = this.getNumOfNodes(this.root);
    const depth = this.getDepth(this.root);

    // determine min num of nodes tree with depth can have and be balanced
    let minNumOfNodes = 0;
    for (let i = 0; i <= depth; i++) {
      minNumOfNodes += Math.pow(2, i);
    }
    minNumOfNodes -= (Math.pow(2, depth) - 1);

    if (numOfNodes < minNumOfNodes) {
      return false;
    }
    return true;
  }

  /** findHighest(node): Find the highest value in the subtree with node as its
   * root. */

  findHighest(node) {
    if (!node) {
      return;
    }
    if (!node.right) {
      return node.val;
    }
    return this.findHighest(node.right);
  }

  /** findSecondHighestHelper(node): Find the second highest value in the
   * subtree with node as its root.
   * Return undefined if no second highest exists. */

  findSecondHighestHelper(node) {
    // special case if empty tree or only 1 node
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      return;
    }

    // case where no right subtree
    if (!node.right) {
      return this.findHighest(node.left);
    }
    // case where right subtree has 1 node
    if (!node.right.left && !node.right.right) {
      return node.val;
    }
    return this.findSecondHighestHelper(node.right);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    return this.findSecondHighestHelper(this.root);
  }
}

module.exports = BinarySearchTree;
