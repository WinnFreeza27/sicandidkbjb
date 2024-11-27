/**
 * Deep search function that searches for a query across all fields of data.
 * @param {Array|Object} data - The dataset (array of objects or a single object) to search through.
 * @param {string} query - The search query.
 * @param {Object} [options] - Configuration options for the search.
 * @param {boolean} [options.caseSensitive=false] - Whether the search should be case-sensitive.
 * @param {Array} [options.includeFields=[]] - List of specific fields to search (empty = search all fields).
 * @param {Array} [options.excludeFields=[]] - List of fields to exclude from the search.
 * @returns {Array|Object} - Filtered data containing matches.
 */
export const deepSearch = (data, query, options = {}) => {
    const {
      caseSensitive = false,
      includeFields = [],
      excludeFields = [],
    } = options;
  
    // Normalize the query
    const normalizedQuery = caseSensitive ? query : query.toLowerCase();
  
    /**
     * Recursively searches an object for the query.
     * @param {Object} obj - The object to search through.
     * @returns {boolean} - True if the query is found, false otherwise.
     */
    const matches = (obj) => {
      for (const key in obj) {
        // Skip excluded fields
        if (excludeFields.includes(key)) continue;
  
        // If includeFields is set, skip fields not in the list
        if (includeFields.length > 0 && !includeFields.includes(key)) continue;
  
        const value = obj[key];
  
        if (typeof value === 'string' || typeof value === 'number') {
          // Normalize the value for comparison
          const normalizedValue = caseSensitive ? String(value) : String(value).toLowerCase();
  
          // Check if the query matches the value
          if (normalizedValue.includes(normalizedQuery)) {
            return true;
          }
        } else if (typeof value === 'object' && value !== null) {
          // Recursively search nested objects or arrays
          if (matches(value)) return true;
        }
      }
      return false;
    };
  
    // If data is an array, filter the array
    if (Array.isArray(data)) {
      return data.filter((item) => matches(item));
    }
  
    // If data is a single object, check if it matches
    if (typeof data === 'object' && data !== null) {
      return matches(data) ? data : null;
    }
  
    // If data is neither an array nor an object, return an empty array
    return [];
  };
  