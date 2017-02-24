(function(window,document){
    var moving = false,
        theNum,
        lis,hiddenli,
        goTime,startTime,
        btnStart = document.getElementById("startBtn"),
        option={
            "row":3,
            "col":3,
            "width":100
        };;

    function init(){
        var row = option.row,
            col = option.col,
            wid = option.width,
            pos=[],
            li,
            ul = document.getElementsByTagName("ul")[0];
        ul.style.width = row*wid+"px";
        ul.style.height = col*wid+"px";
        ul.innerHTML="";
        for(let i = 0,num=1;i<row;i++){
            for(let j= 0;j<col;j++){
                li = document.createElement("li");
                li.innerText = num;
                li.style.top = i * wid + "px";
                li.style.left = j * wid + "px";
                li.setAttribute("data",i*100+","+j*100)
                li.index = num-1;
                li.addEventListener("click",moveLi,false);
                ul.appendChild(li);
                num++;
                pos.push(i,j);
            }
        }
        lis = ul.getElementsByTagName("li");
        btnStart.addEventListener("click",startGame,false);
    }
    function startGame(){
        var self = this;
        if(self.innerText == "开始游戏"){
            var hidden =Math.floor( Math.random()*lis.length);
            lis[hidden].id = "hidden";
            hiddenli = lis[hidden];
            self.innerText="停止打乱";
            goTime = startTime = setInterval(removebleli,50);
        }else if(self.innerText == "停止打乱"){
            moving = true;
            var time = 30;
            clearInterval(goTime);
            startTime = setInterval(function(){
                self.innerText = "倒计时"+time+"s";
                time--;
                if(time<0){
                    moving = false;
                    clearInterval(startTime);
                    self.innerText = "游戏结束";
                }

            },1000);
        }else if(self.innerText == "游戏结束"||self.innerText == "恭喜过关！"){
            init();
            self.innerText = "开始游戏";
        }
    }
    function removebleli(){
        var result = findLi(hiddenli);
        var indexs =result[Math.floor( Math.random()*result.length)];
        if(theNum == indexs) return;
        theNum = indexs;
        exchange(lis[indexs],hiddenli);
        
        
    }
    function moveLi(){
        var _this = this,
            result = findLi(hiddenli);
        if(!moving) return;
        if(result.indexOf(_this.index)>=0)
            exchange(_this,hiddenli);
        checkPass();
    }
    function exchange(li1,li2){
        var li1Top = li1.style.top,
            li1Left =  li1.style.left,
            li2Top = li2.style.top,
            li2Left =  li2.style.left;
        li1.style.top = li2Top;
        li1.style.left = li2Left;
        li2.style.top = li1Top;
        li2.style.left = li1Left;
    }
    function checkPass(){
        var data,flag=true,
            allli = document.getElementsByTagName("li");
        for(let i=0;i<allli.length;i++){
            data=parseInt(allli[i].style.top)+","+parseInt(allli[i].style.left);
            if(allli[i].attributes.data.value!=data){
                flag = false;
                break;
            }
        }
        if(flag){
            moving = false;
            clearInterval(startTime);
            btnStart.innerText = "恭喜过关！";
        }
    }
    function findLi(node){
        var result = [],
            nodeTop = parseInt(node.style.top),
            nodeLeft =  parseInt(node.style.left);
        for(let i = 0 ;i<lis.length;i++){
            aliTop = parseInt(lis[i].style.top),
            aliLeft =  parseInt(lis[i].style.left);
            if(i==node.index) continue;
            if((Math.abs(aliTop-nodeTop)<=option.width && aliLeft == nodeLeft)||(Math.abs(aliLeft-nodeLeft )<=option.width && aliTop == nodeTop )){
                result.push(lis[i].index);
            }
        }
        return result;
    }
    init();

})(window,document);