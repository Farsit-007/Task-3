/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Send_Button from "./Send_Button";
import axios from 'axios';
const Campaign_Table = ({ campaign, fetchCampaign }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete-campaign/${id}`);
            fetchCampaign();
        } catch (error) {
            console(error);
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
                            Name
                        </th>
                        <th
                            scope='col'
                            className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                        >
                            Subject
                        </th>

                        <th
                            scope='col'
                            className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                        >
                            Participant
                        </th>
                        <th
                            scope='col'
                            className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                        >
                            Send Email
                        </th>
                        <th
                            scope='col'
                            className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                        >
                            Replies 
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
                          Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {campaign.length > 0 ? (
                        campaign.map((c) => (
                            <tr key={c._id} className="text-center">
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {c.smtpUser} 
                                    </p>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {c.subject} 
                                    </p>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {c.selectedEmails.length} 
                                    </p>
                                </td>

                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        <Send_Button
                                            subject={c.subject}
                                            name={c.smtpUser}
                                            smtp_Email={c.smtp_Email}
                                            selectedEmails={c.selectedEmails}
                                            body = {c.body}
                                        ></Send_Button>
                                    </p>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <Link to={`/smtp-user-details/${c._id}`} className="text-red-500 hover:text-red-700 ">
                                        View
                                    </Link>
                                </td>

                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <Link to={`/campaign-update/${c._id}`}

                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Update
                                    </Link>
                                </td>


                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <button
                                        onClick={() => handleDelete(c._id)}
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

export default Campaign_Table;