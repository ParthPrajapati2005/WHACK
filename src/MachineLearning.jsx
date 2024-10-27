import { useState, useEffect } from "react";
import axios from 'axios';
import defaultData from "./menuDataset.js"
function MachineLearning(){
    const [income,setIncome] = useState(0);
    const [actualData,setData] = useState({});
    const [called,setCalled] = useState(false)


    const totalIncome = localStorage.getItem("totalIncome")

    useEffect(() => {
        async function getData(){

          const data = await axios.post("http://127.0.0.1:5000/suggested",{"income":totalIncome});
          
          console.log(data)
          setData(data.data)
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
            <div className="rec-expenses">
            <div className="col-title">What an average UK student with your income would spend</div>
            
            {Object.entries(actualData).map(([key, value]) => (
                          <div key={key} className="expense-item flex justify-between bg-blue-500 rounded-lg p-3 text-xl">
                              {key}: £{value}
                          </div>
                      ))}
            
            </div>
        </div>
        </>
    )
}

export default MachineLearning;