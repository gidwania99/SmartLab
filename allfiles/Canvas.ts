
class CanvasComponent {
  private $el: HTMLCanvasElement


  // private currentColor: string = "black";
  // private currentHoveringColor: string = ''

  constructor($el: HTMLCanvasElement) {
    this.$el = $el;
    
  }

  resizeCanvas(){
    //console.warn("resizing "+ window.innerWidth);
    
    this.$el.height = window.innerHeight*0.70; 
    this.$el.width = window.innerWidth *0.80;
   
  }
  width(){
    return this.$el.width; 
  }
   
  height(){
    return this.$el.height; 
  }
  clearCanvas() {
    const { height, width } = this.$el;
    this.getContext().clearRect(0, 0, width, height);
  }


/* 
  setMaxWidthAndHeight(height: number, width: number) {
    this.$el.height = height;
    this.$el.width = width;
  }

 */

  getCursorPosition(e):[number,number]{
     const pos =  this.$el.getBoundingClientRect();
     const canvasX = e.clientX - pos.left; 
     const canvasY = e.clientY - pos.top; 
     return [canvasX,canvasY]

  }

  getContext(): CanvasRenderingContext2D {
    const ctx = this.$el.getContext('2d');
    if (!ctx) {
      throw new Error('Cannot get 2d context');
    }

    return ctx;
  }


  emptyMsg() {
    const ctx = this.getContext();
    ctx.font = "24px poppins";
    ctx.fillText("Empty Tree...", this.$el.width / 2 - (this.$el.width * 0.10), this.$el.height / 2);
  }





}
