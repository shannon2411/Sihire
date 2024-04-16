import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { FileText } from 'lucide-react';

const supabase = createClient(
  "https://ldhohewyhcdwckzcjtzn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaG9oZXd5aGNkd2NremNqdHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNjY0MzksImV4cCI6MjAyNTc0MjQzOX0.73gDtZ0yUZmpXvIrga-Mw7amJNaPJu6av7wyr0OSCuo"
);

function JobApplicationDetailDP() {
  const stages = [
    { name: 'Applied', value: 0 },
    { name: 'In Review', value: 16 },
    { name: 'Interview', value: 32 },
    { name: 'Accepted', value: 48 },
    { name: 'Declined', value: 64 },
    { name: 'On Boarding', value: 80 },
    { name: 'Withdrawn', value: 100 },
  ];


  const { id } = useParams();

  const [formData, setFormData] = useState({
    applicant: '',
    job: '',
    jobName: '',
    nama: '',
    email: '',
    noTelepon: '',
    cv: '',
    coverLetter: '',
    status:'',
  });
    const calculateProgress = (stageName) => {
    const stage = stages.find(stage => stage.name === stageName);
    return stage ? stage.value : 0;
  };

  const currentStage = formData.status;
  const progress = calculateProgress(currentStage);
  console.log('apapappa',progress)
  useEffect(() => {
    const fetchJobApplicationData = async () => {
      try {
        const response = await fetch('https://sihire-be.vercel.app/api/job-application/get-detail/' + id + '/', {
          method: 'GET',
        });
        const jobApplicationData = await response.json();

        const { data, error } = await supabase.storage
          .from("sihire")
          .createSignedUrls(
            [jobApplicationData.cv, jobApplicationData.cover_letter],
            60
          );

        setFormData({
          ...formData,
          job: jobApplicationData.job,
          applicant: jobApplicationData.applicant,
          cv: data[0].signedUrl,
          coverLetter: data[1].signedUrl,
          status:jobApplicationData.status,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchJobApplicationData();

    console.log(formData);
  }, []); 

console.log('blablaaukauigus92002:',formData)
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="container mx-auto mt-8 md:mt-16" style={{ marginTop: "7%" }}>
        <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>
        <hr className="mb-4 border-solid border-black" />
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{formData.job.job_name}</h2>
          <strong>Status:</strong> {}
          <div className="mt-4 relative flex justify-between">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center">
                <span
                className={`w-2 h-2 rounded-full ${
                  formData.status === 'Withdrawn' ? 'bg-red-500' : progress >= stage.value ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></span>
              <span
                className={`text-sm ml-1 ${
                  formData.status === 'Withdrawn' ? 'text-red-500' : progress >= stage.value ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {stage.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mb-2">
  <progress
    className="w-full bg-gray-200"
    value={formData.status === 'Withdrawn' ? 100 : progress}
    max="100"
  ></progress>
  <style jsx global>{`
    progress::-webkit-progress-bar {
      background-color: #f5f5f5;
    }
    progress::-webkit-progress-value {
      background-color: ${formData.status === 'Withdrawn' ? 'red' : 'green'};
    }
  `}</style>
</div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <strong>Nama</strong> 
              <p>{formData.applicant.user?.name}</p>
              <br />
              <strong>Email</strong> {}
              <p>{formData.applicant.user?.email}</p>
              <br />
              <strong>No Telepon</strong> {}
              <p>{formData.applicant.user?.phone}</p>
            </div>
            <div>
            <strong>CV</strong>
              {
                formData.cv ? 
                <a
                  href={formData.cv}
                  target='__blank'
                  rel='noopener noreferrer'
                  className='mt-2'
                >
                  <FileText color='#bc3434' />
                </a> : 
                <a
                  href={formData.cv}
                  target='__blank'
                  rel='noopener noreferrer'
                  className='mt-2 cursor-not-allowed'
                >
                  <FileText color="#707070" />
                </a>
              }
              <br />
              <strong>Cover Letter</strong>
              {
                formData.coverLetter ? 
                <a
                  href={formData.coverLetter}
                  target='__blank'
                  rel='noopener noreferrer'
                  className='mt-2'
                >
                  <FileText color='#bc3434' />
                </a> : 
                <a
                  href={formData.coverLetter}
                  target='__blank'
                  rel='noopener noreferrer'
                  className='mt-2 cursor-not-allowed'
                >
                  <FileText color="#707070" />
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplicationDetailDP;
