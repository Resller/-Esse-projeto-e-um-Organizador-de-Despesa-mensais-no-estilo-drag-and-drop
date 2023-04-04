// Date
let nameExpense = '';
let valueExpense = '';
let dayExpense= '';
let monthExpense = '';
let cardExpense = ''
let listCardPaid = [];
let listCardPay = [];
let listCardDelayed = [];
let send = false
let id = 0
let currentId = 0
let currentList = ''
let date = new Date ()
let today = date.getDate()
let menuMobile = false

// event click

document.querySelector('.button-send button').addEventListener('click',openForm);
document.querySelector('.closed').addEventListener('click',closedForm)
document.querySelector('.send button').addEventListener('click',()=>{
    addCard('name','value','day')
});
document.querySelector('.menu-mobile-icon').addEventListener('click',openMenu);
document.querySelector('.mobile button').addEventListener('click',addCardmobile);

// envet drag

document.querySelector('.area-paid').addEventListener('dragover',overPaid);
document.querySelector('.area-paid').addEventListener('dragleave',leavePaid);
document.querySelector('.area-paid').addEventListener('drop',dropPaid);

document.querySelector('.area-pay').addEventListener('dragover',over);
document.querySelector('.area-pay').addEventListener('dragleave',leave);
document.querySelector('.area-pay').addEventListener('drop',drop);

document.querySelector('.area-delayed').addEventListener('dragover',over);
document.querySelector('.area-delayed').addEventListener('dragleave',leave);
document.querySelector('.area-delayed').addEventListener('drop',drop);

document.querySelector('.area-delete').addEventListener('dragover',overDelete);
document.querySelector('.area-delete').addEventListener('dragleave',leaveDelete);
document.querySelector('.area-delete').addEventListener('drop',dropDelete);

// Function envets click

function openForm(){
    open(
        document.querySelector('.area-register'),
        document.querySelector('.area-expense')
    )
}
function closedForm(){
    open(
        document.querySelector('.area-expense'),
        document.querySelector('.area-register')
    )
}

// function envet drag 
function addEventPay (){
    document.querySelectorAll('.area-pay .pay').forEach((item)=>{
        item.addEventListener('dragstart',dragStartPay);
        item.addEventListener('dragend',dragEnd);
    }); 
}
function addEventDelayed (){
    document.querySelectorAll('.area-delayed .pay').forEach((item)=>{
        item.addEventListener('dragstart',dragStartDelayed);
        item.addEventListener('dragend',dragEnd);
    }); 
}
function addEventPaid (){
    document.querySelectorAll('.area-paid .pay').forEach((item)=>{
        item.addEventListener('dragstart',dragStartPaid);
        item.addEventListener('dragend',dragEnd);
    }); 
}

function dragStartPay (e){
    e.currentTarget.style.opacity = '0.6'
    currentId =  e.currentTarget.getAttribute('data-id');
    currentList = 'pay'
}
function dragStartDelayed(e){
    e.currentTarget.style.opacity = '0.6'
    currentId =  e.currentTarget.getAttribute('data-id');
    currentList = 'delayed'
}
function dragStartPaid(e){
    e.currentTarget.style.opacity = '0.6'
    console.log(e.currentTarget.getAttribute('data-id'))
    currentId = e.currentTarget.getAttribute('data-id');
    currentList = 'paid'
}
function dragEnd (e){
    e.currentTarget.style.opacity = '1'
}
function overPaid (e){
   if(e.currentTarget.classList == 'area-paid'){
     e.preventDefault();
     e.currentTarget.style.backgroundColor = ' rgba(0, 82, 33, 0.4) ' 
   } 
   
}
function leavePaid (e){
    e.currentTarget.style.backgroundColor = ' transparent '
}
function over(e){
    if(e.currentTarget.classList == 'area-pay'){
        e.preventDefault();
        e.currentTarget.style.backgroundColor = ' rgba(0, 0, 128, 0.4)' 
    }else if(e.currentTarget.classList == 'area-delayed'){
        e.preventDefault();
        e.currentTarget.style.backgroundColor = ' rgba(139, 0, 0, 0.4)' 
    } 
}

function leave(e){
    e.currentTarget.style.backgroundColor = ' transparent '
}

