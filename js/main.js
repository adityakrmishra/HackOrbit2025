/**
 * BharatFakeGuard - Main JavaScript functionality
 * Handles file uploads, analysis simulation, and results display
 */

// Global variables to store uploaded files
let uploadedAudioFile = null;
let uploadedVideoFile = null;

// DOM elements
const audioUpload = document.getElementById('audioUpload');
const videoUpload = document.getElementById('videoUpload');
const audioFileInput = document.getElementById('audioFile');
const videoFileInput = document.getElementById('videoFile');
const audioFileName = document.getElementById('audioFileName');
const videoFileName = document.getElementById('videoFileName');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const loadingState = document.getElementById('loadingState');
const resultsContent = document.getElementById('resultsContent');

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeUploadHandlers();
    initializeAnalyzeButton();
    initializeFormHandlers();
});

/**
 * Initialize file upload handlers for drag & drop and click functionality
 */
function initializeUploadHandlers() {
    // Audio upload handlers
    audioUpload.addEventListener('click', () => audioFileInput.click());
    audioUpload.addEventListener('dragover', handleDragOver);
    audioUpload.addEventListener('drop', (e) => handleFileDrop(e, 'audio'));
    audioFileInput.addEventListener('change', (e) => handleFileSelect(e, 'audio'));

    // Video upload handlers
    videoUpload.addEventListener('click', () => videoFileInput.click());
    videoUpload.addEventListener('dragover', handleDragOver);
    videoUpload.addEventListener('drop', (e) => handleFileDrop(e, 'video'));
    videoFileInput.addEventListener('change', (e) => handleFileSelect(e, 'video'));
}

/**
 * Handle drag over event for file uploads
 */
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('file-upload-active');
}

/**
 * Handle file drop event
 */
function handleFileDrop(e, type) {
    e.preventDefault();
    e.currentTarget.classList.remove('file-upload-active');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0], type);
    }
}

/**
 * Handle file selection from input
 */
function handleFileSelect(e, type) {
    const files = e.target.files;
    if (files.length > 0) {
        processFile(files[0], type);
    }
}

/**
 * Process uploaded file and update UI
 */
