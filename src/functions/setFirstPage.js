const setFirstPage = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    return 1;
};

export default setFirstPage;