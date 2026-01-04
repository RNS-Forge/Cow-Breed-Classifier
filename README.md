# Indigenous Cattle Breed Classifier Web Application 🐄🤖

An AI-powered web application for classifying indigenous Indian cattle breeds using deep learning technology. This system can accurately identify 26 different indigenous cattle breeds from images.

## 🎯 Features

- **26 Breed Recognition**: Identifies popular indigenous Indian cattle breeds
- **High Accuracy**: Powered by ResNet-50 deep learning architecture  
- **Fast Processing**: Get classification results in seconds
- **User-Friendly Interface**: Modern, responsive UI with drag-and-drop support
- **Flexible Input**: Upload images or provide image URLs
- **Real-time Predictions**: Instant classification with confidence scores
- **Sample Images**: Pre-loaded examples to test the system

## 🛠️ Technology Stack

### Model Training
- **PyTorch**: Version 2.1.2 🚀
- **Python**: Version 3.9 🐍
- **Model Architecture**: ResNet-50 (pre-trained on ImageNet)
- **Dataset**: 4000+ images across 26 indigenous breeds

### Web Application
- **Backend**: Flask 1.0.2 🌟
- **Frontend**: React with modern UI components
- **Styling**: Custom CSS with gradient backgrounds and animations
- **Deployment Ready**: Configured for production deployment

## 📋 Table of Contents

