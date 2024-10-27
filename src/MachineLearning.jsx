import { useState, useEffect } from "react";
import axios from 'axios';
import defaultData from "./menuDataset.js"
import { useNavigate } from 'react-router-dom';
function MachineLearning(){
    const [income,setIncome] = useState(0);
    const [actualData,setData] = useState({});
    const [called,setCalled] = useState(false)

    const navigate = useNavigate();
    const handleBack = () => navigate("/dashboard")

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
    <div className="relative container mx-auto p-6">
    
    <button 
        className="absolute top-6 right-6 bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 transition duration-200"
        onClick={handleBack}
    >
        Back
    </button>

    <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Student Spending Recommendation
    </h1>

    <p className="text-gray-700 text-lg mb-6">
        This app plugs your current monthly income into a machine learning model trained on hundreds of other UK students and uses this data to show you how much a UK student with the same income as you would spend.
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        Your Income: <span className="text-blue-800 font-bold">£{totalIncome}</span>
    </h2>

    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <div className="col-title text-xl font-semibold text-blue-600 mb-4">
            What an average UK student with your income would spend
        </div>

        <div className="space-y-3">
            {Object.entries(actualData).map(([key, value]) => (
                <div 
                    key={key} 
                    className="expense-item flex justify-between items-center bg-blue-600 text-white rounded-lg p-4 text-lg shadow-md"
                >
                    <span className="capitalize">{key}</span>
                    <span className="font-medium">£{value}</span>
                </div>
            ))}
        </div>
    </div>
</div>


        </>
    )

}
export default MachineLearning;