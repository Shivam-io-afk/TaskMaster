import Clock from './Clock';
import ChartStats from './charts/ChartStats';
import ChartCategory from './charts/ChartCateg';
import '../styles/overview.css';
import { FaRegBell } from 'react-icons/fa';
import Calendar from './Celn';

function MainPagge() {

    return (
        <div className="mainBx">
            <div className='contFrst'>
                <div className='entrance'>
                    <h1>Hello, <span> Joseph</span>
                        <span className='handing'>✋🏼</span>
                    </h1>
                    <FaRegBell className='icns' />
                </div>
                <div className='charts'>
                    <div className='usrDetail'>
                        <div className='chldchart'>
                            <div>
                                <h3>Your Statistics</h3>
                                <div className='buttons_cntr'>
                                    <li>Day</li>
                                    <li>Month</li>
                                    <li className='active'></li>
                                </div>
                            </div>
                            <ChartStats />
                        </div>
                    </div>

                    <div className='usrDetail'>
                        <div className='chldchart'>
                            <div>
                                <h3>Your Progress</h3>
                            </div>
                            <ChartCategory/>
                            <div className='indicator'>
                                <li>Completed</li>
                                <li>Remains</li>
                            </div>
                        </div>
                    </div>

                    
                    <div className='celendar'>
                            <Calendar/>
                        </div>
                    {/* <Clock className="clockstyles"/> */}
                </div>
            </div>
        </div>
    );
}



export default MainPagge;