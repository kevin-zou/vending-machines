import { Timestamp } from 'firebase/firestore';

interface VendingMachine {
  id: string,
  coords: {
    lat: number,
    lng: number,
  },
  date: Timestamp,
  imageSrc: string,
  name: string,
  desc: string,
}
