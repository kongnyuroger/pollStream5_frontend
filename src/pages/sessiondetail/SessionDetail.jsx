import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api.js";
import StatusBadge from "../../components/StatusBadge.jsx";
import { useSocket } from "../../hooks/useSocket.js";
import { Link } from "react-router-dom";
import "./SessionDetail.css";

export default function SessionDetail() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("single-choice");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);
  const [selectedPollId, setSelectedPollId] = useState(null);

  const sessionId = useMemo(() => id, [id]);
  console.log(`session id from sessiondetail page is ${sessionId}`);
  const { socket, connected } = useSocket(sessionId);

  async function load() {
    try {
      const data = await api(`/api/host/sessions/${id}`);
      setSession(data.session);
      setPolls(data.polls || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    if (!socket) return;
    socket.on("pollPublished", (poll) => {
      if (String(poll.session_id) === String(id)) {
        setPolls((prev) => {
          const exists = prev.find((p) => p.id === poll.id);
          if (exists) {
            return prev.map((p) =>
              p.id === poll.id ? { ...poll, status: "published" } : p
            );
          }
          return [...prev, poll];
        });
      }
    });
    return () => {
      socket?.off("pollPublished");
    };
  }, [socket, id]);

  function setOptionValue(i, value) {
    const copy = [...options];
    copy[i] = value;
    setOptions(copy);
  }

  function addOption() {
    setOptions((o) => [...o, ""]);
  }

  function removeOption(i) {
    setOptions((o) => o.filter((_, idx) => idx !== i));
  }

  async function createPoll(e) {
    e.preventDefault();
    try {
      const payload = { question, type };
      if (type !== "open-ended") {
        payload.options = options.filter(Boolean);
      }
      await api(`/api/host/sessions/${id}/polls`, {
        method: "POST",
        body: payload,
      });
      setQuestion("");
      setType("single-choice");
      setOptions(["", ""]);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function publish(pollId) {
    try {
      await api(`/api/host/polls/${pollId}/publish`, { method: "PUT" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function close(pollId) {
    try {
      await api(`/api/host/polls/${pollId}/close`, { method: "PUT" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function viewResults(pollId) {
    try {
      const r = await api(`/api/host/polls/${pollId}/results`);
      setResults(r.results);
      console.log(r.results);
      setSelectedPollId(pollId);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!session) return <div className="card">Loading...</div>;

  return (
    <div className="session-detail">
      <div className="session-header">
        <h2>Session: {session.name}</h2>
        <span className="badge">code: {session.session_code}</span>

        {/* New link to participant join */}
        <Link
          to={`/participant?code=${session.session_code}`}
          className="join-link"
        >
          Invite Participants
        </Link>
      </div>

      <hr />
      <div className="create-poll">
        <h3>Create Poll</h3>
        <form className="form" onSubmit={createPoll}>
          <div>
            <label>Question</label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              placeholder="What should we build next?"
            />
          </div>
          <div>
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="single-choice">Single choice</option>
              <option value="multiple-choice">Multiple choice</option>
              <option value="open-ended">Open ended</option>
            </select>
          </div>
          {type !== "open-ended" && (
            <div className="options-card">
              <h4>Answer Options</h4>
              {options.map((opt, i) => (
                <div key={i} className="option-row">
                  <input
                    value={opt}
                    onChange={(e) => setOptionValue(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                  />
                  <button
                    className="link"
                    type="button"
                    onClick={() => removeOption(i)}
                  >
                    remove
                  </button>
                </div>
              ))}
              <button className="link" type="button" onClick={addOption}>
                + Add option
              </button>
            </div>
          )}
          <button>Create poll</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="polls">
        <h3>Polls</h3>
        {polls.map((p) => (
          <div key={p.id} className="poll-card">
            <h4>{p.question}</h4>
            <p>Type: {p.type}</p>
            <p>
              Status: <StatusBadge status={p.status} />
            </p>
            <div className="actions">
              {p.status === "draft" && (
                <button onClick={() => publish(p.id)}>Publish</button>
              )}
              {p.status === "published" && (
                <button onClick={() => close(p.id)}>Close</button>
              )}
              <button className="link" onClick={() => viewResults(p.id)}>
                Results
              </button>
            </div>
            {/* Display results under each poll */}
            {selectedPollId === p.id && results && (
              <div className="results-card">
                <h3>Results</h3>
                <ul>
                  {results.map((r, i) => (
                    <li key={i} className="result-item">
                      <span>{r.participant_name}</span>
                      <span>{r.email}</span>
                      <span>{r.option_text || r.response_data.text}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelectedPollId(null)}>Close</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
