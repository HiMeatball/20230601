let points = [[8,2],[9,1], [16,1], [17,2],[17,3],[16,4],[17,4],[17,5],[14,8],[18,8],[19,9],[19,10],[15,14],[16,15],[16,17],[14,19],[12,19],[10,17],[10,15],[11,14],[10,13],[9,14],[7,14],[5,12],[5,10],[7,8],[9,8],[10,9],[11,8],[8,5],[8,2],[5,4],[6,5],[6,7],[4,7],[3,6],[3,4],[5,2],[8,2]]; //畫一隻老鼠
var fill_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)
var line_colors = "001524-15616d-ffecd1-ff7d00-78290f".split("-").map(a=>"#"+a)

//++++++++設定畫points所有"點"的物件變數
var ball //"目前要處理"的物件,暫時放在ball變數內
var balls =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

//++++++++設定飛彈物件的變數
var bullet  //"目前要處理"的物件,暫時放在ball變數內
var bullets =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

//++++++++設定怪物物件的變數
var monster  //"目前要處理"的物件,暫時放在monster變數內
var monsters =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++++++

//++++++設定砲台位置++++++++
var shipP
//+++++++++++++++++++++++++

var score=0

function preload(){ //程式碼準備執行之前,所執行的程式碼內容,
  mouse_sound=loadSound("sound/cat_like3a.mp3")
  bullet_sound=loadSound("sound/poka.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP=createVector(width/2,height/2) //預設砲台的位置為(width/2,height/2)
  for(var i=0;i<20;i=i+1){ //i=0、1、2、3、4、...、8、9
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<20;i=i+1){ //i=0、1、2、3、4、...、8、9
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內
  }
}

function draw() {
 background(220);
 if(keyIsPressed){
  if(key=='ArrowLeft'|| key=='a'){ //按下鍵盤的往左鍵
    shipP.x=shipP.x-5
  }
  if(key=='ArrowRight' || key=='d'){ //按下鍵盤的往右鍵
    shipP.x=shipP.x+5
  }
  if(key=='ArrowUp' || key=='w'){ //按下鍵盤的往上鍵
    shipP.y=shipP.y-5
  }
  if(key=='ArrowDown' || key=='s'){ //按下鍵盤的往下鍵
    shipP.y=shipP.y+5
  }
}
//老鼠的顯示
for(let ball of balls) //只要是陣列的方式，都可以利用此方式處理
 {
  ball.draw()
  ball.update()
  for(let bullet of bullets){ //檢查每一個飛彈物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))
        bullets.splice(bullets.indexOf(bullet),1)
        score = score - 1
        mouse_sound.play()
      }

  }
 }


 //飛彈的顯示
 for(let bullet of bullets) //只要是陣列的方式，都可以利用此方式處理
 {
  bullet.draw()
  bullet.update()
 }

 //怪物的顯示
 for(let monster of monsters) //只要是陣列的方式，都可以利用此方式處理
 {
  if(monster.dead==true && monster.timenum>4 ){
    monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出
  }
  monster.draw()
  monster.update()
  for(let bullet of bullets){ //檢查每一個飛彈物件
    if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
      // monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出
      bullets.splice(bullets.indexOf(bullet),1)
      score = score + 1
      monster.dead=true //代表該怪物死亡
    }

}
 }

 textSize(50)
 text(score,50,50) //在座標為(50,50)上，顯示score分數內容
 push() //重新規劃原點(0,0),在視窗的中間
   let dx = mouseX - width/2
   let dy = mouseY - height/2
   let angle = atan2(dy,dx)
   translate(shipP.x,shipP.y) //把砲台中心點放在視窗中間
   fill("#c9ada7")
   noStroke()
   rotate(angle)
   triangle(-25,-25,-25,25,50,0) //設定三個點,畫成一個三角形
   ellipse(0,0,50)
 pop() //恢復原本設定,原點(0,0)在視窗的左上角
}

function mousePressed(){
 //++++++++++++按一下產生一個飛彈+++++++++++++
 bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
 bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
 bullet_sound.play()
}  

function keyPressed(){
  if(key==' '){ //按下空白建，發射飛彈
    bullet=new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生飛彈)
    bullets.push(bullet) //把Bullet的物件放入到Bullet陣列內(丟到倉庫)
    bullet_sound.play()
  }
}