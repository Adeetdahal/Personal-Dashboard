import './App.css';
import WeatherWidget from './WeatherWidget';

function App() {
  return (
    <div className="bg-red-500">
      <WeatherWidget cityName="Sydney" countryCode="AU"/>
    </div>
  );
}

export default App;
