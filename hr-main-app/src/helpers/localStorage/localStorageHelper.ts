export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};

export const saveState = (key: string, state: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.warn(error);
  }
};
