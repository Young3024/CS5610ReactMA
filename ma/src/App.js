import React, { createContext, useContext, useState } from 'react';
import './App.css';

// Create a context for managing the grid state
const GridContext = createContext();

// Child component representing a single cell in the grid
const Cell = ({ id }) => {
  const { toggleCell } = useContext(GridContext);
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    toggleCell(id);
    setIsOn(!isOn);
  };

  return (
    <div
      className={`cell ${isOn ? 'on' : ''}`}
      onClick={handleClick}
    />
  );
};

// Parent component representing the grid and the counter
const Grid = () => {
  const [gridState, setGridState] = useState(Array(4).fill(false));

  const toggleCell = id => {
    const newGridState = [...gridState];
    newGridState[id] = !newGridState[id];
    setGridState(newGridState);
  };

  const countOnCells = () => {
    return gridState.filter(cell => cell).length;
  };

  return (
    <GridContext.Provider value={{ toggleCell }}>

      <h1 className="counter">
        Count: {countOnCells()}
      </h1>
      
      <div className="grid">
        {gridState.map((cell, index) => (
          <Cell key={index} id={index} />
        ))}
      </div>
      
    </GridContext.Provider>
  );
};

export default Grid;
