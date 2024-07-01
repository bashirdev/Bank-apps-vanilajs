let data=[
 
    {id:1,age:23, name:"Bashir",accountNo:1111, total:500,recive:0, transectionid:""},
    
    {id:2,age:65, name:"Shikha",accountNo:2222, total:800,recive:0,transectionid:""},
    
    {id:3,age:50, name:"Nasir",accountNo:3333, total:1500,recive:0,transectionid:""}
    
    ]
    
      
     const fromSend=document.querySelector("#fromsnd")  
       
     const toSend=document.querySelector("#tosnd")  
       
    const sendBtn=document.querySelector("#sendBtn")
    
    const tsAmt=document.querySelector("#amt")
    
    //otp area
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
    
       
       //SEND BUTTIN CLICK   
     sendBtn.addEventListener("click", mainFn)
    
    function mainFn(){
       // clearInterval(timerId)
        const findAc=data.find(ac=> ac.accountNo)
     
     if(fromsnd.value && toSend.value && tsAmt.value !== "" ){
     if(Number(fromSend.value) || Number(toSend.value) === findAc.accountNo){
         otpBox.style.display="block";
    resendOtpBtn.style.display="none"; 
     
     otpC=Math.floor(Math.random()*90000)+99999;
    otpCode.innerHTML=otpC;
  
     timerId=setInterval(otpExpaire,1000)
     leftTime=15;
     if(leftTime == -1){
        clearInterval(timerId)
        
        resendOtpBtn.style.display="block";
        }else{
          
       otpStatus.innerHTML=`otp will be expaire in : ${leftTime} `
            leftTime--;
        }
     }else {
         alert("Acount not match")
     }
     
     }
    }
    
    
     
    // verify otp button click
   verifyOtpBtn.addEventListener("click", verifyOtp)
      
    function verifyOtp(){
    
if(leftTime <=0){
    return alert('This OTP has been expaired')
}
     if(Number(otpC) === Number(otpI.value)){
        
             checkUserDetails(data) 
             fromSend.value=null;
           toSend.value=null;
           tsAmt.value=null;
             alert ("Successed 💪")
            otpI.value=null;
            otpBox.style.display="none";
            
             
            
        }else {
            return alert("OTP did not match")
        }
      
   
       
     }
      //OTP EXPAIRE
      function otpExpaire(){
       
         if(leftTime == -1){
         clearInterval(timerId)
         //resetOtp()
         //sendBtn.diaabled="disabled"
         resendOtpBtn.style.display="block"
         }else{
       otpStatus.innerHTML=`otp will be expaire in : ${leftTime} `
             leftTime--;
         }    
          
      }
      // RESET OTP BUTTON
     resendOtpBtn.addEventListener("click",()=>{
        timerId=setInterval(otpExpaire,1000)
        otpC=Math.floor(Math.random()*90000)+99999;
        otpCode.innerHTML=otpC;
    leftTime=15;
      if(leftTime == -1){
         clearInterval(timerId)
         
         resendOtpBtn.style.display="block";
         }else{
        otpStatus.innerHTML=`otp will be expaire in : ${leftTime} `
             leftTime--;
         }
         
      
            
             
         })
     
     
     // Do not touch here
      
       
    function checkUserDetails(arr){
        sender=fromSend.value;
        reciver=toSend.value;
     let rmoney=Number(tsAmt.value);""
    
    let finfo=arr?.find(ele=>Number(ele.accountNo) === Number(sender))
    
     let tinfo=arr?.find(ele=>Number(ele.accountNo) === Number(reciver))
    
    if(!finfo){
        return alert("Not found")
    }
    
    
    if(Number(finfo.accountNo) !== Number(sender)) {
        return alert("Account not found")
        }
        
      if(Number(tinfo.accountNo) !== Number(reciver)) {
            return alert("Reciver Account not found")
        }
     
     
     
    let fmoney;
        
    let transfer=arr.map(item=>{
        if(item.accountNo === finfo.accountNo){
        fmoney=Number(finfo.total) - Number(rmoney);
        
        
         
        return {
           ...item, total:fmoney, recive:rmoney
        }
        
           
        }else{
            return item;
        }
        
    })
    
    console.log(transfer.map((item,ind)=> item.total))
    
    data =transfer
    transAddDetails(data)
   displayUserAccount(data)
      
          
      } 
     
     
    // transfer
    
    
        function transAddDetails(arr){
        sender=fromSend.value;
        reciver=toSend.value;
     let rmoney=Number(tsAmt.value);
    
    let finfo=arr?.find(ele=>Number(ele.accountNo) === Number(sender))
    
     let tinfo=arr?.find(ele=>Number(ele.accountNo) === Number(reciver))
    
    if(!finfo){
        return alert("Not found")
    }
    
    
    if(Number(finfo.accountNo) !== Number(sender)) {
        return alert("Account not found")
        }
        
      if(Number(tinfo.accountNo) !== Number(reciver)) {
            return alert("Reciver Account not found")
        }
     
     
     
    let fmoney;
        
    let transfer=arr.map(item=>{
        if(item.accountNo === tinfo.accountNo){
        fmoney=Number(tinfo.total) + Number(rmoney);
        
        
         
        return {
           ...item, total:fmoney, recive:rmoney
        }
        
           
        }else{
            return item;
        }
        
    })
    
    console.log(transfer.map((item,ind)=> item.total))
    
    data =transfer
   displayUserAccount(transfer)
      
          
      } 
     
     
     
     
     
     
     
      
     function displayUserAccount(arr){
     result.innerHTML=""
         
         arr?.map(ele=>{
         const ul=document.createElement("ul")
       ul.innerHTML=`<li>Name: ${ele.name}</li>
       <li>Age: ${ele.age}</li>
       <li>Account No: ${ele.accountNo}</li>  
         <li>Balance: ${Number(ele.total)}</li> 
         <li>${ele.transectionid !== "" ?  ele.transectionid : "No trasection " }</li>
         
           ` 
       
       result.appendChild(ul)    
           
           
         })
         
         
     }
      
     
     displayUserAccount(data)