$(document).ready(function (){
    let i = 0;
    let txt;
    let m = 12;
    let constV = 66;
    let realBlack = 0;
    let realWrite = 0;
    let blackHorizon = new Array(m);
    let writeHorizon = new Array(m);
    let blackVertical = new Array(m);
    let writeVertical = new Array(m);
    let blackSlashLeft = [];
    let writeSlashLeft = [];
    let blackSlashRight = [];
    let writeSlashRight = [];
    let blackSuccess = false;
    let writeSuccess = false;
    for(let i = 0;i<m;i++){
        blackHorizon[i] = []
        writeHorizon[i] = []
        blackVertical[i] = []
        writeVertical[i] = []
    }
    $("#div1").click(function (e){
        if(i%2===0){
            txt = $("<img>").attr("src","./img/black.png").attr("class","pieces")
            txt.css("position","absolute").css("top",Math.round(e.clientY/constV)*constV-15).css("left",Math.round(e.clientX/constV)*constV-15)
            blackHorizon[Math.round(e.clientY/constV)].push(Math.round(e.clientX/constV)*constV-15)
            blackVertical[Math.round(e.clientX/constV)].push(Math.round(e.clientY/constV)*constV-15)
            blackSlashRight.push({x:Math.round(e.clientX/constV)*constV-15,y:Math.round(e.clientY/constV)*constV-15})
            blackSlashLeft.push({x:Math.round(e.clientX/constV)*constV-15,y:Math.round(e.clientY/constV)*constV-15})
            realBlack++;
        }else{
            txt = $("<img>").attr("src","./img/write.png").attr("class","pieces")
            txt.css("position","absolute").css("top",Math.round(e.clientY/constV)*constV-15).css("left",Math.round(e.clientX/constV)*constV-15)
            writeHorizon[Math.round(e.clientY/constV)].push(Math.round(e.clientX/constV)*constV-15)
            writeVertical[Math.round(e.clientX/constV)].push(Math.round(e.clientY/constV)*constV-15)
            writeSlashRight.push({x:Math.round(e.clientX/constV)*constV-15,y:Math.round(e.clientY/constV)*constV-15})
            writeSlashLeft.push({x:Math.round(e.clientX/constV)*constV-15,y:Math.round(e.clientY/constV)*constV-15})
            realWrite++;
        }
        txt.attr("id","pieces"+i)
        $("#div1").append(txt)
        i++;
        judgeSuccess();
    });

    $("#btn").click(()=>{
        i--
        if(i<0){
            alert("撤销到底了，无法继续撤销了")
            i = 0
        }else{
            let s = $("#pieces"+i);
            s.remove()
            if(i%2===0){
                realBlack--;
                blackSlashRight.splice(realBlack,1)
                blackSlashLeft.splice(realBlack,1)
                blackHorizon[(s.css("top")+15)/constV].splice(realBlack,1)
                blackVertical[(s.css("left")+15)/constV].splice(realBlack,1)
            }else{
                realWrite--;
                writeSlashLeft.splice(realWrite,1)
                writeSlashRight.splice(realWrite,1)
                writeHorizon[(s.css("top")+15)/constV].splice(realBlack,1)
                writeVertical[(s.css("left")+15)/constV].splice(realBlack,1)
            }
        }
    })
    function judgeSuccess() {
        for(let i = 0;i<m;i++){
            blackHorizon[i].sort((a,b)=>{return a-b;})
            writeHorizon[i].sort((a,b)=>{return a-b;})
            blackVertical[i].sort((a,b)=>{return a-b;})
            writeVertical[i].sort((a,b)=>{return a-b;})
        }
        blackSlashLeft.sort((a,b)=>{
            if(a.x !== b.x){
                return a.x - b.x
            }
            return  b.y - a.y
        })
        blackSlashRight.sort((a,b)=>{
            if(a.x !== b.x){
                return a.x - b.x
            }
            return a.y - b.x
        })
        writeSlashLeft.sort((a,b)=>{
            if(a.x !== b.x){
                return a.x - b.x
            }
            return  b.y - a.y
        })
        writeSlashRight.sort((a,b)=>{
            if(a.x !== b.x){
                return a.x - b.x
            }
            return a.y - b.x
        })
        for(let i = 0;i<m;i++){
            if(blackHorizon[i].length >= 5 && blackSuccess === false){
                for(let j = 0;j<blackHorizon[i].length-4;j++){
                    let blackH = 1;
                    let x = blackHorizon[i][j]
                    for(let k = j+1;k<blackHorizon[i].length;k++){
                        if(blackHorizon[i][k]-constV===x){
                            x+=constV;
                            blackH++;
                        }
                        if(blackH >= 5){
                            blackSuccess = true
                        }
                    }
                }
            }
        }
        
        for(let i = 0;i<m;i++){
            if(blackVertical[i].length >= 5 && blackSuccess === false){
                for(let j = 0;j<blackVertical[i].length-4;j++){
                    let blackV = 1;
                    let y = blackVertical[i][j]
                    for(let k = j+1;k<blackVertical[i].length;k++){
                        if(blackVertical[i][k]-constV===y){
                            y+=constV;
                            blackV++;
                        }
                        if(blackV >= 5){
                            blackSuccess = true
                        }
                    }
                }
            }
        }
        if(blackSlashRight.length >= 5 && blackSuccess === false){
            for(let i = 0;i<blackSlashRight.length-4 && blackSuccess === false;i++){
                let blackR = 1;
                if(i+4<blackSlashRight.length){
                    let x = blackSlashRight[i].x
                    let y = blackSlashRight[i].y
                    for(let j = i+1;j<blackSlashRight.length;j++){
                        if(x===blackSlashRight[j].x || y === blackSlashRight[j].y){
                            continue
                        }
                        if(x+constV === blackSlashRight[j].x && y+constV === blackSlashRight[j].y){
                            x+=constV
                            y+=constV
                            blackR++;
                        }
                        if(blackR >= 5){
                            blackSuccess = true
                            break;
                        }
                    }
                }
            }
        }

        if(blackSlashLeft.length >= 5 && blackSuccess === false){
            for(let i = 0;i<blackSlashLeft.length-4 && blackSuccess === false;i++){
                let blackL = 1;
                if(i+4<blackSlashLeft.length){
                    let x = blackSlashLeft[i].x
                    let y = blackSlashLeft[i].y
                    for(let j = i+1;j<blackSlashLeft.length;j++){
                        if(x===blackSlashLeft[j].x || y === blackSlashLeft[j].y){
                            continue
                        }
                        if(x+constV === blackSlashLeft[j].x && y-constV === blackSlashLeft[j].y){
                            x+=constV
                            y-=constV
                            blackL++;
                        }
                        if(blackL >= 5){
                            blackSuccess = true
                            break;
                        }
                    }
                }
            }
        }
        if(blackSuccess === true){
            blackSuccess = false
            alert("黑棋胜利,5秒后即将开始新的对局")
            setTimeout(()=>{
                location.reload()
            },5000)
        }
        for(let i = 0;i<m;i++){
            if(writeHorizon[i].length >= 5 && writeSuccess === false){
                for(let j = 0;j<writeHorizon[i].length-4;j++){
                    let writeH = 1;
                    let x = writeHorizon[i][j]
                    for(let k = j+1;k<writeHorizon[i].length;k++){
                        if(writeHorizon[i][k]-constV===x){
                            x+=constV;
                            writeH++;
                        }
                        if(writeH >= 5){
                            writeSuccess = true
                        }
                    }
                }
            }
        }
        for(let i = 0;i<m;i++){
            if(writeVertical[i].length >= 5 && writeSuccess === false){
                for(let j = 0;j<writeVertical[i].length-4;j++){
                    let writeV = 1;
                    let y = writeVertical[i][j]
                    for(let k = j+1;k<writeVertical[i].length;k++){
                        if(writeVertical[i][k]-constV===y){
                            y+=constV;
                            writeV++;
                        }
                        if(writeV >= 5){
                            writeSuccess = true
                        }
                    }
                }
            }
        }
        if(writeSlashRight.length >= 5 && writeSuccess === false){
            for(let i = 0;i<writeSlashRight.length-4 && writeSuccess === false;i++){
                let writeR = 1;
                if(i+4<writeSlashRight.length){
                    let x = writeSlashRight[i].x
                    let y = writeSlashRight[i].y
                    for(let j = i+1;j<writeSlashRight.length;j++){
                        if(x===writeSlashRight[j].x || y === writeSlashRight[j].y){
                            continue
                        }
                        if(x+constV === writeSlashRight[j].x && y+constV === writeSlashRight[j].y){
                            x+=constV
                            y+=constV
                            writeR++;
                        }
                        if(writeR >= 5){
                            writeSuccess = true
                            break;
                        }
                    }
                }
            }
        }
66
        if(writeSlashLeft.length >= 5 && writeSuccess === false){
            for(let i = 0;i<writeSlashLeft.length-4 && writeSuccess === false;i++){
                let writeL = 1;
                if(i+4<writeSlashLeft.length){
                    let x = writeSlashLeft[i].x
                    let y = writeSlashLeft[i].y
                    for(let j = i+1;j<writeSlashLeft.length;j++){
                        if(x===writeSlashLeft[j].x || y === writeSlashLeft[j].y){
                            continue
                        }
                        if(x+constV === writeSlashLeft[j].x && y-constV === writeSlashLeft[j].y){
                            x+=constV
                            y-=constV
                            writeL++;
                        }
                        if(writeL >= 5){
                            writeSuccess = true
                            break;
                        }
                    }
                }
            }
        }
        if(writeSuccess === true){
            writeSuccess = false
            alert("白棋胜利,5秒后即将开始新的对局")
            setTimeout(()=>{
                location.reload()
            },5000)
        }
    }
})