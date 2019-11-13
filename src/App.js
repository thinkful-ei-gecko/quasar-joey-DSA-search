import React from 'react';

class App extends React.Component{
  state ={
    inputValue: '',
    linearResult: 1,
    binaryResult: 1,
  }

  
  

  linearSearch =(arr , value = this.state.inputValue) =>{
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
          this.setState({linearResult: i+1 })
            return i+1;
        }
    }
    this.setState({linearResult: 'not found'})
    return -1;
};





  binarySearch = (array , value = this.state.inputValue, start, end, counter = 1)=> {
    let sortArr = array.sort();
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? sortArr.length : end;

    if (start > end) {
      this.setState({binaryResult: 'not found'})
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = sortArr[index];

    console.log(start, end);
    if (item == value) {
      this.setState({binaryResult: counter})
        return counter;
        

    }
    else if (item < value) {
        return this.binarySearch(sortArr, value, index + 1, end, counter + 1);
    }
    else if (item > value) {
        return this.binarySearch(sortArr, value, start, index - 1, counter + 1);
    }
  }
  setNumber = (e) =>{
    this.setState({inputValue: e})
  }
  render(){
    const array = [89, 30, 25, 32, 72, 
      70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40,
       48, 32, 26, 2 ,14 ,33, 45, 72, 56, 44, 21, 88
    ]
     // 27, 68, 15, 62, 93, 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <input type="number" onChange={e => this.setNumber(e.target.value)}>

      </input>
      {/* <button onClick={this.binarySearch(array, this.state.inputValue)}>Binary</button> */}
      <button onClick={this.linearSearch(array, this.state.inputValue)}>Linear</button>
      <p>Linear:{this.state.linearResult}</p>
      <p>Binary:{this.state.binaryResult}</p>
    </div>
  );
  }
}

export default App;
