import React, { useState, useEffect } from 'react';
import '.././App.css';
import { FaX } from 'react-icons/fa6';

function ShowAlert({ type = "error", message = "Something went wrong!" }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Close with animation
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 800);
    };

    if (!isVisible) return null;

    return (
        <div className={`alert-box ${type} ${isClosing ? 'hide' : ''}`} onClick={handleClose}>
            <span>{message}</span>
            <div className={`progress ${isClosing ? 'hideporgress' : ''}`}></div>
            <FaX className="icns" />

            
{/* <ShowAlert type="success" message="Success! Your action was completed." />
<ShowAlert type="info" message="Info: This is an important update." />
<ShowAlert type="warning" message="Warning! Check your input again." />
<ShowAlert type="error" message="Error! Something went wrong." /> */}
        </div>
    );
}



// error, info, warning, success


export default ShowAlert;
