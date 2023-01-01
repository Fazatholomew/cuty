export const isUrl = (input: any) => {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(input);
}

export const generateSlug = (length = 8) => {
  // Declare all characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-_abcdefghijklmnopqrstuvwxyz0123456789';

  // Pick characers randomly
  let str = '';
  for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;

};