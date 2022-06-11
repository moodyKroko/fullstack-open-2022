export const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <div key={part.name}>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export const Total = ({ parts }) => {
  let total = 0;
  parts.forEach((part) => {
    total += part.exercises;
  });

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};
