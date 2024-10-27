import React from 'react';
import './CSS/Homepage.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BudgetIcon } from './assets/budget.svg'
import { ReactComponent as TimeMachine} from './assets/timeMachine.svg'

function Homepage() {

    const navigate = useNavigate();

    function goRegister(){
        navigate("/register");
    }

    function goLogin(){
        navigate("/login");
    }

    return (
        <div className="gradient-bg grid grid-cols-1 overflow-y-auto min-h-screen gap-4">
            <nav className='sticky top-0 bg-blue-900 bg-inherit col-span-1 flex justify-between items-center p-3 backdrop-blur-lg h-16 z-10 shadow-2xl text-white'>
                <div className='text-center flex items-center justify-center'>
                    <h1 className='text-4xl font-bold font-merriweather'>Future Self</h1>
                </div>
                <div className='flex gap-5'>
                    <button className='hover:bg-blue-700 transition duration-200 rounded-lg px-3 py-2' onClick={goLogin}>Login</button>
                    <button className='hover:bg-blue-700 transition duration-200 rounded-lg px-3 py-2' onClick={goRegister}>Register</button>
                </div>
            </nav>
            <main className='col-span-1 p-5 flex justify-center items-center text-white lg:mb-12'>
                <div className='flex flex-col'>
                    <h1 className="text-6xl font-bold font-merriweather">Future Self</h1>
                    <h2 className="text-4xl font-merriweather">Financial Time Machine</h2>
                    <br />
                    <button className='flex items-center justify-center rounded-lg bg-green-500 shadow-lg outline-2 py-2 px-3 text-2xl font-bold hover:bg-green-600 hover:scale-125 transition duration-200'>Get Started</button>
                </div>
            </main>
            <section className='col-span-1 flex flex-col lg:grid lg:grid-cols-3 justify-evenly py-3'>
                <div className="bg-white flex flex-col rounded-lg shadow-xl p-3 mb-4 mx-4 items-center">
                    <BudgetIcon className="w-16 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24"/>
                    <h1>Budget Planner</h1>
                    <p>Understand your spending habits</p>
                    <p>Set and track financial goals</p>
                    <p>Prioritize payment and reduce debt</p>
                </div>
                <div className="bg-white flex flex-col rounded-lg shadow-xl p-3 mb-4 mx-4 items-center">
                    <TimeMachine className="w-16 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24" />
                    <h1>Future Time Machine</h1>
                    <p>Predict future financial scenarios based on current data</p>
                    <p>Provide comprehensive view of financial history</p>
                    <p>Show potential investment growth</p>
                </div>
                <div className="bg-white flex flex-col rounded-lg shadow-xl p-3 mb-4 mx-4 items-center">
                    <h1>Thing 3</h1>
                    <p>para3</p>
                </div>
            </section>
        </div>
    );
}

export default Homepage;