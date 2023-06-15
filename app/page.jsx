import React from 'react'
import DataGrid from './DataGrid';

async function getData(){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=700`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const simpleList = await res.json();
  let promiseArray = [];
  for (let i =0;i<simpleList.results.length; i++){
    if (simpleList.results[i].url){
      promiseArray.push(fetch(simpleList.results[i].url).then(r => r.json()));
    }
  }
  const list = await Promise.all(promiseArray);
  return list;
}

async function Page() {
  let pokemonList = await getData();
  return (
    <div>
      <DataGrid pokemon={pokemonList}/>
    </div>
  )
}

export default Page