import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from '../utils/axiosWithAuth'


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const params = useParams()

  const fetchColors = () => {
    axiosWithAuth()
      .get('colors')
      .then((res) => {
        console.log(res.data)
        setColorList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchColors(params.id)
  }, [params.id])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
