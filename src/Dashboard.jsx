import { ReactComponent as Settings} from './assets/settings.svg'
import { ReactComponent as Notifications} from "./assets/notifications.svg"
import { ReactComponent as BugReport} from "./assets/bug.svg"
import { PieChart } from '@mui/x-charts/PieChart';
import { LinearProgress, Typography } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import LinearProgressBar from './components/LinearProgressBar';
import { Link } from 'react-router-dom'
import { BarChart } from '@mui/x-charts';

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
                <p>Goals</p>
                <ul>
                    <li>Goal 1</li>
                    <li>Goal 2</li>
                </ul>
            </section>
            <section className='bg-gray-600 rounded-lg shadow-xl p-3'>
                <p className='flex justify-center'>My Expenses for June</p>
                <BarChart xAxis={[{ scaleType: 'band', data: ['group A','group B', 'group C']}]}
                series={[{ data: [4,3,5]}, {data: [1,6,3]}, {data: [2,5,6]}]}
                width={500}
                height={200}
                />
            </section>
            <section className='bg-gray-600 rounded-lg shadow-xl p-3'>

            </section>
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