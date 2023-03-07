import React from "react";
import ReactDOM from "react-dom";

const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
const exercises1 = 10;
const exercises2 = 7;
const exercises3 = 14;

const Header = () => {
 
  return <h1>{course.name}</h1>
}



const Content = () => {
  return (<div>{course.parts.map(user => (
    <div key={user.name}>
        <p>{user.name} {user.exercises}</p>
    </div>
)
)}
  </div>)
  
}

const Total = () => {
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Header/>
      <Content/>
      <Total/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
