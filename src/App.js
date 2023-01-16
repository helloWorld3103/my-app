import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import TextFile from '@mui/material/TextField';
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import PokemonModal from './components/modal';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';


function App() {
  const [data, setData] = useState([])
  const [openErrorDialog, setOpenErrorDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [name, setName] = useState('')

  const handleClose = () => {
    setOpenErrorDialog(false)
  }
  const handleCloseAlert = () => {
    setOpenAlert(false)
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
  const namesAlert = ['bulbasaur', 'charmeleon', 'squirtle']

  const notChoosePokemon = (name) => {
    if (namesAlert.includes(name)) {
      setOpenAlert(true)
    } else {
      setOpenErrorDialog(true)
    }
  }

  const names = data.map(pokemon => {
    let properties = {
      label: pokemon.name,
      value: pokemon.name
    }
    return properties;
  })
  useEffect(() => {

    getPokemones()

  }, [])

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
        <Autocomplete
          style={{ margin: '20px' }}
          disablePortal
          id='autocomplete'
          options={names}
          sx={{ width: 300 }}
          renderInput={(params) => <TextFile {...params} label='Pokemones' />}
        />
        <PokemonModal
          name={name}
          open={openErrorDialog}
          handleClose={handleClose}
        >

        </PokemonModal>
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
              notChoosePokemon(name)
            }
          }}
        />
        <Box sx={{ width: '100%' }}>
          <Collapse in={openAlert}>
            <Alert severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenErrorDialog(handleCloseAlert);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {name} cannot be displayed
            </Alert>
          </Collapse>

        </Box>
      </div>
    </div>
  );
}

export default App;
