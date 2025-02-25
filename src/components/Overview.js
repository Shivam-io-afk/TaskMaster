// import Clock from './Clock';
import ChartStats from './charts/ChartStats';
import ChartCategory from './charts/ChartCateg';
import '../styles/overview.css';
import { FaRegBell } from 'react-icons/fa';
import Calendar from './Celn';
// import ComponentScheduler from './charts/Scheduler';
import ComponentScheduler from './charts/ScheduleFullCal';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';



function MainPage() {
//ToolTip or Notification Section
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));


    return (
        <div className="mainBx">
            <div className='contFrst'>
                <div className='entrance'>
                    <h1>Hello, <span> Joseph</span>
                        <span className='handing'>✋🏼</span>
                    </h1>
                    <HtmlTooltip   placement="left" style={{ position: "absolute", right: "-10px", zIndex: "5" }}
                        title={
                            <>
                                <Typography color="inherit">No Any Updates</Typography>
                                <em>{"Currently On"}</em> <b>{'Working Phase'}</b> <u>{'Starting Soon'}</u>.{' '}
                                {"Please Be patience"}
                            </>
                        }>
                        <Button><FaRegBell className='icns' /></Button>
                    </HtmlTooltip>
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
                            <ChartCategory />
                            <div className='indicator'>
                                <li>Remains</li>
                                <li>Completed</li>
                            </div>
                        </div>
                    </div>


                    <div className='celendar'>
                        <Calendar />
                    </div>
                    {/* <Clock className="clockstyles"/> */}
                </div>
            </div>

            <div className='DateTimeGrid'>
                <ComponentScheduler />
            </div>
        </div>
    );
}



export default MainPage;