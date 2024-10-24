/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

const Send_Button = ({ name, subject, smtp_Email, selectedEmails ,body}) => {
    const [isOn, setIsOn] = useState(() => {
        const savedState = localStorage.getItem('sendButton');
        return savedState ? JSON.parse(savedState) : true;
    });

    const dataInfo = {
        name: name,
        subject: subject,
        userEmail: selectedEmails,
        smtpEmail: smtp_Email,
        body : body
    };

    useEffect(() => {
        localStorage.setItem('sendButton', JSON.stringify(isOn));
    }, [isOn]);

    const handleSend = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send-to-users', dataInfo);
            if (response.status === 200) {
                alert("Email sent successfully!");
                setIsOn(false);
            } else {
                alert("Failed to send the email.");
            }
        } catch (error) {
            console(error);
        }
    };

    return (
        <div>
            {
                isOn 
                ? <button onClick={handleSend}>ON</button>  
                : <button onClick={() => setIsOn(true)}>OFF</button> 
            }
        </div>
    );
};

export default Send_Button;
