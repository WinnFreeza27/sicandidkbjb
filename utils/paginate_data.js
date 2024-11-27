export const paginateData = (data, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return data.slice(startIndex, endIndex);
};