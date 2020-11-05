class Meal {
    constructor(name,category,price,kcal,carbs,protein,fat,KcalpE,PpE,FpE,CpE,gainfactor){
        this.name = name;
        this.kcal = kcal;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.price = price;
        this.category = category;
        this.KcalpE = KcalpE;
        this.PpE = PpE;
        this.FpE = FpE;
        this.CpE = CpE;
        this.gainfactor = gainfactor;
        this.id = "";
    }
}
class WeekDay {
    constructor(day){
        this.day = day;
        this.dateTime = 0;
        this.mealList = [];
    }
}

function domExtract(dom, weekDayList, daysOfTheWeek){
    //get the current and next working days for the Mensa
    let today = new Date();
    let ttd = today.getDay()
    let ttd1 = ttd.valueOf();
    let workDays = []
    for (let i=0;i<12;i++){
        ttd1 = (ttd+i)%7
        let thisDay = daysOfTheWeek[ttd1]
        //get next days which are not saturdays or sundays
        if((thisDay!="Sonntag")&&(thisDay!="Samstag")){
            //and add "Naechste" to the days after Sat,Sun 
            if(workDays.some((term=>(term=="Freitag")))){
                workDays.push(thisDay+"Naechste");
            } else {
                workDays.push(thisDay);
            }
        }
    }
    //and iterate over them to collect the data
    for (const day of workDays){
        //get the current day menue and prepare data
        let currentDay = dom.window.document.getElementById(day);
        if (currentDay == null){
            continue;
        }
        let weekDay = new WeekDay(day);
        //get the datetime string provided by the mensa
        weekDay.dateTime = currentDay.previousSibling.firstChild.textContent
        let trClass = currentDay.querySelectorAll(".menue-wrapper")
        let regExNutr = RegExp("(\\d+[,]\\d)|(\\d+)","g");
        let mealList = [];
        for(const value of trClass.values()){
            let category;
            let name;
            let price;
            let nutrInfo;
            let matches;
            let nutrList = [];
            //skip empty or otherwise useless entries
            if (value.firstChild.className.includes("extra") || (value.querySelector(".expand-nutr") == null) || value.querySelector(".menue-item.menue-price.large-price") == null){
                continue;
            }
            //get info about the dish
            category = value.querySelector(".menue-item.menue-category").textContent;
            //get name and remove |s, the first +, a few annotations as well as additives - the |s, A1s, ,A1s and the leftover 1s, and finally replace the spaces with commas
            name = value.querySelector(".expand-nutr").textContent.replace(" 0,33 L","").replace(" Preis ohne Pfand","").replace(/(\s)\|(\s)/g,", ").substring(1).replace(" Price without deposit","").
            replace(/,(\d|(\w\d)|[A-Z]|(\d\d))/g,"").replace(/(\d|(\w\d)|[A-Z]|(\d\d)),/g,"").
            replace(/\s(\w|\d)$/g,"").replace(/([a-z])(\s)+([A-Z])/g,"$1, $3")
            price = value.querySelector(".menue-item.menue-price.large-price").textContent.replace(",",".").replace(" €","")
            price.length<=1 && (price = 0);
            price = price/1
            nutrInfo = value.querySelector(".nutr-info").textContent;
            //find the nutritional info via regex
            matches = nutrInfo.matchAll(regExNutr);
            for (const match of  matches){
                nutrList.push(match[0].replace(",","."))
            }

            //calculate the perEuro factor for all nutritional values
            let kcal = 0
            let fat = 0
            let carbs = 0
            let protein = 0
            let KcalpE = 0
            let PpE = 0
            let FpE = 0
            let CpE = 0
            if (nutrList.length > 1){
                //divide by 1 to convert to number. Theres probably a function for that, but Im all out of internet
                kcal = nutrList[1]/1;
                fat = nutrList[2]/1;
                carbs = nutrList[3]/1;
                protein = nutrList[4]/1;
                KcalpE = Math.round(kcal/price);
                PpE = Math.round(protein/price);
                FpE = Math.round(fat/price);
                CpE = Math.round(carbs/price);
            }
            let gainfactor = Math.round((PpE+KcalpE)/2)
            //construct the meal and add it to the mealList of the day
            let meal = new Meal(name,category,price,kcal,carbs,protein,fat,KcalpE,PpE,FpE,CpE,gainfactor)
            //skip this entry if its name is already present
            if(mealList.some((value=>(value.name == meal.name)),meal)){
                continue;
            }
            //add the index for the sortable columns
            meal.id = day+mealList.length.toString();
            mealList.push(meal);
        }
        weekDay.mealList = mealList;
        weekDayList.push(weekDay);
    }
}

module.exports = {domExtract: domExtract}