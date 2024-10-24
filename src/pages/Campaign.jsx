import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Campaign_Table from "../components/Campaign_Table";
const Campaign = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [smtpEmails, setSmtpEmails] = useState([]);
  const [emails, setEmails] = useState([]); 
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [campaign, setCampaign] = useState([]); 

  useEffect(() => {
    const fetchSmtpEmails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-email-drop"); 
        setSmtpEmails(response.data);
      } catch (error) {
        console.error("Error fetching SMTP emails", error);
      }
    };
    fetchSmtpEmails();
  }, []);

  // Fetch emails for checkboxes
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-emails"); 
        setEmails(response.data); 
      } catch (error) {
        console(error);
      }
    };
    fetchEmails();
  }, []);

  //fetch campaign data
  const fetchCampaign = async () => {
    try {
      const response = await axios.get("http://localhost:5000/campaign-details"); 
      setCampaign(response.data);
    } catch (error) {
      console(error);
    }
  };
  useEffect(() => {
    fetchCampaign();
  }, []);

  // Handle email selection checkboxes
  const handleEmailSelection = (email) => {
    setSelectedEmails((prevSelectedEmails) => {
      if (prevSelectedEmails.includes(email)) {

        return prevSelectedEmails.filter((selected) => selected !== email);
      } else {

        return [...prevSelectedEmails, email];
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        selectedEmails,
      };

      await axios.post("http://localhost:5000/campaign-details", formData);
      setSelectedEmails("")
      reset();
      fetchCampaign();
    } catch (error) {
      console.error("Error submitting campaign details:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="">
        <div className="bg-[#7a3434] md:w-[70%] mx-auto p-10 rounded-xl">
          <div className="text-center border-b-2 mb-4">
            <h1 className="text-3xl font-bold text-white"> Create Campaign</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col md:flex-row justify-between">
              <div className="lg:w-[60%]">
                <div>
                  <label htmlFor="smtpUser" className="block text-sm text-white mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    id="smtpUser"
                    placeholder="Enter SMTP Username"
                    className="w-full px-3 text-white py-2 border rounded-md outline-none border-gray-200 bg-transparent"
                    {...register("smtpUser", { required: "SMTP Username is required" })}
                  />
                  {errors.smtpUser && (
                    <small className="text-red-500">{errors.smtpUser.message}</small>
                  )}
                </div>

                {/* SMTP Email Dropdown */}
                <div>
                  <label htmlFor="smtp_Email" className="block text-sm text-white mb-2">
                    SMTP Email
                  </label>
                  <select
                    id="smtp_Email"
                    className="select w-full"
                    {...register("smtp_Email", { required: "Select an SMTP email" })}
                  >
                    <option disabled selected value="">
                      -- Select an SMTP Email --
                    </option>
                    {smtpEmails.map((email) => (
                      <option key={email.id} value={email.smtpUser}>
                        {email.smtpUser}
                      </option>
                    ))}
                  </select>
                  {errors.smtp_Email && (
                    <p className="text-red-500 text-sm">{errors.smtp_Email.message}</p>
                  )}
                </div>

                {/* Subject Textarea */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-white mb-2">
                    Subject
                  </label>
                  <textarea
                    id="subject"
                    placeholder="Enter campaign subject"
                    rows="2"
                    className="w-full px-3 text-white py-2 border rounded-md outline-none border-gray-200 bg-transparent"
                    {...register("subject", { required: "Subject is required" })}
                  ></textarea>
                  {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-white mb-2">
                    Body
                  </label>
                  <textarea
                    id="body"
                    placeholder="Enter campaign subject"
                    rows="2"
                    className="w-full px-3 text-white py-2 border rounded-md outline-none border-gray-200 bg-transparent"
                    {...register("body", { required: "Body is required" })}
                  ></textarea>
                  {errors.body && (
                    <p className="text-red-500 text-sm">{errors.body.message}</p>
                  )}
                </div>

              </div>
              {/* Email Selection Checkboxes */}
              <div className=" lg:w-[30%] max-h-90 overflow-auto">
                <h3 className="text-white text-sm mb-2">Select Emails</h3>
                <div className="space-y-2">
                  {emails.map((email) => (
                    <div key={email.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(email.stu_email)}
                        onChange={() => handleEmailSelection(email.stu_email)}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-white">{email.stu_email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Create Campaign
            </button>
          </form>
        </div>

        {/* Campaign Table */}
        <div className="w-full md:w-[70%] mx-auto my-10">
          <Campaign_Table fetchCampaign={fetchCampaign} campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default Campaign;
