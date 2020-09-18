import React, { useState } from "react";

import axiosWithAuth from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

// STRETCH

const addColor = {
  color: "",
  code: { hex: ""}
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(addColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        updateColors(colors.map((col) => col.id === res.data.id ? res.data : col))
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(() => {
        updateColors(colors.filter((col) => col.id !== color.id))
      })
      .catch((err) => {
        console.log(err)
      })
  };

  // STRETCH

  const handleChange = e => {
    setColorToAdd({
      ...colorToAdd,
      code: {
        [e.target.name] : e.target.value
      }
    })
  }

  const handleColor = e => {
    setColorToAdd({
      ...colorToAdd,
      code: {
        [e.target.name] : e.target.value
      }
    })
  }

  const additionalColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', addColor)
      .then((res) => {
        updateColors(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* stretch - build another form here to add a color */}

      <div className="add-color">
        <form onSubmit={ additionalColor }>
          <label htmlFor="color">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Color Name"
              value={colorToAdd.color}
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="code">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="HEX Code"
              value={colorToAdd.code.hex}
              onChange={ handleColor }
            />
          </label>
          <button className="add-color-button" type="submit">Add New Color</button>
        </form>
      </div>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
