import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarApplicant from "../components/sidebar-applicant";

function JobListApplicant() {
  const [jobs, setJobs] = useState(null);
  function formatDateTime(datetimeString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  }
  useEffect(() => {
    const getJobs = async () => {
      await fetch("https://sihire-be.vercel.app/api/job-posting/get/")
        .then((resp) => resp.json())
        .then((data) => {
          setJobs(data);
        });
    };
    getJobs();
  }, []);

  return (
    <React.Fragment>
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
        }}
      >
        Pekerjaan
      </p>
      <SidebarApplicant />
      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-180px" }}
        className="w-9/12"
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "32px",
            color: "#2A3E4B",
            marginBottom:"10px"
          }}
        >
          Lowongan Pekerjaan
        </p>
        {jobs && (
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Nama 
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Tanggal Tutup
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Lamar
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                      fontSize: "24px",
                      color: "#2A3E4B",
                    }}
                  >
                    {job.job_name}
                  </td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px" }}>
                    {job.datetime_closes && formatDateTime(job.datetime_closes)}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Link to={`/add-job-application/${job.id}`}>
                      <button
                        style={{
                          width: "90px",
                          padding: "8px",
                          fontSize: "16px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "bold",
                          color: "#fff",
                          borderRadius: "6px",
                          cursor: "pointer",
                          border: "2px solid #2A3E4B",
                          background: "#2A3E4B",
                        }}
                      >
                        Lamar
                      </button>
                    </Link>
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Link to={`/job-list-applicant/${job.id}`}>
                      <button
                        style={{
                          width: "90px",
                          padding: "8px",
                          fontSize: "16px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "bold",
                          color: "#2A3E4B",
                          borderRadius: "6px",
                          cursor: "pointer",
                          border: "2px solid #2A3E4B",
                        }}
                      >
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
}

export default JobListApplicant;
