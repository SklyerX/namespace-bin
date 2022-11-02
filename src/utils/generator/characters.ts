export const generateWords = (amount: number) => {
  let result = '';
  let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let length = characters.length;
  for (let i = 0; i < amount; i++) {
    result += characters.charAt(Math.floor(Math.random() * length));
  }
  return result;
};
