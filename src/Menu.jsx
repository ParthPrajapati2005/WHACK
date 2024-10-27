import { useState, useEffect } from "react";
import './CSS/Menu.css';
import axios from 'axios';
import data from './menuDataset'
import { ReactComponent as AddBtn } from "./assets/addBtn.svg"
import { ReactComponent as PenBtn } from "./assets/pen.svg"
import { Modal, Form, Button }  from 'react-bootstrap';
import { ReactComponent as BinBtn } from "./assets/bin.svg"
import { PiArrowSquareInThin } from "react-icons/pi";

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
  //const handleBalance = (e)=> setBalance(e.target.value);

  const handleShowBalance = () => setShowBalanceModal(true);
  const handleType = (e) => {
    let tempType = e.target.value;
    
    setType(e.target.value)
};
const handleBalanceChange = () => {
    setData({
      ...actualData,
      balance: balance,
    });
    setBalance(balance);
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
            [key]: value
          }
        })

      break;
      case "2":
        setData({
          ...actualData,
          expenses: {
            ...actualData.expenses,
            [key]: value
          }
        })

      break;
      case "3":
        setData({
          ...actualData,
          debt: {
            ...actualData.debt,
            [key]: value
          }
        })

      break;
      default:
        console.log("not found");
    }

    }, [newThing])


    useEffect(() => {
      async function getData(){
        const data = await axios.post("http://127.0.0.1:5000/userobject");
        
        setData(data.data.user)
      }

      getData()
      setBalance(actualData.balance)
      setLoaded(true)
    }, [])

    
    
    let totalIncome = 0;
    let totalExpenses = 0;
    for(let key in actualData.income){
        //console.log(key, data.income[key])
        totalIncome+=actualData.income[key];
    }
    for(let key in actualData.expenses){
        //console.log(key, data.expenses[key])
        totalExpenses+=actualData.expenses[key];
    }
    
    let cashflow = totalIncome - totalExpenses;
    //console.log(data);


    return(
        <>
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
                onChange={(e) => setBalance(parseFloat(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBalanceModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleBalanceChange}>Save Changes</Button>
        </Modal.Footer>
      </Modal>  

          <div className="gradient-bg">
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

          
          <div className="top-row"><div className="text-4xl " id="balance">Balance: £{balance}
          <button onClick={handleShowBalance}><PenBtn /></button>
            
            </div><div className="text-4xl" id="cashflow">Cashflow: £{cashflow}</div></div>
            
            

            <div className="bottom-row-item text-white">Monthly Income 
                <div className="item-container">
                    {Object.entries(actualData.income).map(([key, value]) => (
                        <div key={key} className="income-item flex justify-between">
                            {key}: £{value}
                            <div>
                              <button onClick={() => handleOpen('pen', key, value, '1')}><PenBtn /></button>
                              <button onClick={() => handleRemove(key, '1')}><BinBtn /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bottom-row-item text-white">Monthly Expenses
            <div className="item-container">
                    {Object.entries(actualData.expenses).map(([key, value]) => (
                        <div key={key} className="expense-item">
                            {key}: £{value}
                            <div>
                              <button onClick={() => handleOpen('pen', key, value, '2')}><PenBtn /></button>
                              <button onClick={() => handleRemove(key, '2')}><BinBtn /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bottom-row-item text-white">Debts
            <div className="item-container">
                    {Object.entries(actualData.debt).map(([key, value]) => (
                        <div key={key} className="expense-item">
                            {key}: £{value}
                            <div>
                              <button onClick={() => handleOpen('pen', key, value, '3')}><PenBtn /></button>
                              <button onClick={() => handleRemove(key, '3')}><BinBtn /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

                  
         </div>
          <button className="absolute bottom-14 right-14 scale-150 hover:fill-[#2196f3]" onClick={handleOpen}><AddBtn /></button>

        </>
    )


}

export default Menu;