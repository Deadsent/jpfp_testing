import React, {useState, useEffect} from 'react';
import axios from 'axios';

/* 
    This is you entry point for your routes
*/


const Campuses = ({campuses}) => {
    return (
      <div>
        <li>
          {campuses.map((campus) => {
            return <ul key={campus.id}>{campus}</ul>;
          })}
        </li>
      </div>
    );
}

const Main = () => {
    const [campuses, setCampuses] = useState([])

    const fetchCampuses = async () => {
        const {data} = await axios.get("/api/campuses")
        console.log(data)
        setCampuses(data)
    }

    useEffect(() => {
        fetchCampuses()
    }, [])    

    return (
        <div>
            <Campuses campuses={campuses}/>
        </div>
    );
};

export default Main;