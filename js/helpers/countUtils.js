export function countTimeForReading (textData) {
  const AVERAGE_READ_SPEED = 160;
  const wordsQuantity = textData.split(' ').length;
  return Math.round(wordsQuantity / AVERAGE_READ_SPEED);
}

export const generateUuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
  c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
