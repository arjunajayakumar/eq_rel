import { FirebaseErrorLibraryType } from "../interface/interface";

export const FirebaseErrorLibrary: FirebaseErrorLibraryType[] = [
  { code: "auth/user-not-found", message: "Invalid email or password. Please try again" },
  { code: "auth/wrong-password", message: "Invalid email or password. Please try again" },
  { code: "auth/app-not-authorized", message: "Login failed" },
  { code: "auth/invalid-user-token", message: "Login failed" },
  { code: "auth/invalid-password", message: "The current password is incorrect" },
];

export const VALIDATE_USER_ERRORS = [
  {
    errorMessage: "user already associated with other organization",
    displayMessage:
      "The invite link is no longer active. The invite link is invalid. You’ve already registered under a different organization",
  },
  {
    errorMessage: "invitation already expired",
    displayMessage:
      "The invite link is no longer active. The invite link has expired. Please contact the admin to resend the invitation.",
  },
  {
    errorMessage: "invalid invitation code",
    displayMessage:
      "The invite link is no longer active. The invite link is invalid. Please contact the admin to resend the invitation",
  },
  {
    errorMessage: "invitation already accepted",
    displayMessage: "The invite link is no longer active. The invitation is already accepted",
  },
];

export const PHONE_NMLS_ERROR: string = "phone number or nmls number is missing";
