import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import AddItemModal from './AddItemModal';
import './Inventory.css';

interface InventoryItem {
  id: number;
  name: string;
  description?: string;
  category: number;
  category_name: string;
  color: string;
  size: string;
  price: number;
  brand?: string;
  image?: string;
  image_url?: string;
  is_favorite?: boolean;
  times_worn?: number;
  last_worn?: string;
  purchase_date?: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  name: string;
  count: number;
}

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const categories: Category[] = [
    { name: 'All Items', count: 24 },
    { name: 'Fanatics', count: 8 },
    { name: 'Tops', count: 6 },
    { name: 'Bottoms', count: 4 },
    { name: 'Footwear', count: 3 },
    { name: 'Hats', count: 2 },
    { name: 'Accessories', count: 1 }
  ];

  const sidebarItems = [
    { icon: '🏠', label: 'Home', active: false },
    { icon: '👔', label: 'Wardrobe', active: false },
    { icon: '📅', label: 'Calendar', active: false },
    { icon: '🧺', label: 'Laundry', active: false, notification: true },
    { icon: '🎨', label: 'Mix & Match', active: true },
    { icon: '⚙️', label: 'Settings', active: false }
  ];

  const fetchItems = async () => {
    try {
      const data = await apiService.getGarments();
      // Transform the data to include more detailed inventory items
      const inventoryItems: InventoryItem[] = [
        ...Array.from(data as any[]),
        // Add more sample items to create a fuller inventory
        { id: 4, name: 'Classic White Tee', type: 'shirt', color: 'white', size: 'M', price: 24.99, category: 'Tops' },
        { id: 5, name: 'Vintage Jeans', type: 'pants', color: 'blue', size: 'L', price: 89.99, category: 'Bottoms' },
        { id: 6, name: 'Running Shoes', type: 'shoes', color: 'black', size: '10', price: 129.99, category: 'Footwear' },
        { id: 7, name: 'Baseball Cap', type: 'hat', color: 'navy', size: 'OS', price: 34.99, category: 'Hats' },
        { id: 8, name: 'Leather Belt', type: 'accessory', color: 'brown', size: 'L', price: 49.99, category: 'Accessories' },
        { id: 9, name: 'Polo Shirt', type: 'shirt', color: 'navy', size: 'L', price: 54.99, category: 'Tops' },
        { id: 10, name: 'Chino Pants', type: 'pants', color: 'khaki', size: 'M', price: 69.99, category: 'Bottoms' },
        { id: 11, name: 'Sneakers', type: 'shoes', color: 'white', size: '9', price: 99.99, category: 'Footwear' },
        { id: 12, name: 'Hoodie', type: 'shirt', color: 'gray', size: 'XL', price: 79.99, category: 'Tops' }
      ];
      setItems(inventoryItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemAdded = () => {
    // Refresh the items list when a new item is added
    fetchItems();
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All Items' || item.category_name === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.category_name && item.category_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (item.color && item.color.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getItemIcon = (categoryName: string) => {
    if (!categoryName) return '👔';
    
    switch (categoryName.toLowerCase()) {
      case 'top': return '👕';
      case 'bottom': return '👖';
      case 'shoes': return '👟';
      case 'accessories': return '�';
      case 'outerwear': return '🧥';
      default: return '👔';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading inventory...</div>
      </div>
    );
  }

  return (
    <div className="inventory-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">👗</div>
          <span className="logo-text">DRESS CODE</span>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <div 
              key={index}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.notification && <div className="notification-dot"></div>}
            </div>
          ))}
        </nav>

        <div className="user-profile">
          <div className="user-avatar">KL</div>
          <span className="user-name">Kendrick Lamar</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>Inventory</h1>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="user-actions">
              <div className="notification-bell">🔔</div>
              <div className="user-menu">👤</div>
            </div>
          </div>
        </header>

        <div className="content-area">
          {/* Category Sidebar */}
          <div className="category-sidebar">
            <h3>Category</h3>
            {categories.map((category) => (
              <div
                key={category.name}
                className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="category-name">{category.name}</span>
                <span className="category-count">{category.count}</span>
              </div>
            ))}
          </div>

          {/* Items Grid */}
          <div className="items-section">
            <div className="items-grid">
              {filteredItems.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <span className="item-icon">{getItemIcon(item.category_name)}</span>
                  </div>
                  <div className="item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-details">{item.color} • {item.size}</p>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="item-actions">
                    <button className="action-btn">⋯</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button 
        className="add-item-button"
        onClick={() => setIsAddModalOpen(true)}
        title="Add new item"
      >
        +
      </button>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onItemAdded={handleItemAdded}
      />
    </div>
  );
};

export default Inventory;