export function cleanString(str:string){
    return str.trim().toLowerCase()
}

export  const cleanJson = (str:string) => {
  return str
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};