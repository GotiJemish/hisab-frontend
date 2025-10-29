export const validateRequired = (value, fieldName = "Field") => {
  if (value === undefined || value === null || value.toString().trim() === "") {
    return `${fieldName} is required.`;
  }
  return null;
};
export const validateEmail = (email) => {
  const requiredError = validateRequired(email, "Email");
  if (requiredError) return requiredError;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
};

export const validatePassword = (password) => {
  const requiredError = validateRequired(password, "Password");
  if (requiredError) return requiredError;
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
};