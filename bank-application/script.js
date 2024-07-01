let accountData=[];

const CreateAccBtn= document.querySelector('#cbtn')
const depositMoney=document.querySelector('#depoBtn')
const widthdrawAmount =document.querySelector('#wBtn')

const usernam= document.querySelector("#usrnam")
const accN=document.querySelector('#accn')
const initalDeposit = document.querySelector('#initalDiposit')

let result =document.querySelector('#result')
const depoAccount = document.querySelector("#depoAccount");
const depoAmount = document.querySelector("#depoAmount")
const withDrawAcc=document.querySelector('#Wacc')
const withDrawAmount = document.querySelector("#Wamount")


const fromSend=document.querySelector("#fromsnd")    
const toSend=document.querySelector("#tosnd")  
const sendBtn=document.querySelector("#sendBtn")
const tsAmt=document.querySelector("#amt")
// let setOpt=document.querySelector('.otp');
// let otpBox=document.querySelector('.otpBox')
// let otpBtn=document.querySelector('#otpBtn')
// let optInput = document.querySelector('.optInput')

   //OTP AREA 
   let otpBox= document.querySelector(".otpBox")
   let otpI=document.querySelector("#otpI")
     
   let otpStatus=document.querySelector("#otpStatus")
   
   let otpCode=document.querySelector("#otpC")
   let verifyOtpBtn=document.querySelector("#otpBtn")
   
   let resendOtpBtn=document.querySelector("#resendOtpBtn")
   
    
    
      let sender;
      let reciver;
      
      let timerId;
     let otpC;
      let leftTime=15;



let fmoney;

  class Account{
    constructor(userName,accountNumber, initialDeposit=0,history={}, currentBalance=0, recive=0, total=0, grandTotal=0,myOtpCodeSet ){
        this.userName=userName;
        this.accountNumber=accountNumber;
        this.initialDeposit=initialDeposit;
        this.currentBalance=currentBalance;
        this.recive=recive;
        this.total=total;
        this.grandTotal=grandTotal;
        this.history=history;
        this.myOtpCodeSet=myOtpCodeSet;


    }

    // Create an account
createAccount(){

      const alreadyAccCreated = accountData?.find(acc=> acc.userName === this.userName ||  acc.accountNumber === this.accountNumber)
      
      if(alreadyAccCreated){
        return alert('Account already exists.')
      }
      const id=crypto.randomUUID().toString();
      const user={
        userName:this.userName,
         accountNumber:this.accountNumber,
         initialDeposit: this.initialDeposit,
         currentBalance:this.currentBalance,
         total:Number(this.total + this.initialDeposit),
         grandTotal:this.grandTotal,
         history:{total:this.total, recive:this.recive, currentBalance:this.currentBalance, grandTotal:this.grandTotal},
         id,
      }
     
      accountData.push(user) 
      alert('Successfully An Account created')
}
// deposit
depositMoney(accountNo, amount){
   if(amount < 5){
    return alert('minimum Deposit amount is 10')
   }
      let checkAccount=accountData?.find(account => account.accountNumber === accountNo)
      console.log(accountNo, checkAccount)
      if(!checkAccount){
        return alert('The account does not match.')
      }
 const updateData = accountData?.map((ele, index)=>{
  console.log(ele.accountNumber, accountNo)
     if(ele.accountNumber === accountNo){
      return {...ele, total:Number(ele.total) + Number(amount)}
     }else{
      return ele
     }
 }) 

 accountData=updateData
 alert('Successfully Deposited')
}

// Withdraw
withDrawAmount(accountNo, amount){
  
      let checkAccount=accountData?.find(account => account.accountNumber === accountNo)
      console.log(checkAccount)
      if(!checkAccount){
        return alert('The account does not match.')
      }

      if(amount > checkAccount.total){
        return alert('You do not have sufficient balance.')
       }

 const updateData = accountData?.map((ele, index)=>{
 
     if(ele.accountNumber === accountNo){
      return {...ele, total:Number(ele.total) - Number(amount)}
     }else{
      return ele
     }
 }) 

 accountData=updateData
 alert('Successfully Withdrawn')
}

//Send Money 

transferMoney(sender, reciver, rmoney){


let fromInfo=accountData?.find(ele=>Number(ele.accountNumber) === Number(sender))

let transferInfo=accountData?.find(ele=>Number(ele.accountNumber) === Number(reciver))

if(!fromInfo){
  return alert("Not found")
}


if(Number(fromInfo.accountNumber) !== Number(sender)) {
  return alert("Account not found")
  }
  
if(Number(transferInfo.accountNumber) !== Number(reciver)) {
      return alert("Reciver Account not found")
  }

  if(rmoney > fromInfo.total ){
    return alert('Sorry!!! You do not have sufficient Balalce!')
  }


  this.decreseAmount(fromInfo,sender, rmoney)
let transfer=accountData.map(item=>{
  
  let finalCalculate;

  if(item.accountNumber === transferInfo.accountNumber){
  const sendAmount={...item, recive:rmoney} 
 
if(item.accountNumber === transferInfo.accountNumber  ){

  finalCalculate = Number(transferInfo.total + rmoney)  
}

  return( 

    {...item, total:finalCalculate, currentBalance:this.currentBalance, grandTotal:finalCalculate, recive:rmoney } )
  }else{
      return item;
  }
  
})

console.log(transfer.map((item,ind)=> item))
accountData =transfer
  


   
} 

decreseAmount(fromInfo, sender, rmoney){

 let transferdecrese=accountData?.map(item=>{
  
  let finalCalculateDecrese;
  if(fromInfo.accountNumber === sender){
 
if(item.accountNumber === fromInfo.accountNumber  ){
console.log(item.accountNumber === fromInfo.accountNumber)
  finalCalculateDecrese = Number(fromInfo.total - rmoney) ; 
   console.log(finalCalculateDecrese)
}
  return( 

    {...item, total:finalCalculateDecrese, currentBalance:this.currentBalance, grandTotal:finalCalculateDecrese, recive:rmoney } )
  }else{
      return item;
  }
})
accountData =transferdecrese
alert('Successfully Transferred 💪')
 
}
// OTP Start
otpMainFn(sender, reciver, rmoney){
  // clearInterval(timerId)
   const findAc=accountData.find(ac=> ac.accountNumber)

if(sender && reciver && rmoney !== "" ){
if(Number(sender) || Number(reciver) === findAc.accountNumber){
    otpBox.style.display="block";
resendOtpBtn.style.display="none"; 

otpC=Math.floor(Math.random()*90000)+99999;
otpCode.innerHTML=otpC;

timerId=setInterval(this.otpExpaire,1000)
leftTime=15;
if(leftTime == -1){
   clearInterval(timerId)
   
   resendOtpBtn.style.display="block";
   }else{
     
  otpStatus.innerHTML=`Your OTP will expire in 15 seconds : ${leftTime} `
       leftTime--;
   }
}else {
    alert("Acount not match")
}

}
}
// verify 
verifyOtp(){
  
  // if(leftTime <=0){
  //   return alert('This OTP has been expaired')
  // }
  // console.log(Number(otpC) , Number(otpI.value))

     if(Number(otpC) === Number(otpI.value)){
        
           // this.transferMoney()
             fromSend.value=null;
           toSend.value=null;
           tsAmt.value=null;
            //  alert ("Successed 💪")
            otpI.value=null;
            otpBox.style.display="none";
            
        }else {
            alert("The OTP you entered doesn't match!!  Please try again!")
            return null
        }
      
   
       
     }
//verify End

//OPT EXPAIRE
 otpExpaire(){
     
  if(leftTime == -1){
  clearInterval(timerId)
  //resetOtp()
  //sendBtn.diaabled="disabled"
  resendOtpBtn.style.display="block"
  }else{
otpStatus.innerHTML=`Your OTP will expire in 15 seconds : ${leftTime} `
      leftTime--;
  }    
   
}
//OPT EXPAIRE End



// OTP END

  }
  
