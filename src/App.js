import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useEffect, useState } from 'react'
import "./app.css"

function App() {
  
  const [isLoading, setisLoading] = useState(true)
  const [userID, setuserID] = useState("")
  const [userIP, setuserIP] = useState("")
  const [userName, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const [users, setusers] = useState([])
  const [credit, setcredit] = useState({creditStatus: "none", user: []})

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setisLoading(false)
        setuserID(result.visitorId)
        });
    fetch("https://geolocation-db.com/json/")
        .then(res => res.json())
        .then(data => setuserIP(data.IPv4))
        .catch((e) => (console.log("failed geolocation")))
    fetch("https://userauth-backend.herokuapp.com/users/all")
        .then(res => res.json())
        .then(data => (setusers(data)))
        .catch((e) => (console.log(e)))
    
  }, []);

  const handleSubmit = (event) =>{
    event.preventDefault()

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"username" : userName, "password": password, "fingerprint" : userID})
    }

    fetch("https://userauth-backend.herokuapp.com/users/add", requestOptions)
      .then(async res => console.log(await res.json()))
      .catch(e => console.log(e))
  }

  const ipClickHandler = (event) => {
    var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
    setuserIP(ip)
  }

  const idClickHandler = (event) => {
    var id = Math.random().toString(36).substring(2);
    setuserID(id)
  }

  const creditClickHandler = (event) =>{
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"ipaddr" : userIP, "fingerprint" : userID})
    }

    fetch("https://userauth-backend.herokuapp.com/fraud/check", requestOptions)
      .then(async res => setcredit(await res.json()))
      .catch(e => console.log(e))
  }


  return (
    <div className="App">
      <h1>Fraud Detector</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} />
          <br/>
          <label>Password:</label>
          <input type="text" value={password} onChange={(e) => setpassword(e.target.value)} />
          <br/>
          <input type="submit" value="Submit"/>
        </form>
          {userName !== "" ? <p>{userName}</p>: <p>"Username Here"</p>}
      </div>

      <h4> User fingerprint is: {isLoading ? "Loading" : userID}</h4>
      <h4>User IP is: {userIP ? userIP : "userIP Here"}</h4>
      <button onClick = {idClickHandler}>Scramble browser fingerprint</button>
      <button onClick = {ipClickHandler}>Scramble IP</button>
      <p>{credit.creditStatus === "none" ? "click to get free credit" : credit.creditStatus }</p>
      {credit.user.length > 0 &&  credit.user[0].join(" - ")}
      <button onClick = {creditClickHandler}>Get Free Credit</button>
    </div>
  );
}

export default App;
