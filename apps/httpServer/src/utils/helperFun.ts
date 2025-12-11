//wrote function to clean the string
export function cleanString(str: string) {
  return str.trim().toLowerCase();
}

// wrote function to clean the json data
export const cleanJson = (str: string) => {
  return str
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};
