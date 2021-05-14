const sortArrayDescending = (array, field) => {
    array = array?.sort(function (ele1, ele2) {
        return ele2?.[field] - ele1?.[field];
    });
    return array;
};

const sortArrayAscending = (array, field) => {
    array = array?.sort(function (ele1, ele2) {
        return ele1?.[field] - ele2?.[field];
    });
    return array;
};

export default {
    sortArrayDescending,
    sortArrayAscending
};
