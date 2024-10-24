import { useForm } from "react-hook-form";
import axios from "axios";

const User_Manage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:5000/add-student', data);
            reset(); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="flex flex-col bg-[#7a3434] md:w-[490px] p-10 pb-4 pt-2 rounded-xl">
                <div className="mb-4 text-center border-b-2">
                    <h1 className="my-2 text-3xl font-bold text-white">ADD Email</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="stu_email" className="block text-white mb-2 text-sm">Student Email</label>
                            <input
                                type="text"
                                name="stu_email"
                                id="stu_email"
                                placeholder="Enter SMTP Username (e.g., your email)"
                                className="w-full text-white outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent"
                                {...register("stu_email", { required: "Email is required" })}
                            />
                            {errors.stu_email && <small className="text-red-500 font-bold">{errors.stu_email.message}</small>}
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

export default User_Manage;
