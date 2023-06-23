"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Card from './Card'
import Selected from './Selected';

function DataGrid({pokemon}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleList, setVisibleList] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(()=>{
        setFullList(pokemon);
        setVisibleList(pokemon.slice(0, 50));
        console.log(`Loaded ${pokemon.length} pokemon!`);
    }, []);

    useEffect(()=>{
        if (searchTerm.length > 0){
            setSearchList( fullList.filter(p=>p.name.includes(searchTerm.toLowerCase())));
        }
    }, [searchTerm]);

    //Re-add the event listener once your visible list gets updated
    useEffect(()=>{
        document.addEventListener('scroll', handleScroll) 
        console.log(visibleList.length);
    }, [visibleList]);

    //Infinite scrolling functionality
    const handleScroll = () =>{
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        //if (scrollHeight + scrollTop >= clientHeight + 50 && (visibleList.length < fullList.length)) {
        if (scrollTop + clientHeight >= scrollHeight - 600 && (visibleList.length < pokemon.length)) {
            console.log("Triggered Scroll Function");
            document.removeEventListener('scroll', handleScroll);
            //Add on the next 50 pokemon to the visible list of pokemon
            setVisibleList([...visibleList, ...fullList.slice(visibleList.length, Math.min(visibleList.length + 50, visibleList.length + (fullList.length - visibleList.length)))]);
            //setVisibleList(visibleList.concat(fullList.slice(visibleList.length, Math.min(visibleList.length + 50, pokemon.length - visibleList.length))));
        }
    }
    const handleSelect = (p) =>{
        setSelectedPokemon(p);
        console.log(p);
    };
    const closeSelect = () =>{
        setSelectedPokemon(null);
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
    let renderSelect;
    if (selectedPokemon){
        renderSelect = <Selected pokemon={selectedPokemon} close = {closeSelect}/>
    }
    else{
        renderSelect = null;
    }

  return (
    <div className={`flex flex-col relative mx-2`}>
        {renderSelect}
        <input value={searchTerm} placeholder='Search for a Pokemon!' onChange={(event)=>setSearchTerm(event.target.value)} className='p-2 my-2 rounded-lg outline-none border border-blue-200 focus:border-blue-600 focus:text-gray-800 bg-slate-400/10 w-8/10'/>
        <div className={`grid-container grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1  ${selectedPokemon ? "filter blur-lg" : ""}`}>
            {displayRender}
        </div>
        <button className={`${(visibleList < fullList && searchTerm.length === 0) ? "" : "hidden"}`} onClick={()=>handleScroll()}>Load More...</button>
    </div>
  )
}

export default DataGrid