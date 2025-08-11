export function generateAuthError(message) {
  switch (message) {
    case "INVALID_LOGIN_CREDENTIALS":
      return "Email или пароль введен некоректно";
    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";
    default:
      return "слишком много попыток входа. Попробуйте позднее";
  }
}
