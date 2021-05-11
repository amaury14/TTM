const sortArray = (array, field) => {
    array = array?.sort(function (ele1, ele2) {
        return ele1?.[field] - ele2?.[field];
    });
    return array;
};

export default {
    sortArray
};
