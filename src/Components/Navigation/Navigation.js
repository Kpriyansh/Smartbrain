import React from 'react';
import Logo from '../Logo/Logo'
const Navigation = () => {
   return(
       <nav style={{display:'flex',justifyContent:'space-between'}}>
           <Logo/>
           <p className=" f3 link dim underline black pointer pa2" style={{height:"25px"}}>Sign Out</p>
       </nav>
   );
}
export default Navigation;