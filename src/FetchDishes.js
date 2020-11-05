
async function FetchDishes(selectedLocation){
    const menuList = await fetch("/mealplans/"+selectedLocation)
    return menuList;
}

export default FetchDishes;