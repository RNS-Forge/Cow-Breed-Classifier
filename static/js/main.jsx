//import { Button } from 'reactstrap';
//import React from 'react';
const Button = window.Reactstrap.Button;
const Collapse = window.Reactstrap.Collapse;
const Navbar = window.Reactstrap.Navbar;
const NavbarBrand = window.Reactstrap.NavbarBrand;
const Nav = window.Reactstrap.Nav;
const NavItem = window.Reactstrap.NavItem;
const NavLink = window.Reactstrap.NavLink;
const Router = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const ReactMarkdown = window.ReactMarkdown;
const Form = window.Reactstrap.Form;
const FormGroup = window.Reactstrap.FormGroup;
const Label = window.Reactstrap.Label;
const Input = window.Reactstrap.Input;
const UncontrolledDropdown = window.Reactstrap.UncontrolledDropdown;
const Dropdown = window.Reactstrap.Dropdown;
const DropdownToggle = window.Reactstrap.DropdownToggle;
const DropdownMenu = window.Reactstrap.DropdownMenu;
const DropdownItem = window.Reactstrap.DropdownItem;
const Spinner = window.Reactstrap.Spinner;
const axios = window.axios;

// Obtain the root 
const rootElement = document.getElementById('root');

// About Component
class About extends React.Component {
    render() {
        return (
            <div className="about-container">
                <h1>About This Project</h1>

                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3 className="feature-title">AI-Powered</h3>
                        <p className="feature-description">Uses advanced deep learning with ResNet-50 architecture</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🐄</div>
                        <h3 className="feature-title">26 Breeds</h3>
                        <p className="feature-description">Identifies indigenous Indian cattle breeds accurately</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3 className="feature-title">Fast Processing</h3>
                        <p className="feature-description">Get results in seconds with high accuracy</p>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'left' }}>
                    <h2 style={{ textAlign: 'left', fontSize: '1.5rem', marginBottom: '1rem' }}>How It Works</h2>
                    <p>This cattle breed classification system uses state-of-the-art deep learning technology to identify indigenous Indian cattle breeds from images.</p>

                    <h3 style={{ textAlign: 'left', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem' }}>Technology Stack</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                            <span><strong>Deep Learning Framework:</strong> PyTorch 2.1.2</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                            <span><strong>Model Architecture:</strong> ResNet-50 (pre-trained on ImageNet)</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                            <span><strong>Backend:</strong> Flask with Python 3.9</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                            <span><strong>Frontend:</strong> React with modern UI components</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                            <span><strong>Dataset:</strong> 4000+ images across 26 indigenous breeds</span>
                        </li>
                    </ul>

                    <h3 style={{ textAlign: 'left', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem' }}>Usage Instructions</h3>
                    <p>1. Upload an image of a cattle or provide an image URL</p>
                    <p>2. Click the "Predict" button to analyze the image</p>
                    <p>3. View the top predictions with confidence scores</p>
                    <p>4. Try different images to explore various breeds</p>

                    <h3 style={{ textAlign: 'left', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem' }}>Supported Breeds</h3>
                    <p>The system can identify 26 indigenous Indian cattle breeds including Gir, Sahiwal, Red Sindhi, Tharparkar, Rathi, Hariana, Ongole, Kangayam, and many more.</p>
                </div>
            </div>
        );
    }
}

// Main Page Component
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            predictions: [],
            imageSelected: false,
            url: null,
            isLoading: false,
            selectedOption: null,
            errorMessage: null
        }
    }

    _onFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size should be less than 10MB');
                return;
            }

