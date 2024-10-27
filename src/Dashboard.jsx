import { ReactComponent as Settings} from './assets/settings.svg'
import { ReactComponent as Notifications} from "./assets/notifications.svg"
import { ReactComponent as BugReport} from "./assets/bug.svg"
import { PieChart } from '@mui/x-charts/PieChart';
import { LinearProgress } from '@mui/material';
import LinearProgressBar from './components/LinearProgressBar';
import { Link } from 'react-router-dom'
import { BarChart } from '@mui/x-charts';

import { Typography, Modal, Box, TextField, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star'; // Example icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Example icon
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Example icon

function Dashboard(){

    const progress = 50;

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

    return(
        <div className="grid grid-cols-3 gap-3 p-3 bg-blue-950 h-screen w-screen text-white">
            <nav className="flex justify-between col-span-3 bg-gray-600 rounded-xl px-3 shadow-xl">
                <div className="flex flex-col justify-center">
                    <p className='font-extrabold text-2xl'>Future Self</p>
                    <h2>Welcome back, username!</h2>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <button><BugReport /></button>
                    <button><Settings /></button>
                    <button><Notifications /></button>
                </div>
            </nav>
            <section className='bg-gray-600 rounded-lg shadow-xl flex flex-col justify-center items-center'>
                <PieChart series={[
                    {
                        data:[
                            {id:0, value:10},
                            {id:1, value:15, label:'series B'},
                            {id:2, value:25, label:'series C'},
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
            <section className='grid grid-cols-3 bg-gray-600 rounded-lg shadow-xl items-center'>
                <p className='col-span-3 flex justify-center pt-3 text-2xl font-bold'>My Cashflow for June</p>
                <div className='col-span-2 p-3'>
                    <p>This linear progress has {progress} value</p>
                    <LinearProgressBar />
                    <br></br>
                    <LinearProgressBar />
                </div>
                <h1 className='col-span-1'>$24,578</h1>
            </section>
            <section className='bg-gray-600 rounded-lg shadow-xl row-span-1'>
                <div className='p-3 flex flex-col justify-center text-2xl font-bold'>
                    <p>Get more useful information here</p>
                    <Link to='/'>For now there's nothing</Link>
                </div>
            </section>
        
            <section className='bg-gray-600 rounded-lg shadow-xl p-3'>
                <p className='flex justify-center'>My Expenses for June</p>
                <BarChart xAxis={[{ scaleType: 'band', data: ['group A','group B', 'group C']}]}
                series={[{ data: [4,3,5]}, {data: [1,6,3]}, {data: [2,5,6]}]}
                width={500}
                height={200}
                />
            </section>

            <section className="bg-gray-700 rounded-lg shadow-xl p-4 flex flex-col justify-center">
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


            <footer className='col-span-3 bg-gray-600 rounded-lg shadow-xl p-3'>

            </footer>




            {/* <section className="bg-gray-800 row-span-3 rounded-lg">
                1
            </section>
            <section className="bg-gray-800 rounded-lg row-span-2">
                2
            </section>
            <section className="bg-gray-800 rounded-lg row-span-2">
                3
            </section>
            <section className="bg-gray-800 rounded-lg row-span-2">
                4
            </section>
            <section className="bg-gray-800 rounded-lg row-span-4"> 
                5
            </section>
            <section className="bg-gray-800 rounded-lg row-span-3">
                6
            </section>
            <section className="bg-gray-800 rounded-lg row-span-2">
                7
            </section>
            <footer className="bg-gray-800 rounded-lg col-span-3">

            </footer> */}
        </div>
    )
}

export default Dashboard
