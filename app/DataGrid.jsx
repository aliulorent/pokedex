"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Card from './Card'

function DataGrid({pokemon}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleList, setVisibleList] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const maxCount = 1008;

    useEffect(()=>{
        setFullList([... pokemon]);
        setVisibleList([... pokemon.slice(0, 50)]);
    }, []);

    useEffect(()=>{
        if (searchTerm.length > 0){
            setSearchList( [...fullList.filter(p=>p.name.includes(searchTerm.toLowerCase())) ]);
        }
    }, [searchTerm]);

    //Re-add the event listener once your visible list gets updated
    useEffect(()=>{
        document.addEventListener('scroll', handleScroll) 
    }, [visibleList]);

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
    const handleSelect = (p) =>{
        setSelectedPokemon(p);
        console.log(p);
    };

    let displayRender;
    if (searchTerm.length > 0 && searchList.length === 0){
        // CONDITION: There is a search term but it cannot be found! Empty list!
        displayRender = <h2>{"Could not find search results!"}</h2>;
    }
    else if (searchTerm.length > 0 && searchList.length > 0 ){
        // CONDITION: Search term has been found! Return a list of results!
        displayRender = searchList.map(p =>(<Card pokemon={p} key={p.id} handleSelect={handleSelect}/>));
    }
    else if (searchTerm.length === 0) {
        // CONDITION: Nothing is being searched, display visibleList
        displayRender = visibleList.map(p =>(<Card pokemon={p} key={p.id} handleSelect={handleSelect}/>));
    }
    else {
        displayRender = <h2>{"Something has gone wrong! Please try again in a few minutes.."}</h2>;
    }

  return (
    <div className='flex flex-col relative mx-2'>
        <input value={searchTerm} placeholder='Search for a Pokemon!' onChange={(event)=>setSearchTerm(event.target.value)} className='p-2 my-2 rounded-lg outline-none border border-blue-200 focus:border-blue-600 focus:text-gray-800 bg-slate-400/10 w-8/10'/>
        <div className='grid-container grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1'>
            {displayRender}
        </div>
    </div>
  )
}

export default DataGrid