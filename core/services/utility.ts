declare var $: any;
declare function escape(s: string): string;

export class UtilityComponent {
  // This function used to validate email
  public static validateEmail(email: string) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // This function used to verify password is as per rule or not
  public static validPasswordRule(password: string, repeatPassword: string) {
    if (!password || !repeatPassword) return false;

    let MinLength = 6;
    let MaxLength = 15;

    let meetsLengthRequirements: boolean =
      password.length >= MinLength && repeatPassword.length <= MaxLength;
    let hasUpperCaseLetter: boolean = false;
    let hasLowerCaseLetter: boolean = false;
    let hasDecimalDigit: boolean = false;

    if (meetsLengthRequirements) {
      for (let i = 0, len = password.length; i < len; i++) {
        let char = password.charAt(i);
        if (!isNaN(+char * 1)) {
          hasDecimalDigit = true;
        } else {
          if (this.isStringOnly(char) && char == char.toUpperCase()) {
            hasUpperCaseLetter = true;
          }
          if (this.isStringOnly(char) && char == char.toLowerCase()) {
            hasLowerCaseLetter = true;
          }
        }
      }
    }

    let isValid =
      meetsLengthRequirements &&
      hasUpperCaseLetter &&
      hasLowerCaseLetter &&
      hasDecimalDigit;
    return isValid;
  }

  // This function used to validate image extension and size
  public static validateImageExtension(fileName: string, osize: number) {
    let size;
    let validExtension = ["png", "jpeg", "jpg", "gif"];
    let extension = fileName.substr(fileName.lastIndexOf(".") + 1);
    size = osize / 1048; // KB
    size = size / 1048; // MB
    if (validExtension.indexOf(extension.toLowerCase()) == -1) {
      return false;
    } else if (size > 2) {
      return false;
    } else {
      return true;
    }
  }

  // This function validate number only
  public static isNumberOnly(str: string) {
    let regexStr = "^[0-9]*$";
    let regEx = new RegExp(regexStr);
    return regEx.test(str);
  }

  // This function validate number only
  public static isDecimalNumberOnly(str: string) {
    //let regexStr = /[^0-9\.]/g
    //let regexStr = /^[0-9.,]+$/
    let regexStr = /^[1-9]\d*(?:\.\d{0,2})?$/;
    let regEx = new RegExp(regexStr);
    return regEx.test(str);
  }

  // This function used to validate string only
  public static isStringOnly(str: string) {
    let regexPattern = /^[A-Za-z _]+$/;
    return regexPattern.test(str);
  }

  // This function used to validate percentage
  public static validatePercentage(str: string) {
    let regexPattern = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i;
    return regexPattern.test(str);
  }

  // This function used to validate money
  public static validateMoney(str: string) {
    let regexPattern = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    return regexPattern.test(str);
  }

  public static validateNumber(e: any, isMobile?: boolean) {
    let regexStr = "^[0-9]*$";
    let keyCode = [8, 9, 27, 13, 46, 190];
    if (isMobile) keyCode.push(32, 40, 41, 43, 45, 90);

    //console.log(e.keyCode);
    if (
      keyCode.indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true)
      // Allow: home, end, left, right
      //|| (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    let ch = String.fromCharCode(e.keyCode);
    let regEx = new RegExp(regexStr);
    if (regEx.test(ch)) return;
    else e.preventDefault();
  }

  public static validatePhoneNumber(str: string) {
    let regexPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    //var regexPattern = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{10}))/g;
    //var regexPattern = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;

    return regexPattern.test(str);
  }

  public static hasWhiteSpace(str: string) {
    return /\s/g.test(str);
  }

  // This function return current UTC date time.
  public static getUTCDate(date?: Date): Date {
    if (!date) date = new Date();
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  }

