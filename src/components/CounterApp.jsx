import React, { useState } from 'react'

const CounterApp = () => {
    // let count=0;
    let[count,setCount]=useState(0);
    let[data,setdata]=useState("Loading")
    function boom(){
      console.log(100);
      
      return 100
    }
    let[sample,setsample]=useState(boom)

    function handleIncrease(){
        // count+=1
        // console.log(count);
        setCount((prevCount)=>prevCount+1)
        // setCount((prevCount)=>prevCount+1)
        // setCount((prevCount)=>prevCount+1)

        

        
    }

    function handleDecrease(){
        // count-=1
        // console.log(count);
        // setCount(count-1)
        setCount((prevCount)=>prevCount-1)
        // setCount((prevCount)=>prevCount-1)
        // setCount((prevCount)=>prevCount-1)


    }
    let message;
    if(count>=20){
      {message=<p>You Won 20% Discount🎉</p>}

    }else{
      {message=<p>Click more to get  more Rewards🎁</p>}
    }

    let displaycomp=()=>{
      switch(data){
        case "Loading":return <Loading/>;
        break;
        case "Success":return <Success/>;
        break;
        case "Failure":return <Failure/>;
        break;
      }
    }
    

  return (
    <div>
        <h1 id='box'>Click To Open The Rewards✨🎁🤩{count}</h1>
        {/* <h1>Counter App: {count}{sample}</h1> */}
        <button style={{backgroundColor:"black",color:"white",padding:"5px",margin:"5px"}} onClick={handleIncrease} >Increase</button>
        <button style={{backgroundColor:"black",color:"white",padding:"5px",margin:"5px"}} onClick={handleDecrease} >Decrease</button>
        
        {count>=10?
          <p>You unlocked a 10% Discount🎉</p>
        
        :
          <p>Click 10 Times to Unlock the Rewards🎁</p>
      }
      {
        count>=15&&<p>you are a Click master😎</p>
      }
      {message}
      {displaycomp()}
      
      
    </div>
  )
}

export default CounterApp

function Loading(){
  return(
    <h1>Loading...😴</h1>
  )
}
function Success(){
  return(
    <h1>Success🤩💖</h1>
  )
}
function Failure(){
  return(
    <h1>Failure</h1>
  )
}