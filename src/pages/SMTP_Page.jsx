import { useEffect, useState } from "react";
import axios from "axios";
import Form_smtp from "../components/Form_smtp";
import Smtp_Table from "../components/Smtp_Table";

const SMTP_Page = () => {
    const [smtpEmails, setSmtpEmails] = useState([]); 
    const fetchSmtpEmails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-email'); 
            setSmtpEmails(response.data);
        } catch (error) {
            console.error("Error fetching SMTP emails:", error);
        }
    };

    useEffect(() => {
        fetchSmtpEmails(); 
    }, []);

    return (
        <div className="mx-4">
            <div className="lg:w-[90%] mx-auto">
                <div className=" ">
                    <div className="py-5">
                        <Form_smtp fetchSmtpEmails={fetchSmtpEmails} />
                    </div>
                </div>
                <div className="">
                    <Smtp_Table smtpEmails={smtpEmails} fetchSmtpEmails={fetchSmtpEmails} />
                </div>
            </div>
        </div>
    );
};

export default SMTP_Page;
