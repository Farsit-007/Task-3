/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";

const Form_smtp = ({ fetchSmtpEmails }) => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const togglePasswordVisibility = () => {
        setShow(!show);
    };

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:5000/add-users', data);
            reset(); 
            fetchSmtpEmails(); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col bg-[#7a3434] p-10 pb-4 pt-2 rounded-xl">
                <div className="mb-4 text-center border-b-2">
                    <h1 className="my-2 text-3xl font-bold text-white">ADD SMTP Email</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                  
                        <div>
                            <label htmlFor="smtpUser" className="block text-white mb-2 text-sm">SMTP Username</label>
                            <input
                                type="text"
                                name="smtpUser"
                                id="smtpUser"
                                placeholder="Enter SMTP Username (e.g., your email)"
                                className="w-full text-white outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent"
                                {...register("smtpUser", { required: "SMTP Username is required" })}
                            />
                            {errors.smtpUser && <small className="text-red-500 font-bold">{errors.smtpUser.message}</small>}
                        </div>

                        {/* SMTP Password */}
                        <div>
                            <label htmlFor="smtpPassword" className="block text-white mb-2 text-sm">SMTP App Password</label>
                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    name="smtpPassword"
                                    id="smtpPassword"
                                    placeholder="Enter your SMTP App password"
                                    className="w-full px-3 py-2 text-white outline-none border rounded-md border-gray-200 bg-transparent"
                                    {...register("smtpPassword", { required: "SMTP App Password is required" })}
                                />
                                <span onClick={togglePasswordVisibility} className="absolute text-white right-[2%] top-[31%] cursor-pointer">
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
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form_smtp;
