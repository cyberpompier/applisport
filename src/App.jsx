import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentData, setEquipmentData] = useState([
    { id: 1, name: 'Tuyau d\'incendie (50m)', category: 'Tuyaux', status: 'En service', image: 'https://via.placeholder.com/350x150/3498db/ffffff?text=Tuyau', vehicle: 'Camion 1' },
    { id: 2, name: 'Lance à incendie (Jet réglable)', category: 'Lances', status: 'En service', image: 'https://via.placeholder.com/350x150/e74c3c/ffffff?text=Lance', vehicle: 'Camion 1' },
    { id: 3, name: 'Hache de pompier', category: 'Outils', status: 'En service', image: 'https://via.placeholder.com/350x150/95a5a6/ffffff?text=Hache', vehicle: 'Camion 2' },
    { id: 4, name: 'Extincteur (Poudre ABC)', category: 'Extincteurs', status: 'En service', image: 'https://via.placeholder.com/350x150/f39c12/ffffff?text=Extincteur', vehicle: 'Camion 2' },
    { id: 5, name: 'Casque de pompier', category: 'Équipement de protection', status: 'En service', image: 'https://via.placeholder.com/350x150/34495e/ffffff?text=Casque', vehicle: 'Camion 1' },
    { id: 6, name: 'Gants de protection', category: 'Équipement de protection', status: 'En service', image: 'https://via.placeholder.com/350x150/2ecc71/ffffff?text=Gants', vehicle: 'Camion 2' },
    { id: 7, name: 'Détecteur de fumée', category: 'Détection', status: 'En service', image: 'https://via.placeholder.com/350x150/1abc9c/ffffff?text=Détecteur', vehicle: 'Camion 1' },
    { id: 8, name: 'Lampe torche', category: 'Éclairage', status: 'En service', image: 'https://via.placeholder.com/350x150/f1c40f/ffffff?text=Lampe', vehicle: 'Camion 2' },
    { id: 9, name: 'Corde d\'escalade (30m)', category: 'Cordes', status: 'En service', image: 'https://via.placeholder.com/350x150/e67e22/ffffff?text=Corde', vehicle: 'Camion 1' },
    { id: 10, name: 'Scie circulaire', category: 'Outils', status: 'En service', image: 'https://via.placeholder.com/350x150/7f8c8d/ffffff?text=Scie', vehicle: 'Camion 2' },
  ]);

  const [vehicles, setVehicles] = useState(['Camion 1', 'Camion 2']);
  const [newVehicleName, setNewVehicleName] = useState('');
  const [vehicleNameError, setVehicleNameError] = useState('');

  const [newEquipment, setNewEquipment] = useState({
    name: '',
    category: 'Outils',
    vehicle: 'Camion 1',
    image: '',
  });
  const [equipmentNameError, setEquipmentNameError] = useState('');

  const [sortBy, setSortBy] = useState('name');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleStatusChange = (id) => {
    const item = equipmentData.find(item => item.id === id);
    const newStatus = item.status === 'En service' ? 'Hors service' : 'En service';
    const confirmation = window.confirm(`Êtes-vous sûr de vouloir changer l'état de "${item.name}" à "${newStatus}"?`);

    if (confirmation) {
      setEquipmentData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleVehicleChange = (id, vehicle) => {
    setEquipmentData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, vehicle: vehicle } : item
        )
      );
  };

  const handleNewEquipmentChange = (event) => {
    setNewEquipment({ ...newEquipment, [event.target.name]: event.target.value });
  };

  const handleAddEquipment = () => {
    if (!newEquipment.name) {
      setEquipmentNameError("Le nom de l'équipement est requis.");
      return;
    } else {
      setEquipmentNameError("");
    }

    const nextId = equipmentData.length > 0 ? Math.max(...equipmentData.map(item => item.id)) + 1 : 1;
    setEquipmentData([...equipmentData, { ...newEquipment, id: nextId, status: 'En service' }]);
    setNewEquipment({
      name: '',
      category: 'Outils',
      vehicle: 'Camion 1',
      image: '',
    });
  };

  const filteredEquipment = equipmentData.filter(item => {
    const categoryMatch = activeCategory === 'Tous' || item.category === activeCategory;
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const noResults = filteredEquipment.length === 0 && searchTerm !== '';
  const noEquipment = filteredEquipment.length === 0 && searchTerm === '';

  const getVehicleEquipmentCount = (vehicle) => {
    return equipmentData.filter(item => item.vehicle === vehicle).length;
  };

  const handleAddVehicle = () => {
    if (!newVehicleName) {
      setVehicleNameError("Le nom du véhicule est requis.");
      return;
    } else if (vehicles.includes(newVehicleName)) {
      setVehicleNameError("Ce véhicule existe déjà.");
      return;
    } else {
      setVehicleNameError("");
    }

    if (newVehicleName) {
      setVehicles([...vehicles, newVehicleName]);
      setNewVehicleName('');
    }
  };

  const handleDeleteVehicle = (vehicleToDelete) => {
    const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer le véhicule "${vehicleToDelete}" ? Le matériel sera réaffecté au premier véhicule.`);
    if (confirmation) {
      if (vehicles.length > 1) {
        setEquipmentData(prevData =>
          prevData.map(item =>
            item.vehicle === vehicleToDelete ? { ...item, vehicle: vehicles[0] } : item
          )
        );
        setVehicles(vehicles.filter(vehicle => vehicle !== vehicleToDelete));
      } else {
        alert("Vous devez avoir au moins un véhicule.");
      }
    }
  };

  const getDefaultImage = (category) => {
    switch (category) {
      case 'Tuyaux': return 'https://via.placeholder.com/350x150/3498db/ffffff?text=Tuyau';
      case 'Lances': return 'https://via.placeholder.com/350x150/e74c3c/ffffff?text=Lance';
      case 'Outils': return 'https://via.placeholder.com/350x150/95a5a6/ffffff?text=Outil';
      case 'Extincteurs': return 'https://via.placeholder.com/350x150/f39c12/ffffff?text=Extincteur';
      case 'Équipement de protection': return 'https://via.placeholder.com/350x150/34495e/ffffff?text=Équipement';
      case 'Détection': return 'https://via.placeholder.com/350x150/1abc9c/ffffff?text=Détecteur';
      case 'Éclairage': return 'https://via.placeholder.com/350x150/f1c40f/ffffff?text=Éclairage';
      case 'Cordes': return 'https://via.placeholder.com/350x150/e67e22/ffffff?text=Corde';
      default: return 'https://via.placeholder.com/350x150/cccccc/ffffff?text=Matériel';
    }
  };

  const equipmentCategories = ['Tuyaux', 'Lances', 'Outils', 'Extincteurs', 'Équipement de protection', 'Détection', 'Éclairage', 'Cordes'];

  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    } else if (sortBy === 'vehicle') {
      return a.vehicle.localeCompare(b.vehicle);
    }
    return 0;
  });

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Nom', 'Catégorie', 'Véhicule', 'État'];
    csvRows.push(headers.join(','));

    sortedEquipment.forEach(item => {
      const values = [item.name, item.category, item.vehicle, item.status];
      csvRows.push(values.join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'materiel.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const lines = csvData.split('\n');
      const headers = lines[0].split(',');
      const newData = [];

      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(',');
        if (data.length === headers.length) {
          const item = {
            id: equipmentData.length > 0 ? Math.max(...equipmentData.map(item => item.id)) + i : i,
            name: data[0],
            category: data[1],
            vehicle: data[2],
            status: data[3],
            image: getDefaultImage(data[1]),
          };
          newData.push(item);
        }
      }
      setEquipmentData([...equipmentData, ...newData]);
    };

    reader.readAsText(file);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="profile-icon">+</div>
          <div className="notification-icon">3</div>
        </div>
        <p>Gestion du matériel</p>
        <h1>Camion de pompiers</h1>
        <div className={`search-bar ${noResults ? 'search-bar-no-results' : ''}`}>
          <span>Q</span>
          <input
            type="text"
            placeholder="Rechercher du matériel"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {noResults && <span className="no-results-message">Aucun résultat</span>}
        </div>
        <div className="category-filters">
          <button
            className={activeCategory === 'Tous' ? 'active' : ''}
            onClick={() => handleCategoryClick('Tous')}
          >
            Tous
          </button>
          <button
            className={activeCategory === 'Tuyaux' ? 'active' : ''}
            onClick={() => handleCategoryClick('Tuyaux')}
          >
            Tuyaux
          </button>
          <button
            className={activeCategory === 'Lances' ? 'active' : ''}
            onClick={() => handleCategoryClick('Lances')}
          >
            Lances
          </button>
          <button
            className={activeCategory === 'Outils' ? 'active' : ''}
            onClick={() => handleCategoryClick('Outils')}
          >
            Outils
          </button>
          <button
            className={activeCategory === 'Extincteurs' ? 'active' : ''}
            onClick={() => handleCategoryClick('Extincteurs')}
          >
            Extincteurs
          </button>
          <button
            className={activeCategory === 'Équipement de protection' ? 'active' : ''}
            onClick={() => handleCategoryClick('Équipement de protection')}
          >
            Équipement
          </button>
          <button
            className={activeCategory === 'Détection' ? 'active' : ''}
            onClick={() => handleCategoryClick('Détection')}
          >
            Détection
          </button>
          <button
            className={activeCategory === 'Éclairage' ? 'active' : ''}
            onClick={() => handleCategoryClick('Éclairage')}
          >
            Éclairage
          </button>
           <button
            className={activeCategory === 'Cordes' ? 'active' : ''}
            onClick={() => handleCategoryClick('Cordes')}
          >
            Cordes
          </button>
        </div>
        <div className="vehicle-counts">
          {vehicles.map(vehicle => (
            <span key={vehicle}>{vehicle}: {getVehicleEquipmentCount(vehicle)}</span>
          ))}
        </div>
      </header>

      <section className="vehicles-section">
        <h2>Véhicules</h2>
        <div className="add-vehicle">
          <input
            type="text"
            placeholder="Nom du nouveau véhicule"
            value={newVehicleName}
            onChange={(e) => setNewVehicleName(e.target.value)}
          />
          <button onClick={handleAddVehicle} className="add-vehicle-button">Ajouter un véhicule</button>
          {vehicleNameError && <div className="form-error">{vehicleNameError}</div>}
        </div>
        <div className="vehicle-list">
          {vehicles.map(vehicle => (
            <div className="vehicle-card" key={vehicle}>
              <h3>{vehicle}</h3>
              <ul>
                {equipmentData.filter(item => item.vehicle === vehicle).map(item => (
                  <li key={item.id}>
                    {item.name} (<span className={`status ${item.status === 'En service' ? 'status-en-service' : 'status-hors-service'}`}>{item.status}</span>)
                  </li>
                ))}
              </ul>
              <button onClick={() => handleDeleteVehicle(vehicle)} className="delete-vehicle-button">Supprimer</button>
            </div>
          ))}
        </div>
      </section>

      <section className="add-equipment-section">
        <h2>Ajouter un équipement</h2>
        <div className="add-equipment-form">
          <input
            type="text"
            name="name"
            placeholder="Nom de l'équipement"
            value={newEquipment.name}
            onChange={handleNewEquipmentChange}
          />
          {equipmentNameError && <div className="form-error">{equipmentNameError}</div>}
          <select
            name="category"
            value={newEquipment.category}
            onChange={handleNewEquipmentChange}
          >
            {equipmentCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            name="vehicle"
            value={newEquipment.vehicle}
            onChange={handleNewEquipmentChange}
          >
            {vehicles.map(vehicle => (
              <option key={vehicle} value={vehicle}>{vehicle}</option>
            ))}
          </select>
          <input
            type="text"
            name="image"
            placeholder="URL de l'image (facultatif)"
            value={newEquipment.image}
            onChange={handleNewEquipmentChange}
          />
          <button onClick={handleAddEquipment} className="add-equipment-button">Ajouter</button>
        </div>
      </section>

      <section className="equipment-cards">
        <h2>Matériel</h2>
        <div className="data-management">
          <div className="sort-options">
            <label htmlFor="sort">Trier par:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Nom</option>
              <option value="category">Catégorie</option>
              <option value="vehicle">Véhicule</option>
            </select>
          </div>
          <div className="data-buttons">
            <button onClick={exportToCSV} className="export-button">Exporter en CSV</button>
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="import-button"
            />
          </div>
        </div>
        {noEquipment ? (
          <div className="no-equipment-message">Aucun équipement disponible pour cette catégorie.</div>
        ) : (
          sortedEquipment.map(item => (
            <div className={`equipment-card ${item.status === 'Hors service' ? 'equipment-card-hors-service' : ''}`} key={item.id}>
              <h3>{item.name}</h3>
              <div className="card-image">
                <img src={item.image ? item.image : getDefaultImage(item.category)} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src=getDefaultImage(item.category)}}/>
              </div>
              <div className="card-footer">
                <span>Catégorie: {item.category}</span>
                <span>Véhicule: {item.vehicle}</span>
                <span className={`status ${item.status === 'En service' ? 'status-en-service' : 'status-hors-service'}`}>
                  État: {item.status}
                </span>
                <select
                  value={item.vehicle}
                  onChange={(e) => handleVehicleChange(item.id, e.target.value)}
                >
                  {vehicles.map(vehicle => (
                    <option key={vehicle} value={vehicle}>{vehicle}</option>
                  ))}
                </select>
                <button className="status-button" onClick={() => handleStatusChange(item.id)}>
                  Changer l'état
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
