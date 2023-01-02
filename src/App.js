import React, { useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import TextFile from '@mui/material/TextField';
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function App() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const handleClose = () => {
    setOpen(false)
  }




  const columns = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'url',
      label: 'url'
    }
  ]
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const names = data.map(pokemon => {
    let properties = {
      label: pokemon.name,
      value: pokemon.name
    }
    return properties;
  })

  async function getPokemones() {
    try {
      const pokemones = await axios.get('https://pokeapi.co/api/v2/pokemon')
      setData(pokemones.data.results)
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Button style={{ margin: '20px' }} onClick={getPokemones} variant="outlined">get data</Button>
        <Autocomplete
          style={{ margin: '20px' }}
          disablePortal
          id='autocomplete'
          options={names}
          sx={{ width: 300 }}
          renderInput={(params) => <TextFile {...params} label='Pokemones' />}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Pokemon
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`${name} is the name of the pokemon you shoose`}
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="App">
        <MUIDataTable
          style={{ margin: '20px' }}
          title={'pokemones'}
          data={data}
          columns={columns}
          options={{
            onRowClick: (rowData, rowMeta) => {
              const name = rowData[0]
              setName(name)
              setOpen(true)
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
