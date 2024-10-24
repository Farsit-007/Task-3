import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const Campaign_Update = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  const [smtpEmails, setSmtpEmails] = useState([]);
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  // Fetch campaign data and set form value
  useEffect(() => {
    const fetchSmtpDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-campaign-data/${id}`);
        const { smtpUser, smtpPassword, smtp_Email, subject, selectedEmails,body } = response.data;
        console.log(response.data);
        setValue("smtpUser", smtpUser);
        setValue("smtpPassword", smtpPassword);
        setValue("smtp_Email", smtp_Email);
        setValue("subject", subject);
        setValue("body", body);
        setSelectedEmails(selectedEmails || []);
      } catch (error) {
        console.error("Error fetching SMTP details:", error);
      }
    };

    fetchSmtpDetails();
  }, [id, setValue]);

  // Fetch SMTP Emails for the dropdown
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

  // Fetch email addresses for checkbox selection
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-emails");
       
        setEmails(response.data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };
    fetchEmails();
  }, []);

  // Handle email checkbox selection
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
      await axios.patch(`http://localhost:5000/campaign-details-update/${id}`, formData);
      reset(); 
      setSelectedEmails([]); 
    } catch (error) {
      console.error("Error submitting campaign details:", error);
    }
  };

  return (
    <div >
      <div className="bg-[#7a3434] md:w-[80%] mt-10 mx-auto p-10 rounded-xl">
        <div className="text-center border-b-2 mb-4">
          <h1 className="text-3xl font-bold text-white">Update Campaign</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="flex flex-col md:flex-row justify-between">
            <div className="lg:w-[60%]">
              <div>
                <label htmlFor="smtpUser" className="block text-sm text-white mb-2">
                  SMTP Username
                </label>
                <input
                  type="text"
                  id="smtpUser"
                  placeholder="Enter SMTP Username"
                  className="w-full text-white px-3 py-2 border rounded-md outline-none border-gray-200 bg-transparent"
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
                  disabled
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
                  disabled
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
            <div className=" lg:w-[30%] max-h-72 overflow-auto">
              <h3 className="text-white text-sm mb-2">Select Emails</h3>
              <div className="space-y-2">
                {emails.map((email) => (
                  <div key={email.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(email.stu_email)}
                      onChange={() => handleEmailSelection(email.stu_email)}
                      className="h-5 w-5 text-white  focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="ml-2 text-sm  text-white">{email.stu_email}</span>
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
    </div>
  );
};

export default Campaign_Update;
