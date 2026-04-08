const setCurrentPage = (page) => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    return page;
};

export default setCurrentPage;