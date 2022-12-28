import React,{useState} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import './App.css';

function App() {
  const [data,setData]=useState([])
  const columns=[
    {
      name: 'name',
      label: 'Name'
    },
    {
      name:'url',
      label:'url'
    }
      ]

  async function getPokemones(){
    try{
    const pokemones = await axios.get('https://pokeapi.co/api/v2/pokemon')
    console.log('poke', pokemones.data.results)
    setData(pokemones.data.results)
    console.log('data',data)
    }
    catch(error){
      console.error(error);
    }
  }
  return (
    <div className="App">
            <Button onClick={getPokemones} variant="outlined">Primary</Button>
            <MUIDataTable
            title={'pokemones'}
            data={data}
            columns={columns}
            />
    </div>
  );
}

export default App;
