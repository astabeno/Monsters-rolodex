// import { Component } from 'react';
import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');/
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log('render')

  useEffect(() => {
    console.log('effect fired');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users))
  }, []);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  },[monsters, searchField]);

  return(
    <div className="App">
       
        <h1 className='app-title'>Monsters Roledex changed</h1>

        <SearchBox 
          className = 'search-monsters'
          onChangeHandler = {onSearchChange} 
          placeholder = 'Search Monsters' 
        />
    
        <CardList monsters={filteredMonsters} />
      </div>
  )
}
 
// class App extends Component {

//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//     console.log('CONSTRUCTOR');
//   }

//   componentDidMount() {
//     //console.log('COMPONENTDIDMOUNT')
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//         return {monsters: users}
//       }) )
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
    
//     this.setState(()=> {
//       return { searchField }
//     });
//   }


//   render() {
//     //console.log('RENDER')
//     const { monsters, searchField } = this.state;
//     const {onSearchChange} = this
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
       
//         <h1 className='app-title'>Monsters Roledex</h1>

//         <SearchBox onChangeHandler = {onSearchChange} placeholder = 'Search Monsters' className = 'search-monsters'/>
        
        
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
  
// }

export default App;
