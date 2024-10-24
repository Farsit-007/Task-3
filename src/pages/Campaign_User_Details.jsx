import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Campaign_User_Details = () => {
    const { id } = useParams();
    const [emailData, setEmailData] = useState(null);

    useEffect(() => {
        const fetchEmailAndReply = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/get-email-reply/${id}`);
                setEmailData(response.data);
            } catch (error) {
                console.error("Error fetching email and reply:", error);
            }
        };
        fetchEmailAndReply();
    }, [id]);


    const cleanEmailBody = (rawBody) => {
        if (!rawBody) {
            return { replyEmail: "No email content available", sentEmail: "No email content available" };
        }

        // Step 1: Remove MIME boundary markers and content-type headers
        const noBoundaries = rawBody
            .replace(/--[0-9A-Fa-f]+(?:--)?/g, '')  // Remove boundary markers
            .replace(/Content-Type:.+\r\n/g, '')    // Remove Content-Type header
            .replace(/Content-Transfer-Encoding:.+\r\n/g, '');  // Remove Content-Transfer-Encoding header

        // Step 2: Decode quoted-printable text
        const decodedBody = decodeQuotedPrintable(noBoundaries);

        // Step 3: Remove HTML tags if the email is HTML formatted
        const plainText = decodedBody.replace(/<\/?[^>]+(>|$)/g, "");

        // Step 4: Split email by the "wrote:" keyword to differentiate reply and original email
        const [replyEmail, sentEmailPart] = plainText.split(/On\s.+?wrote:/);

        // Step 5: Extract the original sent email from the quoted part
        const sentEmail = sentEmailPart ? sentEmailPart.split(/\r?\n\r?\n/)[0] : "No original email found";

        return {
            replyEmail: replyEmail.trim(),
            sentEmail: sentEmail.trim()
        };
    };

    const decodeQuotedPrintable = (input) => {
        // Decode quoted-printable encoding (e.g., =E2=80=AF)
        return input.replace(/=([A-F0-9]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        });
    };


    return (
        <div className="w-[90%] mx-auto space-y-4">
            <div className="bg-[#5D0911] p-5 rounded-xl ">
                <h1 className="text-white text-xl font-bold">Campaign Details</h1>
            </div>

            <div className="w-[90%] mx-auto space-y-4">


                <div>
                    <table className='min-w-full font-semibold leading-normal text-center'>
                        <thead className="rounded-lg bg-gradient-to-r from-[#5D0911] to-[#ac0000]">
                            <tr>
                                
                               
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                                >
                                    Sent Email
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                                >
                                    Reply
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b border-gray-200 text-white text-sm uppercase font-semibold'
                                >
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {emailData?.replies?.map((reply, index) => {
                                const { replyEmail, sentEmail } = cleanEmailBody(reply.body);

                                return (
                                    <tr key={index}>
                                       
                                       
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            {sentEmail || "No original email found"}
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            {replyEmail || "No reply found"}
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            {reply.from || "Loading..."}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Campaign_User_Details;
