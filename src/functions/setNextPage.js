const setNextPage = (page, totalPages) => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    if (page + 1 > totalPages) {
        return page;
    }
    else {
        return page + 1;
    }
};

export default setNextPage;