1. [Installation](#installation)
2. [Training the Model](docs/1_training.md)
3. [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Supported Breeds](#supported-breeds)
6. [API Documentation](#api-documentation)

## 🚀 Installation

### Prerequisites
- Python 3.9 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Setup Steps

1. **Clone or download this repository**

2. **Create and activate virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download model files**
   
   The trained model and class labels will be automatically downloaded when you first run the application. The files are stored in the `models/` directory:
   - `cattle_breed_classifier_full_model.pth` (model weights)
   - `classes.txt` (breed labels)

## 🎮 Running the Application

### Start the Flask Server

```bash
python app.py
```

The application will start on `http://localhost:5001`

### Access the Web Interface

Open your web browser and navigate to:
```
http://localhost:5001
```

### Using the Application

1. **Upload an Image**: 
   - Click "Choose Image File" to upload from your computer
   - Supports JPG, PNG, and other common image formats

2. **Or Provide URL**:
   - Enter the URL of an online cattle image
   - Try the sample images from the dropdown menu

3. **Classify**:
   - Click "🔍 Predict Breed" button
   - View top 3 predictions with confidence percentages

4. **Clear**:
   - Click "🗑️ Clear" to reset and try another image

## 📁 Project Structure

```
cattle-breed-classifier-webapp/
├── app.py                  # Flask application and API endpoints
├── config.yaml            # Application configuration
├── requirements.txt       # Python dependencies
├── Procfile              # Deployment configuration
├── models/               # Model files directory
│   ├── cattle_breed_classifier_full_model.pth
│   ├── classes.txt
│   └── README.md
├── src/                  # Source code for model training
│   ├── model.py         # Model architecture
│   ├── train.py         # Training script
│   ├── evaluate.py      # Evaluation utilities
│   └── dataset_loader.py
├── static/              # Frontend files
│   ├── index.html      # Main HTML page
│   ├── css/
│   │   └── custom.css  # Custom styling
│   └── js/
│       └── main.jsx    # React application
├── notebooks/           # Jupyter notebooks
│   └── Indigenous_Cattle_Breed_Classifier.ipynb
├── docs/               # Documentation
│   ├── 1_training.md
│   └── 2_render_app.md
└── assets/            # Images and media
    └── demo.gif
```

## 🐄 Supported Breeds

The system can identify the following 26 indigenous Indian cattle breeds:

**Cattle Breeds:**
1. Gir
2. Sahiwal
3. Red Sindhi
4. Tharparkar
5. Rathi
6. Hariana
7. Ongole
8. Kangayam
9. Dangi
10. Kankrej
11. Malvi
12. Nimari
13. Nagori
14. Khillar
15. Hallikar
16. Amritmahal
17. Bargur
18. Pulikulam
19. Umblachery
20. Vechur
21. Ponwar
22. Bachaur
23. Krishna Valley
24. Deoni
25. Gangatiri

**Buffalo Breed:**
26. Mehsana Buffalo

## 📡 API Documentation

### Classify Image

**Endpoint**: `/api/classify`

**Methods**: `GET`, `POST`

**POST Request** (File Upload):
```bash
curl -X POST -F "file=@cattle_image.jpg" http://localhost:5001/api/classify
```

**GET Request** (URL):
```bash
curl "http://localhost:5001/api/classify?url=https://example.com/cattle.jpg"
```

**Response**:
```json
{
  "class": "0",
  "predictions": [
    {
      "class": "Gir",
      "output": 12.5,
      "prob": 0.87
    },
    {
      "class": "Sahiwal",
      "output": 8.2,
      "prob": 0.09
    },
    {
      "class": "Tharparkar",
      "output": 6.1,
      "prob": 0.03
    }
  ]
}
```

### Get All Classes

**Endpoint**: `/api/classes`

**Method**: `GET`

**Response**:
```json
["Gir", "Sahiwal", "Red Sindhi", "Tharparkar", ...]
```

### Health Check

**Endpoint**: `/ping`

**Method**: `GET`

**Response**: `pong`

### Get Configuration

**Endpoint**: `/config`

**Method**: `GET`

**Response**:
```json
{
  "title": "Indigenous Cattle Breed Classifier",
  "description": "AI-Powered Indigenous Indian Cattle Breed Identification System",
  "sampleImages": [...]
}
```

## 🎨 UI Features

- **Modern Gradient Design**: Beautiful purple gradient background with animated overlays
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in, slide, and hover effects for better UX
- **Visual Feedback**: Loading spinners, progress indicators, and error messages
- **Accessible**: Proper ARIA labels and semantic HTML
- **Custom Styling**: Professional color scheme with consistent spacing

## 🧠 Model Details

### Architecture
- **Base Model**: ResNet-50 (pre-trained on ImageNet)
- **Transfer Learning**: Fine-tuned on indigenous cattle breed dataset
- **Input Size**: 224x224 pixels
- **Output**: 26-class classification

### Training Details
- **Framework**: PyTorch 2.1.2
- **Training Hardware**: NVIDIA Tesla K80 GPU (12GB)
- **Training Time**: ~30 minutes on Google Colab
- **Dataset Size**: 4000+ images (~150 per class)
- **Data Augmentation**: Applied during training for better generalization

### Performance
- Achieves high accuracy on test set
- Robust to variations in lighting, angle, and image quality
- Handles both professional and casual cattle photographs

## 🔧 Configuration

Edit `config.yaml` to customize:

```yaml
title: Your App Title
description: Your Description
sampleImages:
  - name: Sample Name
    url: https://example.com/image.jpg
```

## 📝 Training Your Own Model

See [docs/1_training.md](docs/1_training.md) for detailed instructions on:
- Preparing your dataset
- Training the model
- Evaluating performance
- Exporting the trained model

## 🐛 Troubleshooting

### Model Loading Error
If you encounter PyTorch loading errors:
```python
# The app.py automatically handles this with weights_only=False
```

### Port Already in Use
Change the port in app.py or set environment variable:
```bash
# Windows
$env:PORT = "5002"

# Linux/Mac
export PORT=5002
```

### Dependencies Issues
Make sure all requirements are installed:
```bash
pip install -r requirements.txt --upgrade
```

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Submit pull requests

## 📞 Support

For questions or issues:
- Check the documentation in the `docs/` folder
- Review the training notebook in `notebooks/`
- Examine the source code in `src/` and `app.py`

## 🎓 Educational Use

This project is ideal for:
- Learning deep learning and computer vision
- Understanding web application development with Flask
- Studying transfer learning techniques
- Exploring React-based frontends
- Agriculture technology applications

---

**Built with ❤️ using PyTorch, Flask, and React** 


 

 
 
 

