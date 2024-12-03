export const filterObjectList = (data, keysToKeep) => {
    return data.map(item => {
      let filtered = {};
      keysToKeep.forEach(key => {
        if (item[key]) {
          filtered[key] = item[key];
        }
      });
      return filtered;
    });
  }
  