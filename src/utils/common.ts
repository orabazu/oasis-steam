export const formatAccount = (str?: string) =>
  str && str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length);
