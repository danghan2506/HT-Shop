
// Add, remove and retrieve a product from local storage
const addFavToLocalStorage = (product) => {
    const favourites = getFavFromLocalStorage();
    if(!favourites.some((item) => item._id === product._id)){
        favourites.push(product)
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }
}
const removeFavFromLocalStorage = (productId) => {
    const favourites = getFavFromLocalStorage();
    const updateFavourites = favourites.filter((product) => product._id !== productId)
    localStorage.setItem("favourites", JSON.stringify(updateFavourites))
}
const getFavFromLocalStorage = () => {
    const favouritesJSON = localStorage.getItem("favourites")
    return favouritesJSON ? JSON.parse(favouritesJSON) : []
}
export {addFavToLocalStorage, removeFavFromLocalStorage, getFavFromLocalStorage}