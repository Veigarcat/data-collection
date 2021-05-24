export const objectArrMapping = (arr1 = [], arr2 = []) => {
  const concatArray = [...arr1, ...arr2];
  const mappingArray = concatArray.reduce((acc, cur) => {
    const isAccExists = acc.some((item) => item.id === cur.id);
    const elementExists = concatArray.filter(
      (item) => !isAccExists && item.id === cur.id,
    );
    if (elementExists.length) {
      const elementExistsConvert = elementExists.reduce((eleAcc, elCur) => ({
        ...eleAcc,
        ...elCur,
        ...cur,
      }));
      return [...acc, elementExistsConvert];
    }
    return acc;
  }, []);
  return mappingArray;
};
