import { ReactComponent as Settings} from './assets/settings.svg'
import { ReactComponent as Notifications} from "./assets/notifications.svg"
import { ReactComponent as BugReport} from "./assets/bug.svg"
import { PieChart } from '@mui/x-charts/PieChart';
import LinearProgressBar from './components/LinearProgressBar';
import { BarChart } from '@mui/x-charts';
import { Typography, Modal, Box, TextField, Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star'; // Example icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Example icon
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Example icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Right arrow icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function Dashboard(){

    const progress = 50;
    const navigate = useNavigate(); // Initialize useNavigate
    const StyledText = styled('text')(({ theme }) => ({
        fill: 'white',
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
      }));

    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
          </StyledText>
        );
      }
    
    const [open, setOpen] = useState(false);
    const [newGoal, setNewGoal] = useState("");
    const [monetaryValue, setMonetaryValue] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null); // State for selected icon
    const [goals, setGoals] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const [user, setUser] = useState('');
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [debt, setDebt] = useState(0);
    const [updated, setUpdated] = useState(false);

    const icons = [
        { name: 'Star', component: <StarIcon /> },
        { name: 'Favorite', component: <FavoriteIcon /> },
        { name: 'Money', component: <MonetizationOnIcon /> },
        // Add more icons as needed
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewGoal("");
        setMonetaryValue("");
        setSelectedIcon(null); // Reset selected icon
        setEditIndex(null);
    };

    const handleAddGoal = () => {
        if (newGoal.trim() && monetaryValue && selectedIcon) {
            const updatedGoals = [...goals];
            const goalData = { name: newGoal, value: monetaryValue, icon: selectedIcon };
            if (editIndex !== null) {
                updatedGoals[editIndex] = goalData; // Edit existing goal
                setGoals(updatedGoals);
            } else {
                setGoals([...goals, goalData]); // Add new goal
            }
            handleClose();
        }
    };

    const handleEditGoal = (index) => {
        const goalToEdit = goals[index];
        setNewGoal(goalToEdit.name);
        setMonetaryValue(goalToEdit.value);
        setSelectedIcon(goalToEdit.icon); // Set the selected icon
        setEditIndex(index);
        handleOpen();
    };

    const handleDeleteGoal = (index) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('forDashboard')).user;
        setUser(data.name);
        let totalIncome = 0;
        let totalExpenses = 0;
        let totalDebt = 0;
        console.log(data.income);
        for(let key in data.income){
            console.log(key, data.income[key]);
            totalIncome+=parseInt(data.income[key]);
        }
        for(let key in data.expenses){
            //console.log(key, data.expenses[key])
            totalExpenses+=parseInt(data.expenses[key]);
        }
        for(let key in data.debt){
            totalDebt+=parseInt(data.debt[key]);
        }
        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setDebt(totalDebt);
    }, [])

    return(
        <div className="grid grid-cols-3 gap-3 p-3 bg-blue-950 h-screen w-screen text-white">
            <nav className="flex justify-between col-span-3 bg-blue-700 rounded-xl px-3 shadow-xl">
                <div className="flex flex-col justify-center">
                    <p className='font-extrabold text-2xl pt-2'>Future Self</p>
                    <h2>Welcome back, {user} !</h2>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <button><BugReport /></button>
                    <button><Settings /></button>
                    <button><Notifications /></button>
                </div>
            </nav>
            <section className='bg-blue-700 rounded-lg shadow-xl flex flex-col justify-center items-center'>
                <PieChart series={[
                    {
                        data:[
                            {id:0, value:income, label: 'Incomes'},
                            {id:1, value:expenses, label:'Expenses'},
                            {id:2, value:debt, label:'Debt'},
                        ],
                        innerRadius: 64,
                        outerRadius: 100,
                        paddingAngle: 4,
                    }
                ]}
                width={400}
                height={200}>
                    <PieCenterLabel>$4000</PieCenterLabel>
                </PieChart>
            </section>
            <section className='grid grid-cols-3 bg-blue-700 rounded-lg shadow-xl items-center'>
                <p className='col-span-3 flex justify-center pt-3 text-2xl font-bold'>My Cashflow for June</p>
                <div className='col-span-2 p-3'>
                    <p>This linear progress has {progress} value</p>
                    <LinearProgressBar />
                    <br></br>
                    <LinearProgressBar />
                </div>
                <h1 className='col-span-1'>$24,578</h1>
            </section>
            <section className='bg-blue-700 rounded-lg shadow-xl row-span-2'>
                <Typography variant="h6" className="mb-2"></Typography>
                <Button
                    variant="contained"
                    color="black" // Changed to gray
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/timemachine')}
                    sx={{
                        marginTop:'15%',
                        marginLeft:'10%',
                        width:'80%',
                        height: '100px', // Increase height
                        fontSize: '1.2rem', // Increase font size for better visibility
                        justifyContent: 'space-between',
                        backgroundColor: 'black', // Use a specific shade of gray
                        '&:hover': {
                            backgroundColor: 'gray.600', // Darken on hover
                        },
                    }}
                >
                    Time Machine Modelling
                </Button>

                <Button
                    variant="contained"
                    color="gray" // Changed to gray
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        marginTop:'15%',
                        marginLeft:'10%',
                        width:'80%',
                        height: '100px', // Increase height
                        fontSize: '1.2rem', // Increase font size for better visibility
                        justifyContent: 'space-between',
                        backgroundColor: 'black', // Use a specific shade of gray
                        '&:hover': {
                            backgroundColor: 'gray.600', // Darken on hover
                        },
                    }}
                >
                    Predicted Spending
                </Button>

                <Button
                    variant="contained"
                    color="gray" // Changed to gray
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/bankaccounts')}
                    sx={{
                        marginTop:'15%',
                        marginLeft:'10%',
                        width:'80%',
                        height: '100px', // Increase height
                        fontSize: '1.2rem', // Increase font size for better visibility
                        justifyContent: 'space-between',
                        backgroundColor: 'black', // Use a specific shade of gray
                        '&:hover': {
                            backgroundColor: 'gray.600', // Darken on hover
                        },
                    }}
                >
                    Student Bank Accounts/LISA's
                </Button>
            </section>
        
            <section className='bg-blue-700 rounded-lg shadow-xl p-3'>
                <p className='flex justify-center col-span-3 pt-3 text-2xl font-bold'>My Expenses for June</p>
                <BarChart xAxis={[{ scaleType: 'band', data: ['Incomes','Expenses', 'Debt']}]}
                series={[{ data: [4,3,5]}, {data: [1,6,3]}, {data: [2,5,6]}]}
                width={500}
                height={200}
                />
            </section>

            <section className="bg-blue-700 rounded-lg shadow-xl p-4 flex flex-col justify-center">
                <h2 className="text-lg font-bold mb-2">Your Goals</h2>
                <div className="grid grid-cols-3 grid-rows-2 gap-3 w-full h-full">
                    {goals.map((goal, index) => (
                        <div key={index} className="flex flex-col items-center justify-center bg-gray-600 rounded-lg p-4 text-center shadow-md">
                            <div>{goal.icon} {/* Display selected icon */}</div>
                            <div>{goal.name}</div>
                            <div>${goal.value}</div>
                            <div className="flex gap-2 mt-2">
                                <IconButton onClick={() => handleEditGoal(index)} size="small">
                                    <EditIcon fontSize="small" style={{ color: 'white' }} />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteGoal(index)} size="small">
                                    <DeleteIcon fontSize="small" style={{ color: 'white' }} />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                    <div
                        className="flex items-center justify-center bg-gray-600 bg-opacity-50 border-2 border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer"
                        onClick={handleOpen}
                    >
                        + Add Goal
                    </div>
                </div>
            </section>

            {/* Modal for Adding/Editing a Goal */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                }}>
                    <Typography variant="h6" component="h2">{editIndex !== null ? 'Edit Goal' : 'Add New Goal'}</Typography>
                    <TextField
                        label="Goal"
                        variant="outlined"
                        fullWidth
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        sx={{ my: 2 }}
                    />
                    <TextField
                        label="Monetary Value"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={monetaryValue}
                        onChange={(e) => setMonetaryValue(e.target.value)}
                        sx={{ my: 2 }}
                    />
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Select Icon:</Typography>
                    <div className="flex justify-around mt-2 mb-2">
                        {icons.map((icon, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center cursor-pointer ${selectedIcon === icon.component ? 'text-blue-500' : 'text-gray-500'}`}
                                onClick={() => setSelectedIcon(icon.component)}
                            >
                                {icon.component}
                                <span className="text-xs">{icon.name}</span>
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" color="primary" onClick={handleAddGoal}>
                        {editIndex !== null ? 'Save Changes' : 'Save Goal'}
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default Dashboard
