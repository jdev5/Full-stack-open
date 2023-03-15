import React from 'react'
import ReactDOM from 'react-dom'
import course from './components/course'



 
  const Header = () => <h1>Web development curriculum</h1>

  const Content = () => <h2>{course[0].name}</h2>

  const Part1 = () => {
    return(<div>
        {course[0].parts.map(value => <ul>{value.name + " " + value.exercises}</ul>)}
        Total of {course[0].parts.reduce((a, b) => a + b.exercises, 0)} exercises
    </div>)
}
  
  const Content1 = () => <h2>{course[1].name}</h2>

  const Part2 = () => {
    return(
    <div>
        {course[1].parts.map(value => <ul>{value.name + " " + value.exercises}</ul>)}
        Total of {course[1].parts.reduce((a,b) => a + b.exercises, 0)} exercises
        </div>
    )
  }

const App = () => {
  return(
    <div>
    <Header/>
    <Content/>
    <Part1/>
    <Content1/> 
    <Part2/>
    </div>
  )
}

ReactDOM.render(<App course={course} />, document.getElementById('root'))
