import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="profile-icon">+</div>
          <div className="notification-icon">3</div>
        </div>
        <p>Avec notre système éducatif</p>
        <h1>Découvrez comment sculpter votre corps</h1>
        <div className="search-bar">
          <span>Q</span>
          <input type="text" placeholder="Trouver une catégorie" />
        </div>
        <div className="category-filters">
          <button
            className={activeCategory === 'Tous' ? 'active' : ''}
            onClick={() => handleCategoryClick('Tous')}
          >
            Tous
          </button>
          <button
            className={activeCategory === 'Préparation' ? 'active' : ''}
            onClick={() => handleCategoryClick('Préparation')}
          >
            Préparation
          </button>
          <button
            className={activeCategory === 'Basique' ? 'active' : ''}
            onClick={() => handleCategoryClick('Basique')}
          >
            Basique
          </button>
          <button
            className={activeCategory === 'Avancé' ? 'active' : ''}
            onClick={() => handleCategoryClick('Avancé')}
          >
            Avancé
          </button>
        </div>
      </header>
      <section className="training-cards">
        <div className="training-card">
          <h3>Comment bien respirer pendant l'entraînement ?</h3>
          <div className="card-image">
            <img src="https://via.placeholder.com/350x150/77b3d4/ffffff?text=Respiration" alt="Respiration" />
          </div>
          <div className="card-footer">
            <span>👁️ 479</span>
            <span>💬 22</span>
            <span>❤️ 65</span>
          </div>
        </div>
        <div className="training-card">
          <h3>Gestion du poids</h3>
          <div className="card-image">
            <img src="https://via.placeholder.com/350x150/5cb85c/ffffff?text=Poids" alt="Poids" />
          </div>
          <div className="card-footer">
            <span>👁️ 520</span>
            <span>💬 30</span>
            <span>❤️ 70</span>
          </div>
        </div>
        <div className="training-card">
          <h3>Exercices cardio efficaces</h3>
          <div className="card-image">
            <img src="https://via.placeholder.com/350x150/f0ad4e/ffffff?text=Cardio" alt="Cardio" />
          </div>
          <div className="card-footer">
            <span>👁️ 610</span>
            <span>💬 25</span>
            <span>❤️ 82</span>
          </div>
        </div>
        <div className="training-card">
          <h3>Musculation pour débutants</h3>
          <div className="card-image">
            <img src="https://via.placeholder.com/350x150/d9534f/ffffff?text=Musculation" alt="Musculation" />
          </div>
          <div className="card-footer">
            <span>👁️ 580</span>
            <span>💬 35</span>
            <span>❤️ 75</span>
          </div>
        </div>
        <div className="training-card">
          <h3>Étirements pour la flexibilité</h3>
          <div className="card-image">
            <img src="https://via.placeholder.com/350x150/8e44ad/ffffff?text=Étirements" alt="Étirements" />
          </div>
          <div className="card-footer">
            <span>👁️ 490</span>
            <span>💬 28</span>
            <span>❤️ 68</span>
          </div>
        </div>
        <div className="training-card">
          <h3>Nutrition pour la performance</h3>
          <div className="card-image">
            <img src="https://via.placeholder.com/350x150/2c3e50/ffffff?text=Nutrition" alt="Nutrition" />
          </div>
          <div className="card-footer">
            <span>👁️ 550</span>
            <span>💬 32</span>
            <span>❤️ 72</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
