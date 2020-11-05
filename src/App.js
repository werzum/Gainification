import React, {Component} from 'react';
import HeadCardPpE from "./Components/headerCard.js"
import CustomAppBar from "./Components/appBar.js"
import FetchDishes from "./FetchDishes";
import SortableTable from "./Components/table.js"
import {Grid,Snackbar,CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HttpsRedirect from 'react-https-redirect';

//TODO
//service worker
//Improve created strings since they stink. Preis ohne Pfand and proper names need to be fixed

class App extends Component {
  constructor(props) {
    super(props);
    this.nextDay = this.nextDay.bind(this);
    this.previousDay = this.previousDay.bind(this);
    this.computeTopCards = this.computeTopCards.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    
    this.state = {
      weekDays:[{day:"",dateTime:"",mealList:[
        {name:"",kcal:0,carbs:0,protein:0,fat:0,price:0,category:"",KcalpE:0,PpE:0,FpE:0,CpE:0,gainfactor:0}
      ]}],
      topCards: [{},{},{},{}],
      selectedDay:0,
      selectedLocation:"academica",
      openSnackbar: false,
      darkMode: true
    };
  }

  //call the node server to get the list of dishes
  callAPI(selectedLocation) {
    
    let todaysData = []
    FetchDishes(selectedLocation).then(res=>res.json()).then(res =>{
      if(res.message===404){
        this.setState({openSnackbar:true});
        return;
      }

      for(let i=1;i<res.length;i++){
        let dayData = {dateTime:"",mealList:[]};
        dayData.dateTime = res[i].dateTime;
        dayData.mealList = [];
        for (const entry of res[i].mealList){
          dayData.mealList.push({name : entry.name, kcal : entry.kcal, carbs:entry.carbs,protein:entry.protein,fat:entry.fat,price:entry.price,
            category:entry.category,KcalpE:entry.KcalpE,PpE:entry.PpE,FpE:entry.FpE,CpE:entry.CpE,gainfactor:entry.gainfactor});
        }
        todaysData.push(dayData);
      }
      this.setState({ weekDays: todaysData})
      //and set the topCards
      this.computeTopCards(this.state.selectedDay);
      this.setState({selectedLocation:selectedLocation});
      })
  }

  //compute the prominent top cards
  computeTopCards(selectedDay){
    let cards = this.state.weekDays[selectedDay].mealList;
    let newTopCards = this.state.topCards;
    //for each entry of todays list, check whether it is higher than the rest and belongs to the topcards. Break if found
    for (const entry of cards){
      if(cards.every((value => (value.PpE <= entry.PpE)),entry)){
        newTopCards[0] = entry;
        continue;
    }};
    for (const entry of cards){
      if(cards.every((value => (value.protein <= entry.protein)),entry)){
        newTopCards[1] = entry;
        continue;
    }};
    for (const entry of cards){
      if(cards.every((value => (value.KcalpE <= entry.KcalpE)),entry)){
        newTopCards[2] = entry;
        continue;
    }};
    for (const entry of cards){
      if(cards.every((value => (value.kcal <= entry.kcal)),entry)){
        newTopCards[3] = entry;
        continue;
    }};
    this.setState({topCards:newTopCards});
  }

  //fetch the JSON data when component is mounted
  componentDidMount(){
    this.callAPI(this.state.selectedLocation);
  }

  //pass this to datePicker component to change selectedDay
  nextDay(newSelectedDay){
    if(newSelectedDay<6){
      newSelectedDay++;
    }
    this.setState({selectedDay:newSelectedDay})
    this.computeTopCards(this.state.selectedDay);
  }
  previousDay(newSelectedDay){
    if (newSelectedDay>0) {
      newSelectedDay--;}
    this.setState({selectedDay:newSelectedDay});
    this.computeTopCards(this.state.selectedDay);
  }

  //pass this to the locationPicker component to change the selected day and call the API accordingly
  selectLocation(selectedLocation){
    this.callAPI(selectedLocation)
  }

  toggleDarkMode(){
    let darkMode = this.state.darkMode;
    this.setState({darkMode:!darkMode})
  }

  render(){
    const theme = createMuiTheme({
      palette: {
        type: this.state.darkMode? "dark" : "light"
      }
    });

  window.addEventListener('fetch', function(event) {
    console.log("attempted to fetch stuff")
    event.respondWith(
      caches.open('your-app').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });
    

    return(
      <HttpsRedirect>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <CustomAppBar darkMode={this.state.darkMode} toggleDarkMode={this.toggleDarkMode} selectedDay={this.state.selectedDay} selectedLocation={this.state.selectedLocation} dateTime={this.state.weekDays[this.state.selectedDay].dateTime} nextDay={this.nextDay} previousDay={this.previousDay} selectLocation={this.selectLocation} />
            {/* eslint-disable-next-line react/jsx-no-duplicate-props */}
            <Grid container={true} spacing={2} style={{margin:5}} style={{width:"100%"}} >
              <Grid item={true} xs={12} sm={6} md={3} key={"PpE"} >
                <HeadCardPpE {...this.state.topCards[0]} subheadername={"Most Protein per Euro"} avatar={"P/€"}/>
              </Grid>
              <Grid item={true} xs={12} sm={6} md={3} key={"protein"} >
                <HeadCardPpE {...this.state.topCards[1]} subheadername={"Most Protein"} avatar={"P"}/>
              </Grid>
              <Grid item={true} xs={12} sm={6} md={3} key={"KcalE"} >
                <HeadCardPpE {...this.state.topCards[2]} subheadername={"Most Kcal per Euro"} avatar={"K/€"}/>
              </Grid>
              <Grid item={true} xs={12} sm={6} md={3} key={"kcal"} >
                <HeadCardPpE {...this.state.topCards[3]} subheadername={"Most Kcal"} avatar={"K"}/>
              </Grid>
            </Grid>
            <SortableTable prop={this.state.weekDays[this.state.selectedDay].mealList}/>
            <Snackbar
              message={"No meal plan provided"}
              open={this.state.openSnackbar}
              onClose={() => this.setState({ openSnackbar: false })}
              autoHideDuration={2000}
            />
        </div>
      </ThemeProvider>
      </HttpsRedirect>
    )
  }
}

export default App;
