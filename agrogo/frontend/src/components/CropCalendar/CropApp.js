import React from 'react';
import Search from './CropComponents/search/search';
import'./CropApp.css'


function App() {

  const handleOnSearchChange = (searchData) =>{
    console.log(searchData);
  }

  return(
<div className='App'>
<Search onSearchChange={handleOnSearchChange}/>
</div>
  )
  
}

export default App;