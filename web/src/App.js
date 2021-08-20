import TextField from "@material-ui/core/TextField"
import React, { useEffect, useState } from "react"
import Axios from 'axios'
// import{ io } from "socket.io-client"
import "./App.css"

const io = require("socket.io-client")
const socket = io("http://localhost:4000")

function App() {
	const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])



	useEffect(
		
		() => {
// Axios.get('http://localhost:4000')
// .then(



// ).catch(error=>console.log(error))

	
socket.on('connect', data=>{
console.log("Works fine!")
})
socket.on("message", ({ name, message }) => {
	setChat([ ...chat, { name, message } ])
})
		
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {

		const { name, message } = state

		socket.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
				</div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>
	)
}

export default App

