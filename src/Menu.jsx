import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './CSS/Menu.css';
import data from "./menuDataset";
import { ReactComponent as AddBtn } from "./assets/addBtn.svg"
import { Modal, Form, Button }  from 'react-bootstrap';

function Menu(){
  
  const [actualData, setData] = useState(data);


  const [newThing, setNew] = useState(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');

  

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleName = (e) => setName(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
  const handleType = (e) => setType(e.target.value);

  const handleNew = () => {
    setNew({nameData: name, amountData: amount, typeData: type});
  }

  useEffect(() => {

      if(!newThing) return;  
      const newData = newThing;
      console.log("Here")
      console.log(newData)
      

        let temp = {
            ...actualData,
            income: { ...actualData.income },
            expenses: { ...actualData.expenses },
            debt: { ...actualData.debt }
        };
        console.log(temp)

        switch(newData.typeData){
            case "1":
                temp.income[newData.name] =  newData.amount;
                // Object.defineProperty(temp.income, newData.name,newData.amount);
                break;
            case "2":
                temp.expenses[newData.name] = newData.amount;
                // Object.defineProperty(temp.expenses, newData.name,newData.amount);
                break;
            case "3":
                temp.debt[newData.name]=newData.amount;
                // Object.defineProperty(temp.debt, newData.name,newData.amount);
                break;
        }
        setData(temp);
        console.log(actualData)
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
                        <div key={key} className="income-item">
                            {key}: £{value}
                        </div>
                    ))}
                </div>
            


            </div>
            <div className="bottom-row-item">Monthly Expenses
            <div className="item-container">
                    {Object.entries(actualData.expenses).map(([key, value]) => (
                        <div key={key} className="expense-item">
                            {key}: £{value}
                        </div>
                    ))}
                </div>


            </div>
            
            <div className="bottom-row-item">Debts
            <div className="item-container">
                    {Object.entries(actualData.debt).map(([key, value]) => (
                        <div key={key} className="expense-item">
                            {key}: £{value}
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