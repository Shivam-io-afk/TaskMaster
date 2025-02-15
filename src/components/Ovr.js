import '../styles/overview.css';
import Clock from './Clock';
import ChartStats from './charts/ChartStats'
function MainPagge() {

    return (
        <div className="mainBx">
            <div className='contFrst'>
                <div className='entrance'>
                    <h1>Hello, <span style={{ fontSize: "17px", color: "#000" }}>Joseph</span> <span className='handing'>✋🏼</span></h1>
                </div>
                <div className='usrDetail'>
                    <div className='chldchart'>
                        <ChartStats />

                    </div>
                    {/* <Clock className="clockstyles"/> */}
                </div>
            </div>
        </div>
    );
}


export default MainPagge;