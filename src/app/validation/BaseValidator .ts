import config from "../../resources/config";
import credWorthy from "../db/entity/library";

const niv = require("node-input-validator");
// example
// niv.extend('uniqueUserEmail', async ({ value, args }) => {
//   // default field is email in this example
//   const filed = args[1] || 'email'

//   let condition = {}

//   condition[filed] = value
//     let result = await credWorthy.User.findOne({ where: condition})
//   // email already exists
//   if (result) {
//     return false
//   }

//   return true
// })

/**
 * check if user email already exist in db
 */
// eslint-disable-next-line space-before-function-paren
niv.extend("uniqueUserEmail", async ({ value, args }) => {
  // default field is email in this example
  // const filed = args[1] || 'email'

  const condition = { email: value };

  const result = await credWorthy.User.findOne({
    attributes: ["id", "isExisting"],
    where: condition,
  });
  // email already exists
  if (result) {
    if (result.isExisting === false) {
      return true;
    }
    return false;
  }

  return true;
});

/**
 * check if user verfication token already exist in db
 */
// eslint-disable-next-line space-before-function-paren
niv.extend("verifyUserToken", async ({ value, args }) => {
  // default field is email in this example
  const condition = { verificationToken: value };
  const result = await credWorthy.User.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("verifySecondaryEmailToken", async ({ value, args }) => {
  // default field is email in this example
  const condition = { secondaryEmailToken: value };
  const result = await credWorthy.User.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("forgotPasswordTokenExists", async ({ value, args }) => {
  console.log(value);
  const condition = { forgotPasswordToken: value };
  const result = await credWorthy.User.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

/**
 * check if loan id exist in db or not
 */
// eslint-disable-next-line space-before-function-paren
niv.extend("loanExists", async ({ value, args }) => {
  // default field is email in this example
  const condition = { id: value };
  const result = await credWorthy.Loan.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

/**
 * check if loan id exist in db and current user is lender or not
 */
// eslint-disable-next-line space-before-function-paren
niv.extend("loanExistsAsLender", async ({ value, args }) => {
  const condition = {};
  if (!args[0] || !args[1]) {
    return false;
  }
  condition["id"] = value;
  condition[args[0]] = args[1];
  const result = await credWorthy.Loan.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

/**
 * check if user id exist in db or not
 */
// eslint-disable-next-line space-before-function-paren
niv.extend("userExists", async ({ value, args }) => {
  const condition = { id: value };

  const result = await credWorthy.User.findOne({
    attributes: ["id"],
    where: condition,
  });
  // email already exists
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("adminUserExists", async ({ value, args }) => {
  const condition = { id: value };

  const result = await credWorthy.AdminUser.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }

  return true;
});

/**
 * check if loan token exist in db or not
 */
// eslint-disable-next-line space-before-function-paren
niv.extend("verifyLoanToken", async ({ value, args }) => {
  const condition = { shareToken: value };
  const result = await credWorthy.Loan.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

// eslint-disable-next-line space-before-function-paren
niv.extend("verifyUserAccount", async ({ value, args }) => {
  const condition = {};
  if (!args[0] || !args[1]) {
    return false;
  }
  condition["id"] = value;
  condition[args[0]] = args[1];
  const result = await credWorthy.UserAccountDetail.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("verifyLenderAccount", async ({ value, args }) => {
  const condition = {};
  if (!args[0] || !args[1]) {
    return false;
  }
  condition["id"] = value;
  condition[args[0]] = args[1];
  const result = await credWorthy.UserAccountDetail.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

// eslint-disable-next-line space-before-function-paren
niv.extend("userCardExists", async ({ value, args }) => {
  const condition = {};
  if (!args[0] || !args[1]) {
    return false;
  }
  condition["id"] = value;
  condition[args[0]] = args[1];
  const result = await credWorthy.UserCard.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("userCardOwner", async ({ value, args }) => {
  const condition = {};
  if (!args[0] || !args[1]) {
    return false;
  }
  condition["cardId"] = value;
  condition[args[0]] = args[1];
  const result = await credWorthy.UserCard.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("userSubscriptionExists", async ({ value, args }) => {
  const condition = {};
  if (!args[0] || !args[1]) {
    return false;
  }
  condition["paymentId"] = value;
  const result = await credWorthy.UserSubscriptionReceipt.findOne({
    attributes: ["id"],
    where: condition,
    raw: true,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("emailExists", async ({ value, args }) => {
  const condition = { email: value };
  const user = await credWorthy.User.findOne({
    attributes: ["id"],
    where: condition,
    raw: true,
  });
  return !!(user && user["id"]);
});

niv.extend("emailAdminExists", async ({ value, args }) => {
  const condition = { email: value };
  const user = await credWorthy.AdminUser.findOne({
    attributes: ["id"],
    where: condition,
    raw: true,
  });
  return !!(user && user["id"]);
});

niv.extend("newsLetterExists", async ({ value, args }) => {
  const allowed = config.email_preferences;
  const notAllowed = value.filter((d: string) => {
    return allowed.indexOf(d) == -1;
  });
  if (notAllowed.length) {
    return false;
  }
  return true;
});

niv.extend("repaymentReminderExists", async ({ value, args }) => {
  const allowed = config.email_preferences_repayment_reminder;
  const notAllowed = value.filter((d: string) => {
    return allowed.indexOf(d.toString()) === -1;
  });
  if (notAllowed.length) {
    return false;
  }
  return true;
});

niv.extend("verifyLoanCode", async ({ value, args }) => {
  const condition = { code: value };
  const result = await credWorthy.Loan.findOne({ where: condition });
  if (!result) {
    return false;
  }

  return true;
});

niv.extend("verifyTPPToken", async ({ value, args }) => {
  const condition = { token: value, isDeleted: false };
  const result = await credWorthy.ThirdPartyToken.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }

  return true;
});

niv.extend("matchUserId", async ({ value, args }) => {
  if (!args[0]) {
    return false;
  }
  if (parseInt(value) === parseInt(args[0])) {
    return true;
  }
  return false;
});
niv.extend("userIdExists", async ({ value, args }) => {
  const condition = { id: value };
  const result = await credWorthy.User.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("adminUserAlreadyExists", async ({ value, args }) => {
  const condition = { email: value };
  const result = await credWorthy.AdminUser.count({ where: condition });
  if (result > 0) {
    return false;
  }
  return true;
});

niv.extend("roleExists", async ({ value, args }) => {
  // default field is email in this example
  const condition = { id: value };
  const result = await credWorthy.AdminRole.findOne({
    attributes: ["id"],
    where: condition,
  });
  if (!result) {
    return false;
  }
  return true;
});

niv.extend("isUserLess", async ({ value, args }) => {
  // default field is email in this example
  const condition = { roleId: value, isDeleted: false };
  const result = await credWorthy.AdminUser.count({ where: condition });
  if (result > 0) {
    return false;
  }
  return true;
});

niv.extendMessages(
  {
    uniqueUserEmail:
      "This email address is already associated with an account. Please sign in or use another email address.",
    userExists: "The :attribute does not exists",
    loanExists: "The :attribute does not exists",
    verifyUserToken: "The :attribute does not exists",
    verifySecondaryEmailToken: ":attribute does not exist",
    verifyLenderAccount:
      "The :attribute does not exists or donot belong to you",
    userCardExists: "The :attribute does not exists",
    emailExists: "The :attribute does not exist",
    forgotPasswordTokenExists:
      "The :attribute is either incorrect or is expired",
    newsLetterExists: "The :attribute is not having allowed values",
    repaymentReminder: "The :attribute is not having allowed values",
    verifyLoanCode: `Loan detail doesn't match`,
    verifyTPPToken:
      ":attribute is expired or is incorrect. Kindly initiate the process again.",
    verifyLoanToken: "The :attribute is either deleted or does not exist.",
    matchUserId:
      "The :attribute does not have permission to access the resource.",
    userSubscriptionExists:
      "The :attribute is either deleted or does not exist.",
    verifyUserAccount: "You do not have permission to access the resource.",
    roleExists: "The :attribute does not exist",
    isUserLess:
      "Since there are users attached to the role. You cannot delete it.",
    adminUserAlreadyExists: "User with this :attribute already exists.",
    adminUserExists: "The user :attribute does not exist.",
  },
  "en"
);
niv.addCustomMessages({
  "personalMessage.maxLength":
    "The personal message cannot be greater than 255 characters.",
});
export default niv;
