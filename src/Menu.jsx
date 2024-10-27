import { useState, useEffect } from "react";
import axios from 'axios';
import data from './menuDataset'
import { ReactComponent as AddBtn } from "./assets/addBtn.svg"
import { ReactComponent as PenBtn } from "./assets/pen.svg"
import { Modal, Form, Button }  from 'react-bootstrap';
import { ReactComponent as BinBtn } from "./assets/bin.svg"
import { PiArrowSquareInThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


function Menu(){

  const [actualData, setData] = useState(data);
  
  const [newThing, setNew] = useState(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [balance,setBalance] = useState(0)
  const [showBalanceModal,setShowBalanceModal] = useState(false);
  const [loaded,setLoaded] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleOpen = (pen, key, value, type) => {
    if(pen !== undefined){
      setName(key);
      setAmount(value);
      setType(type);
    }
    setShow(true);
  }

  const handleRemove = (key, type) => {

    const keyToRemove = key;
    
    switch(type){
      case '1':
        const { [keyToRemove]: unused1, ...updatedIncome1 } = actualData.income;
        setData({
          ...actualData,
          income: updatedIncome1
          })
      break;
      case '2':
        const { [keyToRemove]: unused2, ...updatedIncome2 } = actualData.expenses;
        setData({
          ...actualData,
          expenses: updatedIncome2
          })
      break;
      case '3':
        const { [keyToRemove]: unused3, ...updatedIncome3 } = actualData.debt;
        setData({
          ...actualData,
          debt: updatedIncome3
          })
      break;
      default:
        console.log('error');
    }
  }
  

  const handleName = (e) => setName(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
  const handleBalance = (e)=> setBalance(+e.target.value);

  const handleShowBalance = () => setShowBalanceModal(true);
  const handleType = (e) => {
    
    setType(e.target.value)
};
const handleBalanceChange = () => {
    setData({
      ...actualData,
      balance: balance,
    });
    setBalance(+balance);
    setShowBalanceModal(false);
  };
  const handleNew = () => {
    setNew({nameData: name, amountData: amount});
  }


  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 3 }
  };

  useEffect(() => {
       // Ensures post request is only triggered on a change
      if(loaded){
        axios.post("http://127.0.0.1:5000/setuserobject", { "userObj": actualData });
      }
      
  }, [actualData]); // Triggers the request after actualData updates

  useEffect(() => {

    if(!newThing) return;  
    const key = newThing.nameData;
    const value = newThing.amountData;

    switch(type){
      case "1":

        setData({
          ...actualData,
          income: {
            ...actualData.income,
            [key]: Number(value)
          }
        })

      break;
      case "2":
        setData({
          ...actualData,
          expenses: {
            ...actualData.expenses,
            [key]: Number(value)
          }
        })

      break;
      case "3":
        setData({
          ...actualData,
          debt: {
            ...actualData.debt,
            [key]: Number(value)
          }
        })

      break;
      default:
        console.log("not found");
    }
    
    }, [newThing])


    useEffect(() => {
      async function getData(){
        let storedName = localStorage.getItem("user")
        const data = await axios.post("http://127.0.0.1:5000/userobject");
        setData(data.data.user)
      }

      getData()
      setBalance(+actualData.balance)
      setLoaded(true)
    }, [])

    
    
    let totalIncome = 0;
    let totalExpenses = 0;
    for(let key in actualData.income){
        //console.log(key, data.income[key])
        totalIncome+=parseInt(actualData.income[key]);
    }
    for(let key in actualData.expenses){
        //console.log(key, data.expenses[key])
        totalExpenses+=parseInt(actualData.expenses[key]);
    }
    

    localStorage.setItem("totalIncome",totalIncome)
    let cashflow = Number(totalIncome) - Number(totalExpenses);
    //console.log(data);


                        
    
    return(
        <div className="bg-blue-900 grid grid-cols-3 grid-rows-[1fr_3fr] h-screen text-white">
          {/* Balance Update Modal */}
          <Modal show={showBalanceModal} onHide={() => setShowBalanceModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Balance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>New Balance</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter new balance"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBalanceModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleBalanceChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
          </Modal>
          <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton />
                 <Modal.Title className="flex justify-center items-center pt-3">Insert the data</Modal.Title>
                 <Modal.Body>
                   <Form className="flex flex-col gap-3">
                     <Form.Group>
                       <Form.Label>Name</Form.Label>
                       <Form.Control
                        type="text"
                        placeholder="Car mortgage"
                        value={name}
                        onChange={handleName} 
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1000"
                        value={amount}
                        onChange={handleAmount}
                        min={1}
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Select the type</Form.Label>
                      <Form.Select onChange={handleType} value={type}>
                        <option>Choose the type</option>
                        <option value="1">Income</option>
                        <option value="2">Expenses</option>
                        <option value="3">Debt</option>
                      </Form.Select>
                    </Form.Group> 
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => {
                    handleNew()
                    handleClose()
                  }}>
                    Save Changes
                  </Button>
                </Modal.Footer>
            </Modal>

            <nav className="col-span-3 bg-blue-600 rounded-lg shadow-xl p-3 m-3 flex justify-between items-center">
              <div className="p-3">
                <h1 className="text-4xl flex gap-3" id="balance">Balance: £{balance}<span><button onClick={() => handleShowBalance()}><PenBtn className="fill-white"/></button>
                </span></h1>
                <h1 className="text-4xl" id="cashflow">Cashflow: £{cashflow}</h1>
              </div>
              <div className="flex gap-3">
                <button className="p-3 hover:bg-red-700 rounded-lg transition duration-200 px-5 font-bold text-xl" onClick={() => navigate("/dashboard")}>Go back</button>
                <button className="p-3 hover:bg-green-700 rounded-lg  transition duration-200 font-bold text-xl" onClick={handleOpen}>Add a new entry</button>
              </div>
              
            </nav>
            <div id="incomeCol" className="col-start-1 col-span-1 bg-blue-600 rounded-lg shadow-xl p-3 m-3">
              <h1 className="text-2xl">Monthly Income</h1>
            {Object.entries(actualData.income).map(([key, value]) => (
                          <div key={key} className="income-item flex justify-between bg-blue-500 rounded-lg p-3 text-xl">
                              {key}: £{value}
                              <div className="flex gap-3">
                                <button className="hover:scale-125 transition duration-200" onClick={() => handleOpen('pen', key, value, '1')}><PenBtn className="fill-white" /></button>
                                <button className="hover:scale-125 transition duration-200" onClick={() => handleRemove(key, '1')}><BinBtn className="fill-white"/></button>
                              </div>
                          </div>
                      ))}
            </div>
            <div id="ExpenseCol" className="col-start-2 col-span-1 bg-blue-600 rounded-lg shadow-xl p-3 m-3">
              <h1 className="text-2xl">Monthly Expense</h1>
            {Object.entries(actualData.expenses).map(([key, value]) => (
                          <div key={key} className="expense-item flex justify-between bg-blue-500 rounded-lg p-3 text-xl">
                              {key}: £{value}
                              <div className="flex gap-3">
                                <button className="hover:scale-125 transition duration-200" onClick={() => handleOpen('pen', key, value, '2')}><PenBtn className="fill-white"/></button>
                                <button className="hover:scale-125 transition duration-200" onClick={() => handleRemove(key, '2')}><BinBtn className="fill-white"/></button>
                              </div>
                          </div>
                      ))}
            </div>
            <div id="DebtCol" className="col-start-3 col-span-1 bg-blue-600 rounded-lg shadow-xl p-3 m-3">
              <h1 className="text-2xl">Monthly Debt</h1>
            {Object.entries(actualData.debt).map(([key, value]) => (
                          <div key={key} className="expense-item flex justify-between bg-blue-500 rounded-lg p-3 text-xl">
                              {key}: £{value}
                              <div className="flex gap-3">
                                <button className="hover:scale-125 transition duration-200" onClick={() => handleOpen('pen', key, value, '3')}><PenBtn className="fill-white" /></button>
                                <button className="hover:scale-125 transition duration-200" onClick={() => handleRemove(key, '3')}><BinBtn className="fill-white" /></button>
                              </div>
                          </div>
                      ))}
            </div>
        </div>

    )


}

export default Menu;