function dropPaid (e){
    e.currentTarget.style.backgroundColor = ' transparent '
    if(currentList == 'pay' ){
        for(let i in listCardPay){
            if(listCardPay[i].id == currentId){               
                
                listCardPaid.push(listCardPay[i]);
                listCardPay.splice(parseInt(i),1);
                upDatePagePay();
            }
        }
   }else if(currentList == 'delayed') {
        for(let i in listCardDelayed){
            if(listCardDelayed[i].id == currentId){
            
                listCardPaid.push(listCardDelayed[i]);
                listCardDelayed.splice(parseInt(i),1);
                upDatePageDelayed ();   
            }
        }
   }else{
        return
   }
   upDatePagePaid ();
}

function drop (e){
    e.currentTarget.style.backgroundColor = ' transparent '

    if(listCardPaid.length > 0){
        for(let i in listCardPaid){
            if(listCardPaid[i].id == currentId){
                if(listCardPaid[i].day >= today){
                    listCardPay.push(listCardPaid[i]);
                    upDatePagePay()
                }else{
                    listCardDelayed.push(listCardPaid[i]);
                    upDatePageDelayed ()
                }
                listCardPaid.splice(parseInt(i),1);
                upDatePagePaid ()
            }
        }
    }
}

function overDelete(e){
    e.preventDefault();
    let img =  document.querySelector('.area-delete img');
    img.src = 'assets/img/open-trash-can.png';
    img.style.width = '40px'
   
}
function leaveDelete(){
    closedBin ();
}

function dropDelete(){

    if(currentList == 'pay'){
        for(let i in listCardPay){
            if(listCardPay[i].id == currentId){
                listCardPay.splice(parseInt(i),1);
                upDatePagePay();
            }
        }
    }else if(currentList == 'delayed'){
        for(let i in listCardDelayed){
            if(listCardDelayed[i].id == currentId){
                listCardDelayed.splice(parseInt(i),1);
                upDatePageDelayed();
            }
        }
    }else if(currentList == 'paid' ){
        for(let i in listCardPaid){
            if(listCardPaid[i].id == currentId){
                listCardPaid.splice(parseInt(i),1);
                upDatePagePaid();
            }
        }
    }
    closedBin ();
}

//function mobile 

function addCardmobile(){
    console.log('ok')
    addCard('name-mobile','value-mobile','day-mobile')
}

// function action 

function closedBin (){
    let img =  document.querySelector('.area-delete img');
    img.src = 'assets/img/trash-can-with-cover.png';
    img.style.width = '35px'
}

function upDatePagePay(){
    orderCard (listCardPay);
    upDateCar(listCardPay,'.area-pay');
    calcExpense (listCardPay,'#total-a');
    addEventPay ();
}

function upDatePageDelayed (){
    orderCard (listCardDelayed);
    upDateCar(listCardDelayed,'.area-delayed');
    calcExpense (listCardDelayed,'#total-b'); 
    addEventDelayed ();
}

function upDatePagePaid (){
    orderCard (listCardPaid);
    upDateCar(listCardPaid,'.area-paid');
    calcExpense (listCardPaid,'#total-c');
    addEventPaid ();
}

function openMenu(){
    let areaMenu = document.querySelector('.register-mobile')
    if(menuMobile == false){
            areaMenu.style.display = 'flex'
        setTimeout(()=>{
            areaMenu.style.right = 0
        },100)
    
        menuMobile = true
    }else{
        areaMenu.style.right = '-220px'
        setTimeout(()=>{
            areaMenu.style.display = 'none'
        },700)
        menuMobile = false
    }
}

function open(open,closed){
    open.style.display = 'flex';
    open.style.opacity = '0';
    closed.style.opacity = '0';
    setTimeout(()=>{
        closed.style.display ='none';
        open.style.opacity = '1'
    },500)
}

