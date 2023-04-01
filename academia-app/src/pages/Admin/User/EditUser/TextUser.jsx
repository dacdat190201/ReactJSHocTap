import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
const formatTime = (time) =>{
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time - minutes * 60)
    if(minutes <=10) minutes = '0' + minutes
    if(seconds <=10) seconds = '0' + seconds
    return minutes + ":" + seconds
}
const TextUser = () => {
    const [time,SetTime] = useState(60);;
    const [render,Setrender] = useState(false)
    let interval = null
    useEffect(()=>{
        if(time <= 0){
            clearInterval(interval)
            alert("END")
        }
    })
    useEffect(()=>{
       
        if(render){
            interval =  setInterval(()=>{
                SetTime(prev => prev - 1)
            },1000)
        }
        return ()=>clearInterval(interval)
    },[render])
    
  return (
    <div>
        <button onClick={()=>Setrender(true)}>Click</button>
        <button onClick={()=>Setrender(false)}>Stopy</button>
            {
                render && <div> Thoi Gian {formatTime(time)} </div>
            }
        
    </div>
  )
}

export default TextUser