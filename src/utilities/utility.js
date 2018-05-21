
export const validation = (key, value, rules) => {

    let isValid = true;
    if (value.length > rules.maxLength && isValid)  {
        isValid = false;
    }
    if (value.length < rules.minLength && isValid) {
        isValid = false;
    }
    if (key === "email") {
        if (!value.match(rules.reg) && isValid) {
            isValid = false
        }
    }
    if (key === "postCode") {
        if ( isNaN(+value) && isValid ) {
            isValid = false;
        }
    }
   
    
    return isValid
    
}

export const inputCreator = (switchType, elType, placeHolder, validationRules, value) => {
    
    let formBody = {
         elementType: switchType,
         elementConfig: {
             type: elType,
             placeholder: placeHolder
         },
         value: "",
         validation: {
             isValid: false,
             rules: validationRules,
             touched: false
         }
     }
     if (!validationRules) {
         formBody.validation.isValid = true;
     }
     if (placeHolder === "Fastest") {
         formBody.value = placeHolder
    }
    if (value) {
        formBody.value = value;
        formBody.validation.isValid = true;
        formBody.validation.touched = true;
    }
     return formBody
 }


