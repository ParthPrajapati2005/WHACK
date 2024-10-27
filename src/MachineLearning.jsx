import { useState, useEffect } from "react";
import axios from 'axios';
import defaultData from "./menuDataset.js"
function MachineLearning(){
    const [income,setIncome] = useState(0);
    const [actualData,setData] = useState(defaultData);
    const [called,setCalled] = useState(false)


    const totalIncome = localStorage.getItem("totalIncome")

    useEffect(() => {
        async function getData(){

          const data = await axios.post("http://127.0.0.1:5000/suggested",{"income":totalIncome});
          
          console.log(data)
        }
        
        getData()
        console.log(actualData)

      }, [])

    return(
        <>
        <h1>
            Student Spending Recommendation
        </h1>

        <p>This app plugs your current monthly income into a machine learning model trained on hundreds of other UK students and uses this data to show you how much a UK student with the same income as you would spend.</p>

        <h1>Your Income: <span>{totalIncome}</span></h1>
        
        <div className="column-wrappers">
            <div className="user-expenses">
                <div className="col-title">Your expenses</div>
                </div>
            <div className="rec-expenses">
                <div className="col-title">What a UK student with your income would spend</div></div>
        </div>
        
        </>
    )
}

export default MachineLearning;