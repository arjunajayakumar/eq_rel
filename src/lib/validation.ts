// Regex validations
export const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// Validations using newRegex()
export const _UppercaseRegex = new RegExp("(?=.*[A-Z])");
export const _LowercaseRegex = new RegExp("(?=.*[a-z])");
export const _NumberRegex = new RegExp("(?=.*[0-9])");
export const _SpecialCharRegex = new RegExp("(?=.*[!@#$%^&*])");
export const _MinimumLengthRegex = new RegExp("(?=.{8,})");
