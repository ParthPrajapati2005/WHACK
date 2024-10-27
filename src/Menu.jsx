import { useState, useEffect } from "react";
import './CSS/Menu.css';
import data from "./menuDataset";
import { ReactComponent as AddBtn } from "./assets/addBtn.svg"
import { ReactComponent as PenBtn } from "./assets/pen.svg"
import { Modal, Form, Button }  from 'react-bootstrap';
import { ReactComponent as BinBtn } from "./assets/bin.svg"

function Menu(){
  
  const [actualData, setData] = useState(data);


  const [newThing, setNew] = useState(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');

  

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
        const { [keyToRemove]: unused3, ...updatedIncome3 } = actualData.expenses;
        setData({
          ...actualData,
          expenses: updatedIncome3
          })
    }
  }
  

  const handleName = (e) => setName(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
  const handleType = (e) => setType(e.target.value);

  const handleNew = () => {
    setNew({nameData: name, amountData: amount});
  }

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


    const balance =  data.balance;
    
    let totalIncome = 0;
    let totalExpenses = 0;
    for(let key in data.income){
        //console.log(key, data.income[key])
        totalIncome+=data.income[key];
    }
    for(let key in data.expenses){
        //console.log(key, data.expenses[key])
        totalExpenses+=data.expenses[key];
    }
    //console.log(totalIncome)
    //console.log(totalExpenses)
    let cashflow = totalIncome - totalExpenses;
    //console.log(data);


    return(
        <>
          <Modal className="flex flex-col" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Insert the data</Modal.Title>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Car mortgage"
                      value={name}
                      onChange={handleName} 
                      />
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1000"
                      value={amount}
                      onChange={handleAmount}
                       />
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
                <Button variant="primary" onClick={handleNew}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Header>

          </Modal>

          <div className="grid-container">
            <div className="top-row"><div className="text-4xl " id="balance">Balance: £{balance}</div><div className="text-4xl" id="cashflow">Cashflow: £{cashflow}</div></div>
            <div className="bottom-row-item">Monthly Income 
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
            <div className="bottom-row-item">Monthly Expenses
            <div className="item-container">
                    {Object.entries(actualData.expenses).map(([key, value]) => (
                        <div key={key} className="expense-item">
                            {key}: £{value}
                            <div>
                              <button onClick={() => handleOpen('pen', key, value, '2')}><PenBtn /></button>
                              <button><BinBtn /></button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
            
            <div className="bottom-row-item">Debts
            <div className="item-container">
                    {Object.entries(actualData.debt).map(([key, value]) => (
                        <div key={key} className="expense-item">
                            {key}: £{value}
                            <div>
                              <button onClick={() => handleOpen('pen', key, value, '3')}><PenBtn /></button>
                              <button><BinBtn /></button>
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