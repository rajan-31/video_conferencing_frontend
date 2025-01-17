import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [roomName, setRoomName] = useState("room101");
  const [name, setName] = useState("User 1");
  const [roomCreationResponse, setRoomCreationResponse] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const res = await axios.post(`/conference/media_server/room/create`, {
      room_name: roomName,
    });

    setRoomCreationResponse(res.data);
  };

  const handleJoinRoom = () => {
    navigate(`/conference/${roomName}`);
  };

  return (
    <main>
      <form>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="room_name">Room Name</label>
          <input
            type="text"
            name="room_name"
            id="room_name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleCreateRoom}>
          Create Room
        </button>
        <button type="button" onClick={handleJoinRoom}>
          Join Room
        </button>
        <div className="room-response">{roomCreationResponse}</div>
      </form>
    </main>
  );
};

export default Home;
