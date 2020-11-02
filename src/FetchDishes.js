
async function FetchDishes(selectedLocation){
    const url = 'http://localhost:3001/';
    const menuList = await fetch(url+selectedLocation)
    return menuList;
}

export default FetchDishes;