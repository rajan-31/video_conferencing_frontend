// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router"

// const Home = () => {
// 	const [roomName, setRoomName] = useState("room101");
// 	const [name, setName] = useState("User 1");
// 	const [roomCreationResponse, setRoomCreationResponse] = useState("")

//     const navigate = useNavigate();

// 	const handleCreateRoom = async () => {
// 		const res = await axios.post(`/conference/media_server/room/create`, {
// 			room_name: roomName
// 		})

// 		setRoomCreationResponse(res.data);
// 	}

//     const handleJoinRoom = () => {
//         navigate(`/conference/${roomName}`);
//     }
//     return (
//         <main>
// 			<div className="mb-2 d-flex flex-row gap-2">
// 				<label htmlFor="name">User Name</label>
// 				<input type="text" name="name" id="name" value={name} 
// 					onChange={(e) => setName(e.target.value)}
// 				/>
// 			</div>
// 			<div className="mb-2 d-flex flex-row gap-2">
// 				<label htmlFor="room_name">Room ID</label>
// 				<input type="text" name="room_name" id="room_name" value={roomName} 
// 					onChange={(e) => setRoomName(e.target.value)}
// 				/>
// 			</div>
			
// 			<div className="d-flex flex-row gap-2">
// 				<button onClick={handleCreateRoom} className="btn btn-info">Create</button>
// 				<button onClick={handleJoinRoom} className="btn btn-info">Join</button>
// 			</div>

// 			<div>{roomCreationResponse}</div>			
// 		</main>
//     )
// }

// export default Home;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = useState<string>("room101");
  const [name, setName] = useState<string>("User 1");
  const [roomCreationResponse, setRoomCreationResponse] = useState<string>("");

  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const res = await axios.post(`/conference/media_server/room/create`, {
        room_name: roomName,
      });
      setRoomCreationResponse(res.data);
    } catch (error) {
      setRoomCreationResponse("Error creating room. Please try again.");
      console.error(error);
    }
  };

  const handleJoinRoom = () => {
    navigate(`/conference/${roomName}`);
  };

  return (
    <main>
      <form>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="room_name">Room ID</label>
          <input
            type="text"
            name="room_name"
            id="room_name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room ID"
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
