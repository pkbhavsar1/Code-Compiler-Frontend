import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Accordion, Container, Row} from 'react-bootstrap';

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    const { data } = await axios.post("http://localhost:5000/run", payload);
    setOutput(data.output);
    console.log(output);
  };

  return (
    <Container>
      <Row className="mt-3">
        <h1 className="display-1 text-center shadow p-3 bg-body rounded mb-5">Online Code Compiler</h1>
      </Row>
      <Row >
        <select
        style={{padding: 10, border:"none"}}
        className="shadow p-3 bg-body rounded"
        // value={language}
        onChange={
          (e)=>{
            setLanguage(e.target.value);
            console.log(e.target.value);
          }
        }>
          <option>Select Language</option>
          <option value="cpp">C++</option>
          {/* <option value="py">Python</option> */}
        </select>
      </Row>
      <br/>
      <Row>
      <textarea
        className="rounded"
        style={{border:"none", background: "black", color:"white", fontSize:20}}
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      </Row>
      <br></br>
      <Row>
        <button className="btn btn-lg btn-success" onClick={handleSubmit}>Submit</button>
      </Row>
      <Row>
        <Accordion alwaysOpen>
          <Accordion.Header>OUTPUT:</Accordion.Header>
          <Accordion.Body>{output}</Accordion.Body>
        </Accordion>
      </Row>
    </Container>
  );
}

export default App;
