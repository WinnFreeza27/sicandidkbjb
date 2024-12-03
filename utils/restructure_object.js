export const restructureObjectList = (data, targetKey, keysToNest) => {
    if (!Array.isArray(data) || data.length === 0) return []; // Handle invalid or empty data
  
    return data.map(item => {
      // Create a shallow copy to avoid mutating the original object
      const newItem = { ...item };
  
      // Initialize target key if not present
      newItem[targetKey] = newItem[targetKey] || {};
  
      // Move specified keys to the target key
      keysToNest.forEach(key => {
        if (item[key] !== undefined) {
          newItem[targetKey][key] = item[key];
          delete newItem[key]; // Remove key from the top level
        }
      });
  
      return newItem;
    });
  }
  