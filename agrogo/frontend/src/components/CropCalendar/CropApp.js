import React from 'react';
import Search from './CropComponents/search/search';
import'./CropApp.css';


function CropApp() {

  const handleOnSearchChange = (searchData)=>{
    console.log(searchData);
  }

  return(
<div className="container">

<Search  onSearchChange={handleOnSearchChange}/>

</div>
  );
  
};

export default CropApp;