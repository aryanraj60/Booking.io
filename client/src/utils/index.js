import bcrypt from "bcryptjs";

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export { encryptPassword };