  // Get currentdate Timestamp
  public static getTimeStamp() {
    let curTime = this.getUTCDate();
    return (
      curTime.getFullYear().toString() +
      (curTime.getMonth() + 1).toString() +
      curTime.getDate().toString() +
      curTime.getHours().toString() +
      curTime.getMinutes().toString() +
      curTime.getSeconds().toString()
    );
  }

  // This function return local Date Time
  public static convertUTCDateToLocalDate(date?: Date) {
    date = new Date(date);
    let offset = date.getTimezoneOffset();
    let newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() - offset,
      date.getUTCSeconds()
    );
    return newDate;
  }

  // This function return current date.
  public static getLocalDate(date?: Date): Date {
    if (!date) date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // This function convert Local Date to UTC Date
  public static getUTCDateFromLocalDate(date?: Date): Date {
    if (!date) date = new Date();
    let utcDate = date.toUTCString();
    return new Date(utcDate);
  }

  // This function convert JSON to CSV
  public static JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    let arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

    let CSV = "";
    //Set Report title in first row or line

    CSV += ReportTitle + "\r\n\n";

    //This condition will generate the Label/Header
    if (ShowLabel) {
      let row = "";

      //This loop will extract the label from 1st index of on array
      for (let index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (let i = 0; i < arrData.length; i++) {
      let row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    let fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    let uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    let link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    //link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public static getTimeFromMiliSeconds(date1: Date, date2: Date) {
    let yr, mt, d, h, m, s, ms;
    ms = Math.floor(date1.getTime() - date2.getTime());
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = Math.round(s % 60);
    h = Math.floor(m / 60);
    m = Math.round(m % 60);
    d = Math.floor(h / 24);
    h = Math.round(h % 24);
    mt = Math.floor(d / 30.416);
    d = Math.round(d % 30.416);
    yr = Math.floor(mt / 12);
    mt = Math.round(mt % 12);

    return (
      (yr ? yr + (yr > 1 ? " years " : " year ") : "") +
      (mt ? mt + (mt > 1 ? " months " : " month ") : "") +
      (d ? d + (d > 1 ? " days " : " days ") : "") +
      (h ? h + (h > 1 ? " hours " : " hour ") : "") +
      (m ? m + (m > 1 ? " minutes " : " minute ") : "") +
      (s ? s + (s > 1 ? " seconds" : " second ") : "")
    );
  }

  public static getFormatedSize(size: number) {
    let suffixes: string[] = [
      "B",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB"
    ];
    let s = 0;
    while (size >= 1024) {
      s++;
      size /= 1024;
    }

    return size.toFixed(2) + " " + suffixes[s];
  }

  public static getMonthDayWithSuffix(i: number) {
    let j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  public static daysDiffirence(startDate?: Date, endDate?: Date) {
    let timeDiff = endDate.getTime() - startDate.getTime();
    let DaysDiff = timeDiff / (1000 * 3600 * 24);
    return Math.floor(DaysDiff);
  }

  public static getDateUsingDays(date?: Date, days?): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public static escapeSpecialChar(str: string) {
    str = str.replace(/[^a-zA-Z0-9@. ]/g, "").replace(/^\s+|\s+$/g, "");
    return str ? str : undefined;
  }

  // Convert Base64 to blob
  public static Base64toBlob(
    b64Data: string,
    contentType: string,
    sliceSize?: number
  ) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  public static GetRandom() {
    return Math.random();
  }

  public static GetSeoUrl(str: string) {
    return str
      .toString() // Convert to string
      .normalize("NFD") // Change diacritics
      .replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
      .replace(/\s+/g, "-") // Change whitespace to dashes
      .toLowerCase() // Change to lowercase
      .replace(/&/g, "-and-") // Replace ampersand
      .replace(/[^a-z0-9\-]/g, "") // Remove anything that is not a letter, number or dash
      .replace(/-+/g, "-") // Remove duplicate dashes
      .replace(/^-*/, "") // Remove starting dashes
      .replace(/-*$/, ""); // Remove trailing dashes
  }
}
