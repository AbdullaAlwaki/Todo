import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Title = styled(Section)`
  justify-content: space-around;
  `


const List = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
   `

const Button = styled.button`
  background-color: #4CAF50;
  border: 1px solid black;
  border-left: none;
  color: white;
  padding: 14.5px 32px;
  font-size: large;
  `;
const Big = styled(Button)`
  width: 50%;
  background-color: red;
  color: white;
  `

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  `

const Input = styled.input`
  padding: 10px 10px;
  width: 40%;
  font-size: 25px;
  border: 1px solid black;
  border-right: none;
  `;

const Li = styled.li`
  list-style-type: none;
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  padding: 10px 10px;
  margin: 3%;
  margin-left: 30px;
  border: 1px solid black;
  `;

const H1 = styled.h1`
  font-size: 50px;
  text-align: center;
  `;
const H2 = styled(H1)`
  font-size: 30px;
  `;

function App() {

  const [tod, sett] = useState();
  const change = (e) => {
      sett(e.target.value);
  };

  const [gg, setTodo] = useState([]);
  const addTodo = (e) => {
    e.preventDefault();
    if (tod !== "" && tod !== undefined) {
    setTodo([...gg, tod]);
    sett("");
    } else {
      alert("Please enter a task or click on the button to delete the task");
    }
    console.log(gg);
  };

  const [fin, setFin] = useState([]);
  const addFin = (e) => {
    e.preventDefault();
    setFin( [...fin, e.target.value]);
    setTodo(gg.filter((item) => item !== e.target.value));
  };
  const cancel = (e) => {
    e.preventDefault();
    setFin(fin.filter((item) => item !== e.target.value));
    setTodo([...gg, e.target.value]);
  };

  const clear = (e) => {
    e.preventDefault();
    setFin([]);
  };
  return <Container >
    <H1>Todo App</H1>
    
    <Form>
      <Input type="text" onChange={change} placeholder={"Type here"} />
      <Button onClick={addTodo}>Add</Button>
    </Form>
      
    <Title>
      <H2>{gg.length} items left</H2>
      <H2> Already Done</H2>
    </Title>
    <Section>
    <List>
    <ul>
      {gg.map((todo ,i) => (
        <Li key={i+1} >{i+1}- {todo}<Button onClick={addFin} value={todo}>Done</Button></Li>
        ))}
        
    </ul>
    </List>
    
    <List>
    <ul>
      {fin.map((todo ,i) => (
        <Li key={i+1}>{i+1}- {todo} <Button onClick={cancel} value={todo}>cancel</Button></Li>
      ))}
    </ul>
    </List>
    </Section>
    
    <Big onClick={clear}>clear</Big>
  </Container>

}

export default App;
