/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";

const Update_Page = ({ fetchSmtpEmails }) => {
    const { id } = useParams(); 
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const [smtpUser, setSmtpUser] = useState(""); 
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    
    useEffect(() => {
        const fetchSmtpDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/get-email/${id}`);
                const { smtpUser, smtpPassword } = response.data;
                setSmtpUser(smtpUser);
                setValue("smtpPassword", smtpPassword);
            } catch (error) {
                console.error("Error fetching SMTP details:", error);
            }
        };

        fetchSmtpDetails();
    }, [id, setValue]);

    const togglePasswordVisibility = () => {
        setShow(!show);
    };

    const onSubmit = async (data) => {
        try {
        
            await axios.patch(`http://localhost:5000/update-smtp-user/${id}`, {
                smtpUser, 
                smtpPassword: data.smtpPassword, 
            });
            console.log("SMTP password updated:", data);
            navigate('/set-smtp')
            reset(); 
            fetchSmtpEmails();
        } catch (error) {
            console.error("Error updating SMTP password:", error);
        }
    };

    return (
        <div className="flex justify-center min-h-[80vh] items-center">
            <div className="flex flex-col bg-[#7a3434] md:w-[490px] p-10 pb-4 pt-2 rounded-xl">
                <div className="mb-4 text-center border-b-2">
                    <h1 className="my-2 text-3xl font-bold">UPDATE SMTP</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="smtpUser" className="block mb-2 text-sm">SMTP Username (Email)</label>
                            <input
                                type="text"
                                name="smtpUser"
                                id="smtpUser"
                                value={smtpUser} 
                                disabled 
                                className="w-full outline-none px-3 py-2 border rounded-md border-gray-200 bg-gray-100"
                            />
                        </div>

                     
                        <div>
                            <label htmlFor="smtpPassword" className="block mb-2 text-sm">SMTP App Password</label>
                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    name="smtpPassword"
                                    id="smtpPassword"
                                    placeholder="Enter your new SMTP App password"
                                    className="w-full px-3 py-2 outline-none border rounded-md border-gray-200 bg-transparent"
                                    {...register("smtpPassword", { required: "SMTP App Password is required" })}
                                />
                                <span onClick={togglePasswordVisibility} className="absolute right-[2%] top-[31%] cursor-pointer">
                                    {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </span>
                            </div>
                            {errors.smtpPassword && <small className="text-red-500 font-bold">{errors.smtpPassword.message}</small>}
                        </div>
                    </div>

                    <div className="pt-1">
                        <button
                            type="submit"
                            className="w-full px-8 btn transition-colors duration-300 transform badge bg-[#5D0911] hover:bg-rose-100 rounded-md text-xl hover:text-[#5D0911]"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update_Page;
