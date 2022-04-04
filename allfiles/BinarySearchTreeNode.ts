
class BinarySearchTreeNode {

  value: number;
  nodeCircle: Circle;
  left: BinarySearchTreeNode
  right: BinarySearchTreeNode
  isLocked : boolean = false;
  isLeftComplete:boolean=false;
  isRightComplete:boolean=false;
  parent:BinarySearchTreeNode;
  constructor(value: number) {
    this.value = value;
    this.nodeCircle = new Circle(value);
  }


  setLeft(value: BinarySearchTreeNode) {
    this.left = value;
    this.left.parent=this;
  }

  setRight(value: BinarySearchTreeNode) {
    this.right = value;
    this.right.parent=this;

  }

  insert(value: number) {
    // Skip equal value
    if (value === this.value) {
      return;
    }

    // When value is lesser
    if (value < this.value) {
      if (this.left) {
        this.left.insert(value);

        return;
      }
      this.setLeft(new BinarySearchTreeNode(value));
      return ;
    }

    // When value is greater
    if (this.right) {
      this.right.insert(value);

      return;
    }
    this.setRight(new BinarySearchTreeNode(value));
  }




  getHeight(): number {
    const leftHeight = this.left?.getHeight() || 0;
    const rightHeight = this.right?.getHeight() || 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }

   hasLeftSubtree(){
       if(this.left != null)
          return true;
        return false;
   }
   hasRightSubtree(){
       if(this.right != null)
          return true;
        return false;
   }



  findMinimum(): BinarySearchTreeNode[] {
    var node : BinarySearchTreeNode = this;
    var parent : BinarySearchTreeNode = null
    while(node.left != null){
      parent = node;
      node = node.left;
    }
    return [parent,node];
  }




  deleteThisNode(parent){  
    const childDirection = parent.left === this ? 'left' : 'right';
    if(!this.left && !this.right){
        if(parent)
            delete parent[childDirection]
        return [this]
     }


    if (this.left && !this.right) {
      if (parent) {
        parent[childDirection] = this.left;
      }
      return [this, this.left];
    } else if (this.right && !this.left) {
      if (parent) {
        parent[childDirection] = this.right;
      }
      return [this, this.right];
    }

    if(this.left && this.right){
      const [parentofminnode,minNode] = this.right.findMinimum();
      parent[childDirection] = minNode;
      minNode.left = this.left;
      minNode.right = this.right == minNode ? this.right.right : this.right;
      if(parentofminnode != null)
        parentofminnode.left = null
      return [this,minNode];
    }
  }




  delete(
    value: number,
  ) {
    // this.deleteThisNode(value)
    var parents  = null
    var newroot : BinarySearchTreeNode = this;
    // Delete from left node
    while(newroot != null) {
      if (value < newroot.value && newroot.left) {
        parents = newroot ;
        newroot = newroot.left;
      }
      if (value > newroot.value && newroot.right) {
        parents = newroot ;
        newroot = newroot.right;
      }
      if (newroot.value === value) {
        const res = newroot.deleteThisNode(parents);
        // delete newroot.left;
        // delete newroot.right;
        return res;
      }
    } 
    return [, this];
  }

}
