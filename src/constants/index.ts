export const TYPEERROR: string = "error";
export const TYPEFAILURE: string = "failure";
export const TYPESUCCESS: string = "success";

export const REQUIREDFIELDSMESSAGE: string = "Required fields are missing";

export const INVALIDPOSTEDVALUES: string = "Invalid values posted";

export const USERNAMEMINLENGTH: string = "6";
export const USERNAMEMAXLENGTH: string = "12";
export const USERNAMEREGEX: RegExp = /^(?=.{6,12})([a-zA-Z0-9@#_-])+$/i;
export const USERNAMEMESSAGE: string =
  "Username can only be a combination of lowercase alphabets, uppercase alphabets, digits, and symbols (@, #, -, _)";

export const PASSWORDMINLENGTH: number = 6;
export const PASSWORDMAXLENGTH: number = 50;
export const PASSWORDREGEX: RegExp =
  /^.*(?=.{6,50})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).*$/;
export const PASSWORDMESSAGE: string =
  "Password must be a combination of lowercase alphabets, uppercase alphabets, digits, and symbols";
