//class:類別,粒子
class Obj{ //宣告一個類別,針對一個畫的圖案
    constructor(args){ //預設值,基本資料(物件的顏色,移動的速度,大小,初始顯示位置.....)
      //this.p = args.p || {x: random(width), y:random(height)} //描述為該物件的初始位置，//||(or)，當產生一個物件時，有傳給位置參數，則使用該參數，
      this.p = args.p || createVector(random(width),random(height))
      // this.v = {x:random(-1,1), y:random(-1,1)} //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1)) //把原本的{x:...,y:...}改成"向量"方式
      this.size = random(5,10) //一個物件的放大倍率
      this.color = random(fill_colors) //充滿顏色
      this.stroke = random(line_colors) //外框線條顏色
    }
    draw(){ //畫出單一個物件形狀
      push() //依照我的設定,設定原點(0,0)的位置
        translate(this.p.x,this.p.y) //以該物件為原點
        scale(this.v.x<0?1:-1,-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的為上下翻轉
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4) //線條粗細
        beginShape()
        for(var k=0; k<points.length;k=k+1){
          curveVertex(points[k][0]*this.size,points[k][1]*this.size) // 畫線為圓弧方式畫圖
        }
        endShape()
      pop() //執行pop(),原點(0,0)設定回到整個視窗的左上角
    }
    update(){ //移動程式碼內容
      this.p.add(this.v) //設定好向量後,使用add就可以與上面兩行指令一樣的效果
      if(this.p.x<=0 || this.p.x>=width){//x軸碰到左邊(<=0)，或是碰到右邊(>=height)
         this.v.x = -this.v.x  //把x軸速度方向改變
        }
      if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上邊(<=0)，或是碰到下邊(>=height)
         this.v.y = -this.v.y //把y軸方向速度改變
        }
    }
    isBallInRanger(x,y){  //功能:判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) // 計算兩點(滑鼠)
      if(d<7*this.size){
         return true  //滑鼠與物件的寬度，代表觸碰了，則傳回true的值
        }
      else{
         return false //滑鼠與物件的寬度，代表觸碰了，則傳回false的值
        }
    }
}