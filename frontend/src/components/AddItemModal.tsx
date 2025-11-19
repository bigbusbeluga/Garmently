import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: () => void;
}

interface FormData {
  name: string;
  category: string;
  color: string;
  material: string;
  brand: string;
  description: string;
  size: string;
  price: string;
  image: File | null;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onItemAdded }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    color: '',
    material: '',
    brand: '',
    description: '',
    size: 'M',
    price: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: 'Upload Image', description: 'Add a photo of your item' },
    { title: 'Item Overview', description: 'Fill out necessary details' },
    { title: 'Item Description', description: 'Add more details' },
    { title: 'Review Item', description: 'Review and save' }
  ];

  const categories = ['Top', 'Bottom', 'Shoes', 'Accessories', 'Outerwear'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (file: File) => {
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Please enter an item name');
      return;
    }
    if (!formData.category) {
      alert('Please select a category');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setLoading(true);
    try {
      // Map category names to IDs
      const categoryMap: { [key: string]: string } = {
        'Top': '1',
        'Bottom': '2', 
        'Shoes': '3',
        'Accessories': '4',
        'Outerwear': '5'
      };

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('color', formData.color);
      submitData.append('size', formData.size);
      submitData.append('price', formData.price);
      submitData.append('brand', formData.brand);
      
      // Map category name to ID
      const categoryId = categoryMap[formData.category] || '1';
      submitData.append('category', categoryId);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      // Submit to API
      const response = await fetch('http://localhost:8000/api/garments-api/', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        onItemAdded();
        handleClose();
        alert('Item added successfully!');
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        alert('Error saving item. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error saving item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setFormData({
      name: '',
      category: '',
      color: '',
      material: '',
      brand: '',
      description: '',
      size: 'M',
      price: '',
      image: null
    });
    onClose();
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Upload Image
        return (
          <div className="step-content">
            <div className="upload-section">
              <h3>Upload Image</h3>
              <p className="form-note">Add a photo of your clothing item</p>
              <ImageUpload 
                onImageSelect={handleImageSelect}
                className="modal-image-upload"
              />
            </div>
          </div>
        );

      case 1: // Item Overview
        return (
          <div className="step-content">
            <div className="form-section">
              <h3>Fill out necessary details</h3>
              <p className="form-note">Fields with <span className="required">*</span> are required</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Item Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Category *</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Material"
                    value={formData.material}
                    onChange={(e) => handleInputChange('material', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            
            <div className="image-preview-section">
              {formData.image ? (
                <div className="image-preview-box">
                  <img 
                    src={URL.createObjectURL(formData.image)} 
                    alt="Preview" 
                    className="preview-image"
                  />
                </div>
              ) : (
                <div className="image-placeholder-box">
                  <div className="placeholder-icon">📷</div>
                </div>
              )}
            </div>
          </div>
        );

      case 2: // Item Description
        return (
          <div className="step-content">
            <div className="form-section">
              <h3>Fill out necessary details</h3>
              <p className="form-note">Fields with <span className="required">*</span> are required</p>
              
              <div className="description-form">
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="description-textarea"
                  rows={8}
                />
                
                <div className="form-row">
                  <div className="form-group">
                    <select
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      className="form-input"
                    >
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="form-input"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="image-preview-section">
              {formData.image ? (
                <div className="image-preview-box">
                  <img 
                    src={URL.createObjectURL(formData.image)} 
                    alt="Preview" 
                    className="preview-image"
                  />
                </div>
              ) : (
                <div className="image-placeholder-box">
                  <div className="placeholder-icon">📷</div>
                </div>
              )}
            </div>
          </div>
        );

      case 3: // Review Item
        return (
          <div className="step-content">
            <div className="review-section">
              <div className="review-details">
                <div className="review-field">
                  <strong>Item name:</strong> {formData.name}
                </div>
                <div className="review-field">
                  <strong>Category:</strong> {formData.category}
                </div>
                <div className="review-field">
                  <strong>Color:</strong> {formData.color}
                </div>
                <div className="review-field">
                  <strong>Brand:</strong> {formData.brand}
                </div>
                <div className="review-field">
                  <strong>Material:</strong> {formData.material}
                </div>
                <div className="review-field">
                  <strong>Size:</strong> {formData.size}
                </div>
                <div className="review-field">
                  <strong>Price:</strong> ${formData.price}
                </div>
                <div className="review-field">
                  <strong>Description:</strong> {formData.description || 'No description'}
                </div>
              </div>
            </div>
            
            <div className="image-preview-section">
              {formData.image ? (
                <div className="image-preview-box">
                  <img 
                    src={URL.createObjectURL(formData.image)} 
                    alt="Preview" 
                    className="preview-image"
                  />
                </div>
              ) : (
                <div className="image-placeholder-box">
                  <div className="placeholder-icon">📷</div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{steps[currentStep].title}</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <div className="modal-body">
          {renderStepContent()}
        </div>
        
        <div className="modal-footer">
          <div className="step-indicators">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>
          
          <div className="modal-actions">
            {currentStep > 0 && (
              <button className="prev-btn" onClick={handlePrev}>
                ← Previous
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button className="next-btn" onClick={handleNext}>
                Next →
              </button>
            ) : (
              <button 
                className="submit-btn" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Add to Wardrobe'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;