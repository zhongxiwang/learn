

/**
 * 线条类型，默认：butt
 */
var LineType={"butt":"butt","round":"round","square":"square"};
/**
 *  定义两线相交拐点的类型。默认：miter
 */
var joinType={round:"round",bevel:"bevel",miter:"miter"};

/**
 * 初始化
 * @param {canvas标签的id}}} id 
 */
function cv(id){
    this.Canvas = document.getElementById(id);
      if (this.Canvas.getContext) {
        this.Graphics= canvas.getContext("2d");
        return;
      }
      alert("不支持html5");
      return;
}

/**
 * 绘制线条
 */
cv.prototype.Line=function(x,y,x1,y1,data)
{
    this.Graphics.beginPath();
    this.Graphics.moveTo(x,y);
    for(var key in data)
    {
        if( this.Graphics[key])
            this.Graphics[key]=data[key];
    }
    this.Graphics.lineTo(x1,y1);
    this.Graphics.stroke();
    
}

cv.prototype.StruceLine=function(){return  {
    lineWidth:0.5,
    lineCap:LineType.butt,//round,square
    miterLimit:10,
    lineJoin:joinType.miter,
    strokeStyle:"rgba(255,0,0,0.8)"
}};

cv.prototype.Font=function(x,y,str){
    this.Graphics.font = "10px 微软雅黑";
    this.Graphics.fillText(str,x,y);
}
cv.prototype.Clear=function(){

    this.Graphics.clearRect(0,0,this.Canvas.width,this.Canvas.height);

}