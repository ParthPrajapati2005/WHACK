import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './CSS/Menu.css';
import data from "./menuDataset";
import { ReactComponent as AddBtn } from "./assets/addBtn.svg"
import { Modal, Form }  from 'react-bootstrap/Modal';

function Menu(){
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

    const balance =  data.balance;
    
    let totalIncome = 0;
    let totalExpenses = 0;
    for(let key in data.income){
        console.log(key, data.income[key])
        totalIncome+=data.income[key];
    }
    for(let key in data.expenses){
        console.log(key, data.expenses[key])
        totalExpenses+=data.expenses[key];
    }
    console.log(totalIncome)
    console.log(totalExpenses)
    let cashflow = totalIncome - totalExpenses;
    console.log(data);


    return(
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Insert the data</Modal.Title>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Car mortgage" />

                  </Form.Group>
                </Form>
              </Modal.Body>
            </Modal.Header>

          </Modal>

          <div className="grid-container">
            <div className="top-row"><div className="text-4xl " id="balance">Balance: £{balance}</div><div className="text-4xl" id="cashflow">Cashflow: £{cashflow}</div></div>
            <div className="bottom-row-item">Monthly Income 
                <div className="item-container">
                    {Object.entries(data.income).map(([key, value]) => (
                        <div key={key} className="income-item">
                            {key}: £{value}
                        </div>
                    ))}
                </div>
            


            </div>
            <div className="bottom-row-item">Monthly Expenses
            <div className="item-container">
                    {Object.entries(data.expenses).map(([key, value]) => (
                        <div key={key} className="expense-item">
                            {key}: £{value}
                        </div>
                    ))}
                </div>


            </div>
            
            <div className="bottom-row-item">Debts</div>
         </div>
          <button className="absolute bottom-14 right-14 scale-150 hover:fill-[#2196f3]" onClick={handleOpen}><AddBtn /></button>
        </>
    )


}

export default Menu;