            this.setState({
                rawFile: file,
                file: URL.createObjectURL(file),
                imageSelected: true,
                errorMessage: null,
                predictions: []
            })
        }
    };

    _onUrlChange = (url) => {
        this.setState({ url: url, errorMessage: null, predictions: [] });
        if ((url.length > 5) && (url.indexOf("http") === 0)) {
            this.setState({
                file: url,
                imageSelected: true
            })
        }
    };

    _clear = async (event) => {
        this.setState({
            file: null,
            imageSelected: false,
            predictions: [],
            rawFile: null,
            url: "",
            errorMessage: null
        })
    };

    _predict = async (event) => {
        if (!this.state.imageSelected) {
            this.setState({ errorMessage: 'Please select or provide an image first' });
            return;
        }

        this.setState({ isLoading: true, errorMessage: null });

        let resPromise = null;
        if (this.state.rawFile) {
            const data = new FormData();
            data.append('file', this.state.rawFile);
            resPromise = axios.post('/api/classify', data);
        } else {
            resPromise = axios.get('/api/classify', {
                params: {
                    url: this.state.file
                }
            });
        }

        try {
            const res = await resPromise;
            const payload = res.data;
            this.setState({ predictions: payload.predictions, isLoading: false });
            console.log(payload)
        } catch (e) {
            console.error(e);
            this.setState({
                errorMessage: 'Failed to classify image. Please try again with a different image.',
                isLoading: false
            });
        }
    };

    renderPrediction() {
        const predictions = this.state.predictions || [];

        if (predictions.length > 0) {
            return (
                <div className="predictions-container">
                    <h3 className="predictions-title">Classification Results</h3>
                    <ul className="predictions-list">
                        {predictions.map((item, index) => (
                            <li key={index} className="prediction-item">
                                <span className="prediction-breed">{item.class}</span>
                                <span className="prediction-confidence">{Math.round(item.prob * 100)}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return null
        }
    }

    sampleUrlSelected = (item) => {
        this._onUrlChange(item.url);
    };

    render() {
        const sampleImages = APP_CONFIG.sampleImages || [];
        return (
            <div>
                <h2>{APP_CONFIG.description}</h2>
                <p style={{ fontSize: '1.05rem', color: '#6b7280', marginBottom: '2rem' }}>
                    Upload an image or provide a URL to identify the cattle breed using AI
                </p>

                <Form>
                    <FormGroup>
                        <div>
                            <p style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '1rem' }}>
                                📌 Option 1: Provide Image URL
                            </p>
                            <div style={{ marginBottom: '1rem' }}>
                                {sampleImages.length > 0 && (
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret>
                                            Try Sample Images
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {sampleImages.map((si, idx) =>
                                                <DropdownItem key={idx} onClick={() => this.sampleUrlSelected(si)}>
                                                    {si.name}
                                                </DropdownItem>)
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )}
                            </div>
                            <Input
                                value={this.state.url || ''}
                                name="file"
                                onChange={(e) => this._onUrlChange(e.target.value)}
                                placeholder="Enter image URL (e.g., https://example.com/cattle.jpg)"
                            />
                        </div>
                    </FormGroup>

                    <h3>OR</h3>

                    <FormGroup id={"upload_button"}>
                        <div>
                            <p style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '1rem' }}>
                                📁 Option 2: Upload Image File
                            </p>
                        </div>
                        <Label for="imageUpload">
                            <Input
                                type="file"
                                name="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={this._onFileUpload}
                            />
                            <span className="btn btn-primary">
                                Choose Image File
                            </span>
                        </Label>
                    </FormGroup>

                    {this.state.imageSelected && (
                        <img src={this.state.file} className={"img-preview"} alt="Selected cattle" />
                    )}

                    {this.state.errorMessage && (
                        <div style={{
                            background: '#fee2e2',
                            border: '1px solid #ef4444',
                            color: '#991b1b',
                            padding: '1rem',
                            borderRadius: '10px',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            {this.state.errorMessage}
                        </div>
                    )}

                    <FormGroup style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <Button
                            color="success"
                            onClick={this._predict}
                            disabled={this.state.isLoading || !this.state.imageSelected}
                            style={{ minWidth: '150px' }}
                        >
                            {this.state.isLoading ? 'Processing...' : '🔍 Predict Breed'}
                        </Button>
                        <Button
                            color="danger"
                            onClick={this._clear}
                            style={{ minWidth: '150px' }}
                        >
                            🗑️ Clear
                        </Button>
                    </FormGroup>

                    {this.state.isLoading && (
                        <div className="spinner-container">
                            <Spinner color="primary" type="grow" style={{ width: '5rem', height: '5rem' }} />
                            <p className="loading-text">Analyzing image with AI...</p>
                        </div>
                    )}
                </Form>

                {this.renderPrediction()}
            </div>
        );
    }
}

// Custom Navigation Bar
class CustomNavBar extends React.Component {
    render() {
        return (
            <Navbar color="light" light fixed="top" expand="md">
                <NavbarBrand href="/">{APP_CONFIG.title}</NavbarBrand>
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">🏠 Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about">ℹ️ About</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

// Main App Component
function App() {
    return (
        <Router>
            <div className="App">
                <CustomNavBar />
                <div>
                    <main role="main" className="container">
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/about" component={About} />
                    </main>
                </div>
            </div>
        </Router>
    )
}

// Initialize App
(async () => {
    const response = await fetch('/config');
    const body = await response.json();
    window.APP_CONFIG = body;

    // Use the ReactDOM.render to show component on the browser
    ReactDOM.render(
        <App />,
        rootElement
    )
})();


