import { UNKNOWN_INPUT, GAMER_ID } from '../../models/Constants';
/**
 * This function will return input type
 * @method validateUserInput
 * @param String input
 * @returns String
 * @example
 *  ///returns VIP_ID
 *  this.validateUserInput(EXA6777);
 *
 *  @example
 *  ///returns UNKNOWN_INPUT
 *  this.validateUserInput(123456789121);
 */
export function validateUserInput(input) {
    if(validateForAlphaNumericInput(input)){
        return GAMER_ID;
    } else {
        return UNKNOWN_INPUT;
    }
}

export function validateForNumericInput (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    let numericRegEx  = /\D/gm;
    if(!(numericRegEx.test(input)) && Number(input) > 0) {
        isValid = true;
    }
    return isValid;
}


export function validateForAlphaInput (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    let alphaRegEx  = /[^a-zA-Z]/i;
    isValid = !(alphaRegEx.test(input));
    return isValid;
}

export function validateForAlphaNumericInput (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    let alphaNumericRegEx  = /[^a-z\d]/i;
    isValid = !(alphaNumericRegEx.test(input));
    return isValid;
}

export function validateForAlphaNumericAndSpaceInput (input) {
    let isValid = false;
    if(input == null || input === ""){return isValid;}
    let alphaNumericRegEx  = /[^a-zA-Z\d ]/i;
    isValid = !(alphaNumericRegEx.test(input));
    return isValid;
}

export function validateDate(input){
    let isValid = false;
    var pattern =/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
    if(pattern.test(input))
    {
         isValid = true;
    }
    return isValid;
}