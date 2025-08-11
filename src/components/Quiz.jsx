import React, { useRef } from 'react'
import './Quiz.css'
import { data } from '../../Assets/data'
import { useState } from 'react'

export const Quiz = () => {
  const [index,setIndex]=useState(0);
  const [qusetions,setQuestions]=useState(data[index]);
  const [lock,setLock]=useState(false); 
  const [score,setScore]=useState(0); 
  const [result,setResult]=useState(false )


  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);

  let option_array=[Option1,Option2,Option3,Option4]


  const  checkAns=(e,ans)=>{
    if(lock===false){
      if(qusetions.ans===ans){
      e.target.classList.add('correct');
      setLock(true);
      setScore(prev=>prev+1)

    }else{
      e.target.classList.add('wrong');
      setLock(true);
      option_array[qusetions.ans-1].current.classList.add('correct');
    }
    }
  }
 
  const next=()=>{
    if(lock){
      const newIndex=index+1;
      if(newIndex<data.length){
        setIndex(newIndex)
        setQuestions(data[newIndex]);
        setLock(false);
        option_array.forEach((option)=>{
        option.current.classList.remove('wrong','correct')
      })
      }else{
          setResult(true);
    }
      
    }else{
      alert('Please selsct an Answer to move on')
    }
  }
   

  const reset=()=>{
    setIndex(0);
    setQuestions(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }
  
  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr/>
      {result?<><h2>You Scored {score} out of {data.length}</h2>
      <button onClick={reset}>Reset</button> </>:<>
        <h2>{index+1}. {qusetions.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{qusetions.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{qusetions.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{qusetions.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{qusetions.option4}</li>
      </ul>

      <button onClick={next}>Next</button>
      <div className="index">{index + 1} of {data.length} questions</div>
      </>}
      
      
    </div>
  )
}