function validationForm(name,vlr,day,areaName,areavlr,areaDay,areaInfo){
    let erroName = document.querySelector(`#${areaName}`);
    let erroVlr = document.querySelector(`#${areavlr}`);
    let erroDay = document.querySelector(`#${areaDay}`);
    
    let campo1 = false;
    let campo2 = false;
    let campo3 = false;

    if(name == ''){
        addClass(erroName,'Infome uma despesa','erro');
    }else if(name.length > 15){
        addClass(erroName,'limete de caracteres 15','erro');

    }else{
        if(erroName.classList == 'erro'){
            removeClass(erroName);
        } 
        campo1 = true
    }
    
    if(vlr <= 0 || isNaN(vlr) ){
        addClass(erroVlr,'Informe um Valor','erro');
        
    }else{
       if (erroVlr.classList == 'erro'){
            removeClass(erroVlr);
        } 
       campo2= true;
    }
    
    if(day <= 0 || day > 31 || isNaN(vlr) ){
        addClass(erroDay,'Informe um dia valido','erro');
     
    }else{
       if (erroDay.classList == 'erro'){
            removeClass(erroDay);
        } 
        campo3 = true
    }
     
    if(campo1 && campo2 && campo3){
        document.querySelector(`.${areaInfo}`).innerHTML =`Cadrastro Feito com Sucesso` 
        document.querySelector(`.${areaInfo}`).classList.add('info-ok')
        
        setTimeout(()=>{
            document.querySelector(`.${areaInfo}`).innerHTML =`` 
            document.querySelector(`.${areaInfo}`).classList.remove('info-ok')
        },3000)
        
        send = true
        clearCampo()
    }else{
        send = false
    }
}

function addClass(area,msg,erro){
    area.innerHTML = msg;
    area.classList.add(erro)
}
function removeClass(area){
    area.innerHTML = ''
    area.classList.remove('erro');
}

function clearCampo(){
    let campos = document.querySelectorAll('input')
    for(let i in campos){
        campos[i].value = ''
    }
}

function addCard(areaName,areavlr,areaDay){
    nameExpense = document.querySelector(`#${areaName}`).value;
    valueExpense = document.querySelector(`#${areavlr}`).value;
    dayExpense = document.querySelector(`#${areaDay}`).value;
 
    if(menuMobile){
        validationForm( nameExpense,valueExpense,dayExpense,'erro-name-mobile','erro-vlr-mobile','erro-day-mobile','info-mobile');
    }else{
        validationForm( nameExpense,valueExpense,dayExpense,'erro-name','erro-vlr','erro-day','info');
    }

    if(send){
        dayExpense = parseInt(dayExpense);
        dayExpense = dayExpense < 10 ? '0' + dayExpense : dayExpense
        cardExpense = {
            card:` <div draggable="true" data-id="${id}" class="pay"> <div class="name-pay">${nameExpense}</div><div class="vlr-pay">${ parseInt(valueExpense).toFixed(2)}</div><div class="venc-pay">${dayExpense}</div></div>`,
            day : dayExpense,
            value :  parseInt(valueExpense),
            id : id
        };
        id++;
        selectCard(cardExpense,dayExpense);
        upDateTitle ();
    }
}

function selectCard(card,day){
     
    if(day >= today){
       listCardPay.push(card);
       orderCard (listCardPay)
       upDateCar(listCardPay,'.area-pay')
       calcExpense (listCardPay,'#total-a')
       addEventPay ()
            
    }else{
       listCardDelayed.push(card);
       orderCard (listCardDelayed);
       upDateCar(listCardDelayed,'.area-delayed');
       calcExpense (listCardDelayed,'#total-b');
       addEventDelayed ();
    }
}

function orderCard (list){
    list.sort((a,b)=>{
        if(a.day > b.day){
            return 1
        }else if(a.day < b.day){
            return -1
        }else{
            return 0
        }
    })
}

function upDateCar(listCard,areaCard){
    document.querySelector(`${areaCard}`).innerHTML = ''
    if( listCard.length > 0){
        for(let i in listCard){
            document.querySelector(areaCard).innerHTML += listCard[i].card
        }
    } 
}

function upDateTitle (){
    monthExpense = document.querySelector(`#month`).value;
    document.querySelector('.title-expense h2 span').innerHTML = monthExpense
}
function calcExpense (list,area){ 
    let total = 0  
     for(let i in list){
        total +=  list[i].value
    }
    document.querySelector(area).innerHTML = `R$ ${total.toFixed(2)}` 
}

