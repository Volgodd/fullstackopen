
  const Header = ({title}) => {

    return (
      <h1>{title}</h1>
   )
  }
  
  const Part = ({name, exercises}) => {
  
   return ( 
    <p>
      {name} - {exercises}
    </p>)
  }
  
  const Content = ({parts}) => {

    return (
      <div>
        {parts.map(part => 
          <Part name={part.name} exercises={part.exercises} key={part.id}/>)}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const arrOfNumbers = parts.map(part => part.exercises)
    const redusedExercises = arrOfNumbers.reduce((x, y) => x + y)
  
    return (
      <h4> total of {redusedExercises} exercises </h4>
    )
  }

const Course = ({courses}) => {

  return (
    <>
      <h1>Web development curriculum</h1>
        {courses.map(course => {
          const { name, id, parts } = course;

          return(
            <div key={id}>
              <Header title={name} />
              <Content parts={parts}/>
              <Total parts={parts}/>
            </div>
          )}
        )}
    </>
)
}

export default Course;