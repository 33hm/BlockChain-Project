const strength=document.getElementById('strength');
const password=document.getElementById('password-input');
const reasons=document.getElementById('reasons');

password.addEventListener('input',updateStrength)
updateStrength()

function updateStrength(){
    const weaknesses=calculatePasswordStrength(password.value)
    console.log(weaknesses);

    let strengthVal=100;
    reasons.innerHTML=''
    weaknesses.forEach(weakness=>{
        if(weakness==null) return
        strengthVal-=weakness.deduction;
        const messageElement=document.createElement('div');
        messageElement.innerText=weakness.message;
        reasons.appendChild(messageElement);
    })
    strength.style.setProperty('--strength',strengthVal);
}

function calculatePasswordStrength(password){
    const weaknesses=[]
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(upperCaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharacterWeakness(password))
    weaknesses.push(repeatCharactersWeakness(password))

    return weaknesses
}

function lengthWeakness(password){
    const length=password.length

    if(length<=5){
        return {
            message:"Your Password is short",
            deduction: 40
        }
    }

    if(length<=10){
        return {
            message:"Your Password can be large",
            deduction: 15
        }
    }
}

function upperCaseWeakness(password){
    return characterTypeWeakness(password,/[A-Z]/g,'uppercase characters');
}

function lowerCaseWeakness(password){
    return characterTypeWeakness(password,/[a-z]/g,'lowercase characters');
}

function numberWeakness(password){
    return characterTypeWeakness(password,/[0-9]/g,'numbers');
}

function specialCharacterWeakness(password){
    return characterTypeWeakness(password,/[^0-9A-Za-z\s]/g,'special characters');
}


function characterTypeWeakness(password,regex,type){
    const matches=password.match(regex) || []

    if(matches.length===0){
        return{
            message: `Your password has no ${type}`,
            deduction:20
        }
    }

    if(matches.length<=2){
        return{
            message: `Your password could use more ${type}`,
            deduction:5
        }
    }
}

function repeatCharactersWeakness(password){
    const matches=password.match(/(.)\1/g) || []
    // just check if any character is repeating more than 1
    if(matches.length>0){
        return{
            message:'Your password has repeat characters',
            deduction:matches.length*10
        }
    }
}