//create Account action
CreateAccBtn.addEventListener('click', ()=>{
 
          const userN= usernam.value;
          const accNum = accN.value;
          const initalDepo= initalDeposit.value; 
  const acc=new Account(userN,accNum, initalDepo)
    
    acc.createAccount()
   displayData(accountData)

})

// Deposit action
depositMoney.addEventListener('click', ()=>{
    const depoAcc= depoAccount.value;
    const depoAmt= depoAmount.value;

   const deposit= new Account()

   deposit.depositMoney(depoAcc, depoAmt)
    displayData(accountData)  

})
  
//Withdraw action

widthdrawAmount.addEventListener('click', ()=>{
  const accountNo= withDrawAcc.value;
  const amount=withDrawAmount.value;
  
  const withDraw=new Account()
  
  withDraw.withDrawAmount(accountNo,amount)
  displayData(accountData)
})

// Send 

sendBtn.addEventListener("click", ()=>{
  otpCode.style.display="block";
 let sender=fromSend.value;
 let reciver=toSend.value;
let rmoney=Number(tsAmt.value);

  const transferAmount=new Account();
  transferAmount.otpMainFn(sender, reciver, rmoney)
  

}) 

verifyOtpBtn.addEventListener("click", ()=>{
  otpCode.style.display="block";
  let sender=fromSend.value;
 let reciver=toSend.value;
let rmoney=Number(tsAmt.value);
  const verifyOTP= new Account();
  if(Number(otpC) !== Number(otpI.value)){
    alert("The OTP you entered doesn't match!!  Please try again!")
    return null
  }else{
    if(leftTime <=0){
      return alert('This OTP has been expired')
    }else{
  
      verifyOTP.verifyOtp()
      verifyOTP.transferMoney(sender, reciver, rmoney);
      displayData(accountData)
    }
  }

 
 
})


resendOtpBtn.addEventListener("click",()=>{
  otpCode.style.display="block";
   const otpExpaireAction= new Account();
    timerId=setInterval(otpExpaireAction.otpExpaire,1000)
    otpC=Math.floor(Math.random()*90000)+99999;
    otpCode.innerHTML=otpC;
leftTime=15;
  if(leftTime == -1){
     clearInterval(timerId)
     
     resendOtpBtn.style.display="block";
     }else{
    otpStatus.innerHTML=`Your OTP will expire in 15 seconds : ${leftTime} `
         leftTime--;
     }
     })


     
function displayData(arr){
  console.log(arr)
  let myStyle;
  result.innerHTML=''
  arr?.map((element, ind) => {
    if(element?.recive){
      myStyle={
        color:'#151',
        transform: 'scale(15.5)',
        transitionDelay:"10s"
      }
    }else{
      myStyle={
        backgroundColor:'#0101',
      }
    }
    const ele=document.createElement('ul')
   
    ele.innerHTML=`
    <div class="box">
    <div>
       <li class="eleItems">Name :  <span style="color:${myStyle.color}"> ${element.userName} </span></li> 
    </div>
     <div>
     <li class="eleItems">Account No : <span style="color:${myStyle.color}; transform:${myStyle.transform}">  ${element.accountNumber} </span></li>
   
     <li class="eleItems">Total : <span> ${element.total}</span></li>
     </div>
    </div>
    `
  
  result.appendChild(ele) 
})
}

  displayData(accountData)

