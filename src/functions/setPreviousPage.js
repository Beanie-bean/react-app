const setPreviousPage = (page) => {
    if (page == 1) {
        page = 1;
    }
    else {
        page = page - 1;
    };
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    return page;
};

export default setPreviousPage;