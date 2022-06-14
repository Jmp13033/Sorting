import BubbleSort from "./algorithms/Bs";

import './App.css';
import Bar from './components/Bar';
import Play from "@material-ui/icons/PlayCircleOutlineRounded"
import Forwards from "@material-ui/icons/SkipNextRounded"
import Backwards from "@material-ui/icons/SkipPreviousRounded"
import RotateLeft  from '@material-ui/icons/RotateLeft';


import React, { Component } from 'react'

export default class App extends Component {
  state ={
array : [],
arraySteps : [],
colorKeys : [],
colorSteps : [],
currentStep : 0,
count : 20,
delay: 100,
algorithm : "Bubble Sort",
timeouts : [],





  };

  Algorithms = {

    "Bubble Sort" : BubbleSort,
  
  }

  componentDidMount() {
  
    this.generateRandomArray();
  }

  GenerateSteps = () => {

    let array =  this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.Algorithms[this.state.algorithm](array, 0, steps, colorSteps);
    this.setState({arraySteps : steps, colorSteps : colorSteps});






  }

  clearColorKeys = () => {

    let blankKey = new Array(this.state.count).fill(0);

    this.setState({
      colorKeys : blankKey,
      colorSteps : [blankKey]

    })


  }

 

  generateRandomnumber = (min,max) => { 

    // random number between min and max ; min and max included
    return Math.floor(Math.random() * (max - min )) + min;


  }
  generateRandomArray = () => { 

    this.clearColorKeys();
    
    const count = this.state.count;
    const tempArray = [];

    for(let i = 0; i < count; i++){
      tempArray.push(this.generateRandomnumber(50,200));

    }


this.setState(
  {array: tempArray,
  arraySteps:[tempArray],
  currentStep: 0


}, () => {

  this.GenerateSteps();


});

};

changeArray = (index,value) => {
  let array = this.state.array;
  array[index] = value;

  this.setState({
    array: array,
    arraySteps: [array],
    currentStep: 0
  }, () => {

    this.GenerateSteps();

  } )
};


start = () => {
let steps = this.state.arraySteps;
let colorSteps = this.state.colorSteps;
let timeouts = [];

let i = 0;

while(i < steps.length - this.state.currentStep) 
{
  let timeout = setTimeout(() => {

    let currentStep = this.state.currentStep;

    this.setState({
      array: steps[currentStep],
      colorKeys: colorSteps[currentStep],
      currentStep: currentStep + 1



    });

    timeouts.push(timeout);




  }, this.state.delay * i);

  i ++;

}

this.setState({timeouts : timeouts});

  




}







  render() {

    let bars = this.state.array.map((value,index) => { 
      return <Bar 
      key={index} 
      index={index}
      length={value}
      changeArray={this.changeArray}
      color={0}/>  // key is used to identify each element in the array



    });

    let play;

    if(this.state.arraySteps.length === this.state.currentStep){
      play = (

        <button className='controller'>

        <RotateLeft/>


        
        </button>
      )


    } else {

      play = (

        <button className='controller' onClick={this.start}> <Play/>
        </button>


      )
    }


  

    
    return (
      <div className="App">

      <h1> Press To Sort   </h1>
    
        <div className='frame'>
          <div className='barsDiv container card'>
          {bars}
          </div>
      
          </div>

        <div className='control-pannel'>


        <button className='controller'> <Backwards/>
        </button>

            <div className='control-buttons' >
            {play}
            </div>

            <button className='controller'> <Forwards/>
            </button>

          
        </div>
          <div className='pannel'>
          </div>
  
      </div>
    )
  

  }
}

