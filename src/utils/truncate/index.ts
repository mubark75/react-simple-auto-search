export const truncate = (text: string, length = 100, ending = "...") => {
  if (text.length > length) {
    return text.substring(0, length - ending.length) + ending;
  } else {
    return text;
  }
};
