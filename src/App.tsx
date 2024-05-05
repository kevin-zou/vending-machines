import { ReactNode, useEffect, useState } from 'react';
import { Marker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import { Map } from 'leaflet';
import VMCard from './VMCard';

import './App.css';
import { getVendingMachines } from './firebase';
import { VendingMachine } from './types';

function App() {
  const [leaflet, setLeaflet] = useState<Map>();
  const [vendingMachines, setVendingMachines] = useState<VendingMachine[]>([]);

  useEffect(() => {
    async function awaitVendingMachines() {
      const vendingMachines = await getVendingMachines();
      vendingMachines.sort((a, b) => a.date.seconds - b.date.seconds);
      setVendingMachines(vendingMachines);
    }
    awaitVendingMachines();
  }, []);

  function Markers(): ReactNode {
    return vendingMachines.map((vm) => {
      return (
        <Marker key={vm.id} position={vm.coords}>
          <Popup>
            <img src={vm.imageSrc} height='100px' />
            <div>{vm.name}</div>
          </Popup>
        </Marker>
      )
    });
  }

  function VMCards(): ReactNode {
    return vendingMachines.map((vm) => {
      return (
        <VMCard
          key={vm.id}
          vendingMachine={vm}
          goTo={() => {
            if (leaflet) {
              leaflet.flyTo(vm.coords);
              leaflet.closePopup(); // Close any open popups
            }
          }}
        />
      )
    });
  }

  // Thanks Stack Overflow https://stackoverflow.com/a/15092318
  function MapInitializer() {
    const map = useMap();
    setLeaflet(map);
    map.invalidateSize();
    return null;
  }

  return (
    <>
      <div className='header'>
        <img height='150px' src='/icon.png' />
        <div>
          <h1>vending machines</h1>
          <p>every unique vending machine I came across in Japan, mapped</p>
        </div>
      </div>
      {vendingMachines.length &&
        <div className='container'>
          <div className='sidebar'>
            <VMCards />
          </div>
          <MapContainer center={vendingMachines[0].coords} zoom={13}>
            <MapInitializer />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Markers />
          </MapContainer>
        </div>
      }
      <div className='footer'>
        <div>
          <a
            href='https://github.com/kevin-zou/project-a-week/tree/main/04_vending_machines'
            target='_blank'
          >
            source code
          </a>
        </div>
        <div>
          illustration by <a href='https://www.shigureni.com/' target='_blank'>shigureni</a>
        </div>
      </div>
    </>
  );
}

export default App
