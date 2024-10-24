/* eslint-disable react/prop-types */
import axios from 'axios';
import { Link } from 'react-router-dom';

const Smtp_Table = ({ smtpEmails, fetchSmtpEmails }) => {

    // Handle Delete
    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:5000/delete-smtp-email/${id}`); 
            fetchSmtpEmails();
        } catch (error) {
            console.error("Error deleting email:", error);
        }
    };

    return (
        <div>
            <table className='min-w-full  font-semibold leading-normal text-center'>
                <thead className=" rounded-lg bg-gradient-to-r   from-[#5D0911] to-[#ac0000]">
                    <tr>
                        <th
                            scope='col'
                            className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                        >
                            Email
                        </th>
                        <th
                            scope='col'
                            className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                        >
                            Update
                        </th>
                        <th
                            scope='col'
                            className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {smtpEmails.length > 0 ? (
                        smtpEmails.map((email) => (
                            <tr key={email._id} className="text-center">
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {email.smtpUser} 
                                    </p>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <Link
                                        to={`/update-email/${email._id}`}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Update
                                    </Link>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <button
                                        onClick={() => handleDelete(email._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <p className='text-gray-900 whitespace-no-wrap'>
                                    No SMTP emails found.
                                </p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Smtp_Table;
