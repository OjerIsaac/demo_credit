/**
 * a  library to generate error messages
 * takes in an object generate error messages from the values of the object
 * example
 * let error = generateErrorMessage({
 *    fullname: "fullname is required ",
 * email :"email seems invalid",
 * password :"password must be at lease 6 characters"
 * })
 *
 * console.log(error) //
 * fullname is required, email seems invalid and password must be at least 6 characters
 */
export function generateErrorMessage(error: any): string {
    let errorMessage = Object.values(error)
      .filter(Boolean)
      .join(", ")
      .replace(/,(?=[^,]*$)/, " and");
    return errorMessage;
  }
  