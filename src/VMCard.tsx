import { VendingMachine } from './types';
import './VMCard.css';

type VMCardProps = {
  vendingMachine: VendingMachine,
  goTo: () => void,
}

export default function VMCard(props: VMCardProps) {
  const { imageSrc, name, desc } = props.vendingMachine;

  return (
    <div className='card' onClick={props.goTo}>
      <img src={imageSrc} height='200px' />
      <h2>{name}</h2>
      <p>{desc}</p>
    </div>
  )
}
