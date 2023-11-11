import FoodPanel from './FoodPanel';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
    <Link to={"/search"}><h2>Search for Foods!</h2></Link>
    <FoodPanel />
    </div>
    );
}