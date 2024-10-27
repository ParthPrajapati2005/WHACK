import { ReactComponent as Settings} from './assets/settings.svg'
import { ReactComponent as Notifications} from "./assets/notifications.svg"
import { ReactComponent as BugReport} from "./assets/bug.svg"
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

function Dashboard(){

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
            <nav className="flex justify-between col-span-3 bg-gray-700 rounded-xl p-3 shadow-xl">
                <div className="flex flex-col justify-center">
                    <p className='font-extrabold text-2xl'>Future Self</p>
                    <h1>Welcome back, username!</h1>
                    <p className='text-gray-500'>Ready to build your future</p>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <button><BugReport /></button>
                    <button><Settings /></button>
                    <button><Notifications /></button>
                </div>
            </nav>
            <section className='bg-gray-700 rounded-lg shadow-xl flex flex-col justify-center items-center'>
                
                <PieChart series={[
                    {
                        data:[
                            {id:0, value:10, label:'series A', fill:'white'},
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