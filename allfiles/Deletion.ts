

canvasComponent.resizeCanvas();
window.onresize = () => {
    if (window.innerWidth < 1300){
        canvasComponent.resizeCanvas();
        drawBinaryTree(root, canvas);
       
    }
}
    
    var numInputBox:HTMLInputElement;
    let num:number=0;
    const btnDelete: HTMLButtonElement = <HTMLButtonElement>document.getElementById("delete")
    btnDelete.onclick=deleteNode;
    canvas.width=(window.innerWidth*60)/100;
    canvas.height=(window.innerHeight*70)/100;
    if(canvas.height<450) canvas.width=canvas.height*800/500;

    if(canvas.width>800) canvas.width=800;
    if(canvas.height>500) canvas.height=500;
    var rect=canvas.getBoundingClientRect();
    
    mainDeletion();
    
    function changeColour(node:BinarySearchTreeNode){
        
        node.nodeCircle.setNodeColor("#00ff0d",FIXED_VALUE.fillColor,FIXED_VALUE.textColor);
        
        
       node.nodeCircle.draw(canvasComponent);
        
        setTimeout(()=>{
            node.nodeCircle.setNodeColor(FIXED_VALUE.borderColor,FIXED_VALUE.fillColor,FIXED_VALUE.textColor);

           
           node.nodeCircle.draw(canvasComponent);
        },2500);
        
        return new Promise((resolve) => setTimeout(resolve, 2500));
    }
    function stopeTime(){
        
        return new Promise((resolve) => setTimeout(resolve, 2500));
    }
    
    function writeInstructions(string:string){
        demoHints.innerText =string;
    }
    async function deleteNode(){
      
        numInputBox=<HTMLInputElement>document.getElementById("num");
        num=+(numInputBox.value);
        if(num<=0) 
            writeInstructions("Please enter a positive integer!!");
        else{
            writeInstructions("Search for "+num+".");
            await stopeTime();
            SearchNode(root);
        }
       
    }
    
    
    async function SearchNode(node:BinarySearchTreeNode) {
        
        let instruction:string;
        if(node !=null){
            
            changeColour(node);
            if(num<node.value){
                instruction=num+" < "+node.value+"\nGo to the left subtree."
                writeInstructions(instruction);
                setTimeout(()=>{
                    SearchNode(node.left);
                },2500);
            }
            else if(num>node.value){
                instruction=num+" > "+node.value+"\nGo to the right subtree."
                writeInstructions(instruction);
                setTimeout(()=>{
                    SearchNode(node.right);
                },2500);
            }
            else{
                instruction="Node found."
                writeInstructions(instruction);
                setTimeout(()=>{
                    node.nodeCircle.setNodeColor("#2eb1da",FIXED_VALUE.fillColor,FIXED_VALUE.textColor);

                  
                   node.nodeCircle.draw(canvasComponent);
                    startDelesion(node);
                },3000)
                
            }
        }
        
        else{
            instruction=num+" not found!!"
            writeInstructions(instruction);
        }
        
    }
    let parentPoint:Point;

    let parentPointExtraX:number;
    let parentPointExtraY:number;
    let tmpHasLeftSubtree:boolean;
    let tmpExtra:BinarySearchTreeNode;

    async function startDelesion(node:BinarySearchTreeNode){
        let isRootNode:boolean=false;
        tmpHasLeftSubtree=false;
        if(node.parent==null){  ///it is root node
            writeInstructions(node.value+" is a root node.\nDelete "+node.value+".");
            root=null;
            await stopeTime();
            canvasComponent.clearCanvas();
         
            writeInstructions(node.value+" deleted successfully.\n Tree is Empty.");
        }
        
        
        else if(node.left==null && node.right==null){    //if leaf node
            
          
           
            if(node.value<node.parent.value) node.parent.left=null;
            else node.parent.right=null;
            
            
            writeInstructions(node.value+" is a leaf node\nDelete "+node.value+".");
            
            await stopeTime();
            drawBinaryTree(root,canvas);

            writeInstructions(node.value+" deleted successfully.");
            node=null;

        }
        else if(node.left == null){//if left subtree is null replace node with right child
            writeInstructions("Replace "+node.value+" with it's right child.");
            
            await stopeTime();
            parentPoint=node.nodeCircle.getCordinates();

            if(isRootNode) {
                node.right.parent=null;
                root=node.right;
            }
                
            
            else{
               
                if(node.value<node.parent.value) 
                    node.parent.left=node.right;
                else
                    node.parent.right=node.right;
                
                node.right.parent=node.parent;
            }
            await stopeTime();
            replaceNode(node.right);

            writeInstructions(node.value+" deleted successfully.");
           
            drawBinaryTree(root,canvas);
           
           
        }
        else    {   //if has left subtree
            
            let tmp:BinarySearchTreeNode=node.left;
            writeInstructions("Find the largest node in the left subtree of "+node.value+".");
            await stopeTime();
            while(tmp.right!=null){
                await changeColour(tmp);
               
                    tmp=tmp.right;   
            }
            writeInstructions(tmp.value+" is the largest node in the left subtree of "+node.value+".");
            changeColour(tmp);
            await stopeTime();
            writeInstructions("replace "+node.value+" with "+tmp.value);
            changeColour(tmp);
            await stopeTime();
            //first remove largest node from left subtree
            if(node.left !=tmp){
                if(tmp.value<tmp.parent.value) {
                    if(!tmp.left)
                    tmp.parent.left=null;
                    else{
                        tmp.parent.left=tmp.left;
                        tmp.left.parent=tmp.parent;
                        
                    }
                    
                    
                    if(!tmp.right)
                        tmp.parent.left=null;
                    else{
                        tmp.parent.left=tmp.right;
                        tmp.right.parent=tmp.parent;
                    }
                    
                }  
                else{
                    if(!tmp.right)
                    tmp.parent.right=null;
                    else{
                        tmp.parent.right=tmp.right;
                        tmp.right.parent=tmp.parent;
                    }
                    
                    if(!tmp.left)
                    tmp.parent.right=null;
                    else{
                        tmp.parent.right=tmp.left;
                        tmp.left.parent=tmp.parent;
                    }
                    
                } 
                if(tmp.left) {
                   
                    parentPointExtraX= tmp.nodeCircle.X;
                    parentPointExtraY= tmp.nodeCircle.Y;

                    tmpHasLeftSubtree=true;
                    tmpExtra=tmp.left;
                }
            }
            else{
                tmp.parent=null;
                if(node.right)
                    node.right.parent=tmp;
            }
            //update its parent node
            if(!isRootNode){
                
                tmp.parent=node.parent;
                
                //replace it to the actual node we want to delete
                if(node.value<node.parent.value) node.parent.left=tmp;
                else node.parent.right=tmp;
            } 
            else{
               
                root=tmp;
               // node=tmp;
                if(node.left==tmp) node.left.parent=null;
                
                tmp.parent=null;
               
                
            }
            
            //add deleted nodes child to new node
            if(node.right) {
                tmp.right=node.right;
                node.right.parent=tmp;
                node.right.isLocked=true;   //do not drag it with left subtree
            }
            if(node.left && node.left != tmp){
                tmp.left=node.left;
                node.left.parent=tmp;
            } 
            
            
            parentPoint=node.nodeCircle.getCordinates();
            if(tmp==node.left)
             replaceNode(tmp);
            else
             replaceNode(tmp);
           
             await stopeTime();
             drawBinaryTree(root,canvas);
            writeInstructions(node.value+" deleted successfully.");
            
            
            
            
        }
        
        
    }
     function replaceNode(node:BinarySearchTreeNode){
      
        node.nodeCircle.X == parentPoint.x;
        node.nodeCircle.Y == parentPoint.y
       
    }
    
    
    
    
    


