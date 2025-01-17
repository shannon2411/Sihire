import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarGA from "../components/sidebar-ga";

function DetailInterviewGA() {
  const [interview, setInterview] = useState(null);
  const { id } = useParams();
  function formatTime(datetimeString) {
    const dateTime = new Date(datetimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  function formatDateTime(datetimeString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  }
  const rectangleStyle = {
    width: "70%",
    height: "550px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginLeft: "22%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop: "-19%",
  };
  useEffect(() => {
    const getInterview = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/interview/get-interview/${id}/`
        );
        const data = await response.json();
        setInterview(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    getInterview();
  }, [id]);

  return (
    <React.Fragment>
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
          marginTop: "12px",
        }}
      >
        Wawancara
      </p>
      <SidebarGA />
      <Link to="/get-list-interview-ga">
        <p
          style={{
            marginLeft: "22%",
            position: "absolute",
            marginTop: "-320px",
          }}
        >
          List Wawancara
        </p>
      </Link>
      <p
        style={{ marginLeft: "30%", position: "absolute", marginTop: "-320px" }}
      >
        {">"}
      </p>
      {interview && (
        <React.Fragment key={interview.id}>
          <Link to={`/get-list-interview-ga/${id}`}>
            <p
              style={{
                marginLeft: "31%",
                position: "absolute",
                marginTop: "-320px",
              }}
            >
              {interview.job_application_id.job.job_name}
            </p>
          </Link>
          <div className="detail-interview-ga">
            <div className="rectangle-style" style={rectangleStyle}>
              <p
                style={{
                  marginTop: "40px",
                  marginLeft: "5%",
                  fontWeight: "bold",
                  fontSize: "32px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                {interview.job_application_id.applicant.user.name} -{" "}
                {interview.job_application_id.job.job_name}
              </p>
              <p
                style={{
                  marginTop: "100px",
                  marginLeft: "5%",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                Status
              </p>
              <div
                style={{
                  marginTop: "140px",
                  marginLeft: "5%",
                  color: "#fff",
                  background: "#2A3E4B",
                  fontSize: "12px",
                  width: "100px",
                  height: "40px",
                  border: "2px solid #fff",
                  borderRadius: "90px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  textAlign:"center"
                }}
              >
                {interview.confirm}
              </div>
              <p
                style={{
                  marginTop: "200px",
                  marginLeft: "5%",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                Jadwal Interview
              </p>
              <p
                style={{
                  marginTop: "240px",
                  marginLeft: "5%",
                  fontSize: "16px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                Hari/Tanggal :{" "}
                {interview.datetime_start &&
                  formatDateTime(interview.datetime_start)}
              </p>
              <p
                style={{
                  marginTop: "270px",
                  marginLeft: "5%",
                  fontSize: "16px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                Waktu :{" "}
                {interview.datetime_start &&
                  formatTime(interview.datetime_start)}{" "}
                - {interview.datetime_end && formatTime(interview.datetime_end)}
              </p>
              <p
                style={{
                  marginTop: "300px",
                  marginLeft: "5%",
                  fontSize: "16px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                Pewawancara : {interview.interviewer_user_id?.name}
              </p>
              <p
                style={{
                  marginTop: "350px",
                  marginLeft: "5%",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                Alasan
              </p>
              <p
                style={{
                  marginTop: "390px",
                  marginLeft: "5%",
                  fontSize: "16px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                {interview.reschedule_comment}
              </p>
              <Link to={`/get-list-interview-ga/${id}/update`}>
                <button
                  style={{
                    width: "10%",
                padding: "8px",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
                color: "#fff",
                background: "#2A3E4B",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "480px",
                border: "2px solid #2A3E4B",
                marginLeft: "57%",
                position: "absolute",
                  }}
                >
                  Ubah Jadwal
                </button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default DetailInterviewGA;
