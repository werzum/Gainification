
async function FetchDishes(){
    const url = 'http://localhost:3001';
    const menuList = await fetch(url+"/gerichte")
    return menuList;
}

export default FetchDishes;