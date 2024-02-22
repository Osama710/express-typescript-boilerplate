import { Request, Response } from "express";
import fs from "fs";
import handlebars from "handlebars";
// const SibApiV3Sdk = require("sib-api-v3-sdk");
import moment from "moment";
import path from "path";
const constants = require("../constants");

class HelperFunctions {
  static lowerCaseLetters = "abcdefghjkmnpqrstuvwxyz";
  static upperCaseLetters = "ABCDEFGHJKMNPQRSTUVWXYZ";
  static digits = "123456789";
  static symbols = "!@$%^*()-_+=~`[]{}|:;<>,.?/";

  static getUniqueListBy<T>(arr: T[], key: string): T[] {
    return [...new Map(arr.map((item: any) => [item[key], item])).values()];
  }

  static getUniqueList<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }

  static getUniqueListByKey<T>(arr: T[], key: string): any[] {
    return [...new Set(arr.map((item: any) => item[key]))];
  }

  static validatePathVariable(key: string, value: any): boolean {
    if (value === undefined || value === null || value === "") {
      return false;
    }

    const regexStartsWith = /^:/;
    if (regexStartsWith.test(value)) {
      return false;
    }

    // const regexMustBeDigit = /^\d+$/;
    // if (!regexMustBeDigit.test(value)) {
    //   return false;
    // }
    // return true;

    if (key == "id") {
      const regexMustBeDigit = /^\d+$/;
      if (!regexMustBeDigit.test(value)) {
        // if uuid
        const regexMustBeUuid =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
        if (!regexMustBeUuid.test(value)) {
          return false;
        }
      }
    } else {
      const regexMustBeDigit = /^[\w-]+$/;
      console.log(regexMustBeDigit.test(value));
      if (!regexMustBeDigit.test(value)) {
        return false;
      }
    }
    return true;
  }

  static generateHtmlEmail(templateName: string, data: any): string {
    const template = fs.readFileSync(
      `src/email_templates/${templateName}.html`,
      "utf8"
    );
    const compiledTemplate = handlebars.compile(template);
    const renderedHtml = compiledTemplate(data);
    return renderedHtml;
  }

  static generateRandomPassword(length: number = 8): string {
    let password = "";

    password += HelperFunctions.generateRandomString(
      HelperFunctions.lowerCaseLetters
    );
    password += HelperFunctions.generateRandomString(
      HelperFunctions.upperCaseLetters
    );
    password += HelperFunctions.generateRandomString(HelperFunctions.digits);
    password += HelperFunctions.generateRandomString(HelperFunctions.symbols);

    for (let i = 0; i < length - 4; i++) {
      const allCharacters =
        HelperFunctions.lowerCaseLetters +
        HelperFunctions.upperCaseLetters +
        HelperFunctions.digits +
        HelperFunctions.symbols;
      password += HelperFunctions.generateRandomString(allCharacters);
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return password;
  }

  // async function sendEmail(templateName: string, subject: string, to: string, email_data: any): Promise<void> {
  //   // Set the Sendinblue API key
  //   SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.EMAIL_API_KEY;
  
  //   // Generate the HTML content for the email
  //   const html: string = HelperFunctions.generateHtmlEmail(templateName, email_data);
  
  //   try {
  //     // Send the transactional email
  //     await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
  //       subject: subject,
  //       sender: { email: "admin@admin.com", name: "Admin" },
  //       to: [{ email: to }],
  //       htmlContent: html,
  //     });
  //   } catch (error) {
  //     // Handle any errors
  //     console.error("Error sending email:", error);
  //     throw error; // Optionally re-throw the error to handle it elsewhere
  //   }
  // }

  static isJsonString(string: string): boolean {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  }

  static generateRandomString(charSet: string | undefined, length = 1): string {
    let result = "";
    const characters =
      charSet ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getOrdinalSuffixOfNumber(number: number): string {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) {
      return number + "st";
    }
    if (j === 2 && k !== 12) {
      return number + "nd";
    }
    if (j === 3 && k !== 13) {
      return number + "rd";
    }
    return number + "th";
  }
  static responseWrapper(
    res: Response,
    status: number,
    message: string,
    data: any = {},
    linenumber: Error | null = null,
    explict_count: number | null = null
  ): void {
    // Check if the status code is not 200 or 201
    if (status !== 200 && status !== 201) {
      // Check if linenumber is an instance of Error
      if (linenumber instanceof Error && linenumber.stack) {
        try {
          // Extract the line number from the error stack trace
          const match = linenumber.stack.match(/js:\d+:\d+/g);
          if (match) {
            const lineNumber = parseInt(match[0].split(":")[1]);
            linenumber = new Error(`Line number: ${lineNumber}`);
          } else {
            linenumber = new Error("Line number extraction failed");
          }
        } catch (error) {
          // Set the line number to "0" if extraction fails
          linenumber = new Error("Line number extraction failed");
        }
      } else {
        // Set the line number to "0" if it is undefined or null
        if (linenumber === undefined || linenumber === null) {
          linenumber = new Error("Line number is undefined or null");
        }
      }
    }

    let response: {
      message: string;
      code: number;
      status: boolean;
      messagetype: string;
      data?: any;
      count?: number;
      error?: string;
    } = {
      message: "",
      code: status,
      status: false,
      messagetype: "",
    };

    switch (status) {
      case 200:
      case 201:
        response.data = data;
        // Check if explict_count is null
        explict_count === null
          ? data && Array.isArray(data) && data.length > 0
            ? (response.count = data.length)
            : null
          : (response.count = explict_count);
        response.status = true;
        response.messagetype = constants.TYPE_SUCCESS;
        response.message = message
          ? message
          : constants.DEFAULT_SUCCESS_MESSAGE;

        res.status(status).send(response);
        break;
      case 422:
      case 500:
      case 408:
      case 401:
      case 404:
      case 400:
        response.message = message;
        response.messagetype = constants.TYPE_ERROR;
        response.error = constants.DEFAULT_ERROR_MESSAGE;
        res.status(status).send(response);
        break;
      default:
        response.message = message;
        response.messagetype = constants.TYPE_ERROR;
        response.error = constants.DEFAULT_ERROR_MESSAGE;
        res.status(500).send(response);
        break;
    }
  }

  static toSentenceCase(string: string): string {
    // Split the string into an array of words
    const words = string.split(" ");

    // Iterate over each word in the array
    const convertedWords = words.map((word) => {
      // If the whole word is uppercase
      if (/^[A-Z]+$/.test(word)) {
        // Return the word as is
        return word;
      } else {
        // Capitalize the first letter of the word and return it
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    });

    // Join the converted words back into a string separated by spaces
    const convertedString = convertedWords.join(" ");

    // Return the converted string
    return convertedString;
  }

  //   /**
  //    * Uploads a file.
  //    *
  //    * @param {Request} requestObject - The request object.
  //    * @param {string} fieldNameInRequest - The name of the field in the request.
  //    * @param {string} directoryToSaveFile - The directory to save the file.
  //    * @return {Promise<Request | null>} The modified request object if the file was uploaded successfully, otherwise null.
  //    */
  //   static async uploadFile(
  //     requestObject: Request,
  //     fieldNameInRequest: string,
  //     directoryToSaveFile: string
  //   ): Promise<Request | null> {
  //     try {
  //       // Check if any of the required parameters are missing
  //       if (!requestObject || !fieldNameInRequest || !directoryToSaveFile) {
  //         return null;
  //       }

  //       // Check if the field with the given name exists in the request body
  //       if (fieldNameInRequest in requestObject.body) {
  //         const uploadedFile = requestObject.files[fieldNameInRequest];

  //         // Generate a timestamp and file extension
  //         const timestamp = moment().unix();
  //         const ext = path.extname(uploadedFile.name);

  //         // Generate a random string of characters
  //         const randomCharacters = HelperFunctions.generateRandomString(10);

  //         // Construct the filename using the random characters, timestamp, and file extension
  //         const filename = `${randomCharacters}-${timestamp}${ext}`;

  //         let filePath = null;

  //         try {
  //           // Construct the file path by joining the directory path and filename
  //           filePath = path.join(directoryToSaveFile, filename);

  //           // Write the file to the specified file path
  //           await fs.promises.writeFile(filePath, uploadedFile.data);
  //         } catch (error) {
  //           // If an error occurs, return null
  //           filePath = null;
  //         }

  //         // Update the requestObject's body with the file path
  //         requestObject.body[fieldNameInRequest] = filePath;

  //         // Return the modified requestObject
  //         return requestObject;
  //       } else {
  //         // If the field does not exist in the request body, return null
  //         return null;
  //       }
  //     } catch (error) {
  //       // If an error occurs, return null
  //       return null;
  //     }
  //   },

  /**
   * Converts a string to title case.
   *
   * @param {string} str - The string to be converted.
   * @return {string} The converted string in title case.
   */
  static async toTitleCase(str: string): Promise<string> {
    const words = str.toLowerCase().split(" ");

    // Capitalize the first letter of the first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1);

    // Apply title case logic to the rest of the words
    for (let i = 1; i < words.length; i++) {
      // Check if the word is already capitalized
      if (/^[A-Z]+$/.test(words[i])) {
        continue;
      } else {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
      }
    }

    return words.join(" ");
  }
}

export default HelperFunctions;
