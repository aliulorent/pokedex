"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Card from './Card'
import SearchField from './SearchField';

function DataGrid({pokemon}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleList, setVisibleList] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [currentNumVisible, setCurrentNumVisible] = useState(0);
    const maxCount = 1008;

    useEffect(()=>{
        setFullList([... pokemon]);
        setVisibleList([... pokemon.slice(0, 50)]);
        setCurrentNumVisible(50);
    }, []);

    useEffect(()=>{
        setSearchList( fullList.filter(p=>p.name.includes(searchTerm.toLowerCase())) );
        console.log(visibleList);
    }, [searchTerm]);

    let displayRender;
    if (searchTerm.length > 0 && searchList.length === 0){
        // CONDITION: There is a search term but it cannot be found! Empty list!
        displayRender = <h2>{"Could not find search results!"}</h2>;
    }
    else if (searchTerm.length > 0 && searchList.length > 0 ){
        // CONDITION: Search term has been found! Return a list of results!
        displayRender = searchList.map(p =>(<Card pokemon={p} key={p.id}/>));
    }
    else if (searchTerm.length === 0) {
        // CONDITION: Nothing is being searched, display visibleList
        displayRender = visibleList.map(p =>(<Card pokemon={p} key={p.id}/>));
    }
    else {
        displayRender = <h2>{"Something has gone wrong! Please try again in a few minutes.."}</h2>;
    }

    //Infinite scrolling functionality
    const handleScroll = () =>{
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight >= scrollHeight - 600 && (pokemon.length < maxCount)) {
            document.removeEventListener('scroll', handleScroll);
            //Add on the next 50 pokemon to the visible list of pokemon
            setVisibleList([...visibleList, ...fullList.slice(visibleList.length, Math.min(visibleList.length + 50, maxCount - visibleList.length))]);
        }
    }
    //Readd the event listener once your visible list gets updated
    useEffect(()=>{
        document.addEventListener('scroll', handleScroll) 
    }, [visibleList])

  return (
    <>
        <input value={searchTerm} placeholder='Search for a Pokemon!' onChange={(event)=>setSearchTerm(event.target.value)}/>
        <div className='grid-container grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {/* {visibleList.map(p =>(<Card pokemon={p} key={p.id}/>))} */}
            {/* {searchTerm.length > 0 ? (fullList.filter(p=>p.name.includes(searchTerm)).map(i=>(<Card pokemon={p}/>))): visibleList.map(p =>(<Card pokemon={p}/>)) } */}
            {/* { searchList.length > 0 ? searchList.map(p =>(<Card pokemon={p} key={p.id}/>)) : visibleList.map(p =>(<Card pokemon={p} key={p.id}/>))} */}
            {displayRender}
        </div>
    </>
  )
}

export default DataGrid