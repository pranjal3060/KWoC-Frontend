import { useEffect, useState } from "react";
import { makeRequest } from "../util/backend";
import { IEndpointTypes } from "../util/types";
import { useAuthContext } from "../util/auth";

function ProjectStats() {
  const authContext = useAuthContext();
  const [projectStats, setProjectStats] = useState<
    IEndpointTypes["stats/projects"]["response"] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    makeRequest("stats/projects", "get", null, authContext.jwt)
      .then((response) => {
        if (response.is_ok) {
          setProjectStats(response.response);
        } else {
          setError("Error fetching project stats.");
          console.log(response.response);
        }
      })
      .catch((e) => {
        setError("Error fetching project stats.");
        console.log(e);
      });
  }, []);  

  return (
    <div className="flex flex-col items-center pt-28">
      <h1 className="font-display text-5xl md:text-7xl font-bold text-center">
        Project Stats
      </h1>
      {error !== null ? (
        <p className="text-center text-red-500">{error}</p>
      ) : projectStats !== null ? (
        <div className="max-w-7xl px-8 py-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Repository Link</th>
                <th>Commit Count</th>
                <th>Pull Count</th>
                <th>Lines Added</th> 
                <th>Lines Removed</th> 
                <th>Languages Used</th>
              </tr>
            </thead>
            <tbody>
              {projectStats.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.repo_link}</td>
                  <td>{project.commit_count}</td>
                  <td>{project.pull_count}</td>
                  <td>{project.lines_added}</td>
                  <td>{project.lines_removed}</td>
                  <td>{project.languages_used.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectStats;