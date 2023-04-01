import React, { useEffect, useState } from "react";
import Teams from "./Teams";
import httpApi from "../../api/domain/httpApi";
import "./ListTeam.css";
const ListTeams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchTeams = async () => {
      httpApi.get("Teams/AllTeamAsync").then((res) => {
        setTeams(res.data.data);
      });
    };
    fetchTeams();
  }, []);
  return (
    <div>
      <div className="bg">
        <h4>
          <span>Giảng viên</span>
        </h4>
      </div>
      <div className="Teams">
        {teams.map((team) => (
          <Teams key={team.maGv} team={team} />
        ))}
      </div>
    </div>
  );
};

export default ListTeams;
