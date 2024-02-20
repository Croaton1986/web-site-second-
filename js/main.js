const imgArray = {
    'крест':'./img/крест.png',
    'нолик':'./img/ноль.png',
};
let stepCount = 0;
const winStep = [
    [1,2,3], //0
    [1,4,7], //1 
    [1,5,9], //2
    [2,5,8], //3
    [3,6,9], //4
    [4,5,6], //5
    [7,8,9], //6
    [3,5,7]  //7
]

const chekListUser =[
    {1:false,2:false,3:false},
    {1:false,4:false,7:false},
    {1:false,5:false,9:false},
    {2:false,5:false,8:false},
    {3:false,6:false,9:false},
    {4:false,5:false,6:false},
    {7:false,8:false,9:false},
    {3:false,5:false,7:false}
]

const chekListComp =[
    {1:false,2:false,3:false},
    {1:false,4:false,7:false},
    {1:false,5:false,9:false},
    {2:false,5:false,8:false},
    {3:false,6:false,9:false},
    {4:false,5:false,6:false},
    {7:false,8:false,9:false},
    {3:false,5:false,7:false}
]


const userSteps =[];
const compSteps = [];
const tableArray = Array.from(document.querySelectorAll('.game-table .push'))
const paragWinLose = document.querySelector('.pragraph');
const blackWindow = document.querySelector('.status');
const fillCells = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
};
let updateWinStep = winStep;
// console.log(blackWindow.children[1])
window.onclick = function(e){
    let el = e.target;
    let compStep;
    if(el.classList.contains('pic')){
        if (checkUserStep(el.parentNode.classList[1])){
            el.firstChild.setAttribute('src',imgArray['крест']);
            userPos = el.parentNode.classList[1];
            userSteps.push(userPos);
            fillCheckListuser (userPos)
            // console.log(chekListUser)
            fillCells[userPos] = false;
            if(!checkUserWin(chekListUser)) {
                return false;
            }
            if(checkNobody(fillCells)) {
                return false;
            }


            // console.log(fillCells)
            // checkUserWin()
            let compStep = defineStepComp (updateWinStep,userSteps);

            compSteps.push(compStep);
            console.log(compStep);
            // console.log(compStep);
            fillCheckListcomp (String(compStep));
            fillCells[compStep] = false;
            checkUserLosse(chekListComp)
            console.log(tableArray[compStep-1].childNodes[0].childNodes[0].setAttribute('src',imgArray['ноль']))
            stepCount++;

            

        } else {
            alert('Ячейка занята! Попробуй другую!')
        }
    }
    
}

function checkNobody(list){
    let count = 0;
    for(let i in list){
        if(!list[i]){
            count++;
        }
    }
    if(count == 9){
        paragWinLose.textContent = 'Победила дружба!'
        // console.log(paragWinLose.style)
        paragWinLose.style.visibility = 'visible';
        paragWinLose.classList.add('item-anim')
        blackWindow.children[0].classList.add('black-wondow')
        // console.log(paragWinLose.classList)
        setTimeout(() => {window.location.reload(1);},1500)
        return false;
    }
}

function checkUserStep (pos){
    return fillCells[pos];
}

function checkCompStep (pos){
    return fillCells[pos];
}

function checkUserWin(checkList){
    for(let i of checkList){
        if(Object.values(i)[0] && Object.values(i)[1] && Object.values(i)[2]){
            paragWinLose.textContent = 'Ты победил!'
            // console.log(paragWinLose.style)
            paragWinLose.style.visibility = 'visible';
            paragWinLose.classList.add('item-anim')
            blackWindow.children[0].classList.add('black-wondow')
            // console.log(paragWinLose.classList)
            setTimeout(() => {window.location.reload(1);},1500)
            return false;
        }
    }
    return true    
}

function checkUserLosse(checkList){
    for(let i of checkList){
        if(Object.values(i)[0] && Object.values(i)[1] && Object.values(i)[2]){
            paragWinLose.textContent = 'Ты проиграл!'
            // console.log(paragWinLose.style)
            paragWinLose.style.visibility = 'visible';
            paragWinLose.classList.add('item-anim')
            blackWindow.children[0].classList.add('black-wondow')
            // console.log(paragWinLose.classList)
            setTimeout(() => {window.location.reload(1);},1500)
            return false;
        } 
    }
    return true
}

function fillCheckListuser (pos){
    for(let i of chekListUser){
        if(Object.keys(i).includes(pos)){
            i[pos] = true;
        }
    }
}

function fillCheckListcomp (pos){
    for(let i of chekListComp){
        if(Object.keys(i).includes(pos)){
            i[pos] = true;
        }
    }
}

function newIndexList (){
    let arr = [];
    for(let i in fillCells){
        if(fillCells[i]){
            arr.push(i)
        }
    }
    return arr;
}

function defineStepComp (winstepcomp,stepUser){
    // console.log(winstepcomp)
    let indexArr = []
    let randomElementFromWin = 0;
    let randomElementForStepComp = 0;
    for (let i of winstepcomp){
        let flag = true;
        for(let n of stepUser){
            if(i.includes(parseInt(n))){
                flag = false;
                break;
            } else {
                flag = true;
            }
        }
        flag == true && indexArr.push(winstepcomp.indexOf(i))
    }

    if(indexArr.length == 0){
        indexArr = newIndexList ()

        // randomElementFromWin = winstepcomp[indexArr[Math.floor(Math.random() * indexArr.length)]];
        randomElementForStepComp = indexArr[Math.floor(Math.random() * indexArr.length)];
    }else {
        randomElementFromWin = winstepcomp[indexArr[Math.floor(Math.random() * indexArr.length)]];
        randomElementForStepComp = randomElementFromWin[Math.floor(Math.random() * randomElementFromWin.length)]
    }    

    while (checkCompStep(randomElementForStepComp) == false){
        randomElementForStepComp = randomElementFromWin[Math.floor(Math.random() * randomElementFromWin.length)]
    }

    updateWinStep = [];
    for(let k of indexArr){
        updateWinStep.push(winstepcomp[k]);        
    }

    return randomElementForStepComp;
}