function processFile(file, type) {
    // Validate file type
    const validAudioTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/x-m4a'];
    const validVideoTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
    
    if (type === 'audio' && !validAudioTypes.includes(file.type)) {
        showNotification('Please upload a valid audio file (WAV, MP3, M4A)', 'error');
        return;
    }
    
    if (type === 'video' && !validVideoTypes.includes(file.type)) {
        showNotification('Please upload a valid video file (MP4, AVI, MOV)', 'error');
        return;
    }
    
    // Check file size (limit to 50MB)
    if (file.size > 50 * 1024 * 1024) {
        showNotification('File size must be less than 50MB', 'error');
        return;
    }
    
    // Store file and update UI
    if (type === 'audio') {
        uploadedAudioFile = file;
        audioFileName.textContent = `Selected: ${file.name}`;
        audioFileName.classList.remove('hidden');
        audioUpload.querySelector('.border-dashed').classList.add('border-green-400', 'bg-green-50');
    } else {
        uploadedVideoFile = file;
        videoFileName.textContent = `Selected: ${file.name}`;
        videoFileName.classList.remove('hidden');
        videoUpload.querySelector('.border-dashed').classList.add('border-green-400', 'bg-green-50');
    }
    
    // Enable analyze button if at least one file is uploaded
    updateAnalyzeButton();
    
    showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} file uploaded successfully!`, 'success');
}

/**
 * Update analyze button state based on uploaded files
 */
function updateAnalyzeButton() {
    const hasFiles = uploadedAudioFile || uploadedVideoFile;
    analyzeBtn.disabled = !hasFiles;
    
    if (hasFiles) {
        analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        analyzeBtn.classList.add('hover:bg-blue-700');
    } else {
        analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        analyzeBtn.classList.remove('hover:bg-blue-700');
    }
}

/**
 * Initialize analyze button functionality
 */
function initializeAnalyzeButton() {
    analyzeBtn.addEventListener('click', function() {
        if (uploadedAudioFile || uploadedVideoFile) {
            startAnalysis();
        }
    });
}

/**
 * Start the deepfake analysis process
 */
function startAnalysis() {
    // Show results section and loading state
    resultsSection.classList.remove('hidden');
    loadingState.classList.remove('hidden');
    resultsContent.classList.add('hidden');
    
    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Simulate analysis process (in real implementation, this would call the API)
    setTimeout(() => {
        simulateAnalysis();
    }, 3000); // 3 second delay to simulate processing
}

/**
 * Simulate deepfake analysis and display results
 */
function simulateAnalysis() {
    // Generate realistic mock results
    const audioScore = uploadedAudioFile ? generateRealisticScore() : null;
    const videoScore = uploadedVideoFile ? generateRealisticScore() : null;
    
    // Calculate fused score (weighted average if both files present)
    let fusedScore;
    if (audioScore && videoScore) {
        fusedScore = (audioScore * 0.4) + (videoScore * 0.6);
    } else if (audioScore) {
        fusedScore = audioScore;
    } else {
        fusedScore = videoScore;
    }
    
    // Hide loading and show results
    loadingState.classList.add('hidden');
    resultsContent.classList.remove('hidden');
    resultsContent.classList.add('slide-in-up');
    
    // Update results display
    displayResults(audioScore, videoScore, fusedScore);
}

/**
 * Generate realistic deepfake scores with some randomness
 */
function generateRealisticScore() {
    // Generate scores that tend to be lower (most content is real)
    // but occasionally higher to simulate potential deepfakes
    const random = Math.random();
    
    if (random < 0.7) {
        // 70% chance of low score (0.05 - 0.25)
        return Math.random() * 0.2 + 0.05;
    } else if (random < 0.9) {
        // 20% chance of medium score (0.25 - 0.65)
        return Math.random() * 0.4 + 0.25;
    } else {
        // 10% chance of high score (0.65 - 0.95)
        return Math.random() * 0.3 + 0.65;
    }
}

/**
 * Display analysis results in the UI
 */
function displayResults(audioScore, videoScore, fusedScore) {
    // Update overall score
    const overallScoreElement = document.getElementById('overallScore');
    const overallProgressBar = document.getElementById('overallProgressBar');
    const overallVerdict = document.getElementById('overallVerdict');
    
    const percentage = Math.round(fusedScore * 100);
    overallScoreElement.textContent = `${percentage}%`;
    
    // Animate progress bar
    setTimeout(() => {
        overallProgressBar.style.width = `${percentage}%`;
        
        // Set color based on score
        if (fusedScore < 0.3) {
            overallProgressBar.className = 'h-3 rounded-full transition-all duration-1000 score-excellent';
            overallVerdict.textContent = '✅ Likely Authentic';
            overallVerdict.className = 'mt-2 text-sm font-medium text-green-600';
        } else if (fusedScore < 0.7) {
            overallProgressBar.className = 'h-3 rounded-full transition-all duration-1000 score-good';
            overallVerdict.textContent = '⚠️ Moderate Suspicion';
            overallVerdict.className = 'mt-2 text-sm font-medium text-yellow-600';
        } else {
            overallProgressBar.className = 'h-3 rounded-full transition-all duration-1000 score-warning';
            overallVerdict.textContent = '🚨 High Deepfake Probability';
            overallVerdict.className = 'mt-2 text-sm font-medium text-red-600';
        }
    }, 500);
    
    // Update individual scores
    if (audioScore !== null) {
        updateIndividualScore('audio', audioScore);
    } else {
        // Hide audio score section if no audio file
        document.querySelector('#audioScore').closest('.bg-gray-50').style.display = 'none';
    }
    
    if (videoScore !== null) {
        updateIndividualScore('video', videoScore);
    } else {
        // Hide video score section if no video file
        document.querySelector('#videoScore').closest('.bg-gray-50').style.display = 'none';
    }
    
    // Update heatmap visualization
    updateHeatmapVisualization(fusedScore);
}

/**
 * Update individual score display (audio or video)
 */
function updateIndividualScore(type, score) {
    const scoreElement = document.getElementById(`${type}Score`);
    const progressBar = document.getElementById(`${type}ProgressBar`);
    
    const percentage = Math.round(score * 100);
    scoreElement.textContent = `${percentage}%`;
    
    // Animate progress bar
    setTimeout(() => {
        progressBar.style.width = `${percentage}%`;
        
        // Set color based on score
        if (score < 0.3) {
            progressBar.className = 'h-2 rounded-full transition-all duration-1000 bg-green-500';
        } else if (score < 0.7) {
            progressBar.className = 'h-2 rounded-full transition-all duration-1000 bg-yellow-500';
        } else {
            progressBar.className = 'h-2 rounded-full transition-all duration-1000 bg-red-500';
        }
    }, 700);
}

/**
 * Update heatmap visualization based on analysis results
 */
function updateHeatmapVisualization(score) {
    const heatmapContainer = document.getElementById('heatmapContainer');
    
    // Create animated heatmap effect
    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 opacity-0 transition-opacity duration-1000';
        
        // Generate gradient based on score
        if (score < 0.3) {
            overlay.style.background = 'linear-gradient(90deg, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.6) 70%, rgba(245, 158, 11, 0.3) 100%)';
        } else if (score < 0.7) {
            overlay.style.background = 'linear-gradient(90deg, rgba(16, 185, 129, 0.4) 0%, rgba(245, 158, 11, 0.8) 50%, rgba(239, 68, 68, 0.4) 100%)';
        } else {
            overlay.style.background = 'linear-gradient(90deg, rgba(245, 158, 11, 0.3) 0%, rgba(239, 68, 68, 0.8) 30%, rgba(239, 68, 68, 0.9) 100%)';
        }
        
        heatmapContainer.appendChild(overlay);
        
        // Fade in the overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
        
        // Update text content
        const textElement = heatmapContainer.querySelector('span');
        if (score < 0.3) {
            textElement.textContent = 'Low risk regions detected across timeline';
            textElement.className = 'text-sm text-green-700 font-medium';
        } else if (score < 0.7) {
            textElement.textContent = 'Mixed risk regions - some suspicious areas found';
            textElement.className = 'text-sm text-yellow-700 font-medium';
        } else {
            textElement.textContent = 'High risk regions detected - multiple suspicious areas';
            textElement.className = 'text-sm text-red-700 font-medium';
        }
    }, 1000);
}

/**
 * Initialize form handlers for contact form
 */
function initializeFormHandlers() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            showNotification('Thank you for your feedback! We will review it shortly.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium">${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

/**
 * Smooth scroll to section (for navigation links)
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add smooth scrolling to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

/**
 * Add loading states and better UX feedback
 */
function addLoadingState(element, originalText) {
    element.disabled = true;
    element.innerHTML = `
        <div class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
        </div>
    `;
}

function removeLoadingState(element, originalText) {
    element.disabled = false;
    element.innerHTML = originalText;
}

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // Press 'A' to focus on analyze button
    if (e.key === 'a' || e.key === 'A') {
        if (e.ctrlKey || e.metaKey) return; // Don't interfere with Ctrl+A
        
        const analyzeButton = document.getElementById('analyzeBtn');
        if (analyzeButton && !analyzeButton.disabled) {
            analyzeButton.focus();
        }
    }
    
    // Press 'U' to focus on upload area
    if (e.key === 'u' || e.key === 'U') {
        if (e.ctrlKey || e.metaKey) return;
        
        const uploadArea = document.getElementById('audioUpload');
        if (uploadArea) {
            uploadArea.focus();
        }
    }
});

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const uploadAreas = document.querySelectorAll('.upload-area');
    uploadAreas.forEach((area, index) => {
        const type = index === 0 ? 'audio' : 'video';
        area.setAttribute('role', 'button');
        area.setAttribute('aria-label', `Upload ${type} file for deepfake analysis`);
        area.setAttribute('tabindex', '0');
        
        // Add keyboard support for upload areas
        area.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                area.click();
            }
        });
    });
    
    // Add live region for screen readers
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
});

/**
 * Update live region for screen readers
 */
function updateLiveRegion(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
    }
}