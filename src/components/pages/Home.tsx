import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

const Home = () => {
	const [roomName, setRoomName] = useState("room101");
	const [name, setName] = useState("User 1");
	const [roomCreationResponse, setRoomCreationResponse] = useState("")

    const navigate = useNavigate();

	const handleCreateRoom = async () => {
		const res = await axios.post(`/conference/media_server/room/create`, {
			room_name: roomName
		})

		setRoomCreationResponse(res.data);
	}

    const handleJoinRoom = () => {
        navigate(`/conference/${roomName}`);
    }
    return (
        <main>
			<div className="mb-2 d-flex flex-row gap-2">
				<label htmlFor="name">Room Name</label>
				<input type="text" name="name" id="name" value={name} 
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="mb-2 d-flex flex-row gap-2">
				<label htmlFor="room_name">Room Name</label>
				<input type="text" name="room_name" id="room_name" value={roomName} 
					onChange={(e) => setRoomName(e.target.value)}
				/>
			</div>
			
			<div className="d-flex flex-row gap-2">
				<button onClick={handleCreateRoom} className="btn btn-info">Create</button>
				<button onClick={handleJoinRoom} className="btn btn-info">Join</button>
			</div>

			<div>{roomCreationResponse}</div>			
		</main>
    )
}

export default Home;