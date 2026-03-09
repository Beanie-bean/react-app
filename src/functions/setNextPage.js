const setNextPage = (page) => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    return page + 1;
};

export default setNextPage;