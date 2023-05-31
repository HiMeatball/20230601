var monster_colors =  "e7ecef-274c77-6096ba-a3cef1-8b8c89".split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物類別,名稱為 Monster
    constructor(args){ //預設值,基本資料(物件的顏色,移動的速度,大小,初始顯示位置.....)
        this.r = args.r || random(50,100) //設計怪物的主體,如果傳參數args.r來設定怪物大小
        this.p = args.p || createVector(random(width),random (height)) //建立一個向量,{x:width/2 , y:height/2}
        this.v = args.v || createVector(random(-1,1),random (-1,1)) //移動的速度,如果沒有傳args參數,就會利用亂數
        this.color = args.color || random(monster_colors) 
        this.mode = random(["happy","bad"]) //++++++++++++++++++++
        this.dead=false //代表活著
        this.timenum=0 //延長時間，讓它顯示死亡後的畫面
    }

draw(){ //劃出元件
    if(this.dead==false){
     push() //重新設定圓點位置
   
     translate(this.p.x,this.p.y)//把原點座標(0,0)一到物件中心位置
     fill(this.color)
     noStroke()
     ellipse(0,0,this.r)
  
      if(this.mode=="happy"){
          fill(255)
          ellipse(0,0,this.r/2)
          fill(0)
          rectMode(CENTER)
          rect(0,0,this.r/3)
      }
      else{
          fill(255)
          arc(0,0,this.r/2,this.r/2,0,PI)
          fill(0)
          arc(0,0,this.r/3,this.r/3,0,PI)     
        }
        //++++++++++++++++++++++
        stroke(this.color)
        strokeWeight(4)
        noFill()
        //line(this.r/2,0,this.r,0)
        for(var j=0;j<8;j++){
            rotate(PI)
        beginShape()
                for(var i=0;i<(this.r/2);i++){
                    vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                }
                endShape()
            }
     pop() //恢復原典到整個視窗左上角
        }
    else{ //怪物死亡的畫面
        this.timenum=this.timenum+1
     push()
      translate(this.p.x,this.p.y)//把原點座標(0,0)一到物件中心位置
      fill(this.color)
      noStroke()
      ellipse(0,0,this.r)
      stroke(255)
      line(-this.r/2,0,this.r/2,0)
      stroke(this.color)
      strokeWeight(4)
      noFill()
      for(var j=0;j<8;j++){
        rotate(PI)
        line(this.r/2,0,this.r,0)
      }

     pop()
    }
}
update(){ //計算出移動園後的位置
    this.p.add(this.v)
    //++++++++++++++++碰壁+++++++++++++++++++
    if(this.p.x<=0 || this.p.x>=width){//x軸碰到左邊(<=0)，或是碰到右邊(>=height)
        this.v.x = -this.v.x  //把x軸速度方向改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上邊(<=0)，或是碰到下邊(>=height)
      this.v.y = -this.v.y //把y軸方向速度改變
  }
}
isBallInRanger(x,y){  //功能:判斷滑鼠按下的位置是否在物件的範圍內
    let d = dist(x,y,this.p.x,this.p.y) // 計算兩點(滑鼠)
    if(d<this.r/2){
      return true  //滑鼠與物件的寬度，代表觸碰了，則傳回true的值
  }else{
    return false //滑鼠與物件的寬度，代表觸碰了，則傳回true的值
  }
}
}