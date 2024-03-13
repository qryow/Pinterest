

export const addDataToLocalStorage = (uid: string, token: string) => {
  localStorage.setItem('uid', JSON.stringify(uid));
  localStorage.setItem('token', JSON.stringify(token));
}

export const isUserLogin = () => {
  const token = localStorage.getItem('token');
  if(!token) return false;
  return true;
}

export const logoutFunc = () => {
  localStorage.removeItem('uid')
  localStorage.removeItem('token')
}


//! Надо типизировать в отдельном интерфейсе
export function getWordForm(number: number, form1: string, form2: string, form5: string) {
  let num = Math.abs(number);
  num %= 100;
  if (num >= 5 && num <= 20) {
      return form5;
  }
  num %= 10;
  if (num === 1) {
      return form1;
  }
  if (num >= 2 && num <= 4) {
      return form2;
  }
  return form5;
}

export function getRandomIndexes(maxIndex: number, count: number): number[] {
  const indexes: number[] = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * maxIndex);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
}