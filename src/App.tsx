import React, { useState, useRef, useCallback } from 'react';
import { 
  Upload, 
  Play, 
  Pause, 
  AlertTriangle, 
  Shield, 
  Brain, 
  Languages, 
  BarChart3, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Info, 
  Mail, 
  MessageSquare, 
  Star, 
  Zap,
  Globe,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

interface AnalysisResult {
  overallScore: number;
  audioScore: number;
  videoScore: number;
  confidence: number;
  isDeepfake: boolean;
  heatmapData: number[][];
  explanation: string;
  detectedLanguage: string;
}

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'results' | 'about'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setActiveTab('results');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result
    const mockResult: AnalysisResult = {
      overallScore: Math.random() * 100,
      audioScore: Math.random() * 100,
      videoScore: Math.random() * 100,
      confidence: 85 + Math.random() * 15,
      isDeepfake: Math.random() > 0.5,
      heatmapData: Array.from({ length: 8 }, () => 
        Array.from({ length: 8 }, () => Math.random())
      ),
      explanation: "Analysis detected temporal inconsistencies in facial movements and audio-visual synchronization patterns typical of deepfake generation.",
      detectedLanguage: "Hindi"
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const HeatmapVisualization = ({ data }: { data: number[][] }) => (
    <div className="grid grid-cols-8 gap-1 p-4 bg-gray-50 rounded-lg">
      {data.map((row, i) => 
        row.map((value, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-6 h-6 rounded-sm ${
              value > 0.7 ? 'bg-red-500' : 
              value > 0.4 ? 'bg-yellow-500' : 
              'bg-green-500'
            }`}
            style={{ opacity: value }}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                  BharatFakeGuard
                </h1>
                <p className="text-sm text-gray-400">AI Deepfake Detection System</p>
              </div>
            </div>
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'upload' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'results' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'about' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                About
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Protect India's Digital Truth
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Advanced AI-powered deepfake detection system specifically trained for Indian languages. 
              Detect manipulated audio and video content with real-time analysis and visual explanations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full">
                <Languages className="w-5 h-5 text-blue-400" />
                <span className="text-sm">15+ Indian Languages</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full">
                <Eye className="w-5 h-5 text-green-400" />
                <span className="text-sm">Visual Heatmaps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'upload' && (
          <div className="space-y-12">
            {/* Upload Section */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-red-400" />
                Upload Media for Analysis
              </h3>
              
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive 
                    ? 'border-red-400 bg-red-900/20' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {uploadedFile ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-400">File Ready</p>
                      <p className="text-gray-300">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-400">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Drop your video or audio file here</p>
                      <p className="text-gray-400">or click to browse</p>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-semibold"
                >
                  {uploadedFile ? 'Choose Different File' : 'Select File'}
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Supported Formats</h4>
                  <p className="text-sm text-gray-400">MP4, AVI, MOV, MP3, WAV, M4A</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">File Size Limit</h4>
                  <p className="text-sm text-gray-400">Maximum 500 MB</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Analysis Time</h4>
                  <p className="text-sm text-gray-400">~30 seconds average</p>
                </div>
              </div>
              
              {uploadedFile && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={simulateAnalysis}
                    disabled={isAnalyzing}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <span>Start Analysis</span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </section>

            {/* Language Support */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Languages className="w-6 h-6 mr-3 text-blue-400" />
                Supported Indian Languages
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati',
                  'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu'
                ].map((language) => (
                  <div key={language} className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <span className="font-semibold">{language}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                <p className="text-blue-300 text-sm flex items-start">
                  <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  Our AI models are specifically trained on Indian linguistic patterns and cultural contexts for superior accuracy in detecting deepfakes targeting Indian audiences.
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-8">
            {isAnalyzing ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 text-center">
                <div className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold mb-4">Analyzing Media Content</h3>
                <p className="text-gray-400 mb-6">Our AI is processing your file for deepfake detection...</p>
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between text-sm">
                    <span>Extracting features...</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Analyzing audio patterns...</span>
                    <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing visual data...</span>
                    <span className="text-gray-400">⏳</span>
                  </div>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="space-y-8">
                {/* Overall Results */}
                <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-green-400" />
                    Analysis Results
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center mx-auto mb-4 ${
                          analysisResult.isDeepfake 
                            ? 'border-red-500 bg-red-900/20' 
                            : 'border-green-500 bg-green-900/20'
                        }`}>
                          {analysisResult.isDeepfake ? (
                            <XCircle className="w-12 h-12 text-red-400" />
                          ) : (
                            <CheckCircle className="w-12 h-12 text-green-400" />
                          )}
                        </div>
                        <h4 className="text-3xl font-bold mb-2">
                          {analysisResult.isDeepfake ? 'Deepfake Detected' : 'Authentic Content'}
                        </h4>
                        <p className="text-lg text-gray-300">
                          Confidence: {analysisResult.confidence.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Overall Score</span>
                            <span className="font-semibold">{analysisResult.overallScore.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-1000 ${
                                analysisResult.overallScore > 50 ? 'bg-red-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${analysisResult.overallScore}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Audio Analysis</span>
                            <span className="font-semibold">{analysisResult.audioScore.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                analysisResult.audioScore > 50 ? 'bg-red-400' : 'bg-green-400'
                              }`}
                              style={{ width: `${analysisResult.audioScore}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Video Analysis</span>
                            <span className="font-semibold">{analysisResult.videoScore.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                analysisResult.videoScore > 50 ? 'bg-red-400' : 'bg-green-400'
                              }`}
                              style={{ width: `${analysisResult.videoScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="text-lg font-semibold mb-3">Detected Language</h5>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <span className="font-semibold text-blue-400">{analysisResult.detectedLanguage}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-lg font-semibold mb-3">Analysis Details</h5>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <p className="text-sm text-gray-300">{analysisResult.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Heatmap Visualization */}
                <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-purple-400" />
                    Visual Heatmap Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Frame-level Detection</h4>
                      <HeatmapVisualization data={analysisResult.heatmapData} />
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span>Authentic</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                          <span>Suspicious</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span>Deepfake</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Key Findings</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold">Facial Inconsistencies</p>
                            <p className="text-sm text-gray-400">Detected unnatural facial movements in frames 12-18</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold">Audio-Visual Sync</p>
                            <p className="text-sm text-gray-400">Minor synchronization issues detected</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold">Compression Artifacts</p>
                            <p className="text-sm text-gray-400">Normal compression patterns observed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Analysis Yet</h3>
                <p className="text-gray-400">Upload a file and start analysis to see results here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-8">
            {/* About Section */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">About BharatFakeGuard</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    BharatFakeGuard is an advanced AI-powered deepfake detection system specifically designed for Indian languages and cultural contexts. Our multimodal approach combines audio and video analysis to provide comprehensive deepfake detection capabilities.
                  </p>
                  <p className="text-gray-300">
                    Built with cutting-edge machine learning algorithms and trained on diverse Indian linguistic patterns, our system offers real-time analysis with visual explanations to help users understand the detection results.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                    <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold">15+ Languages</h4>
                    <p className="text-sm text-gray-400">Supported</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-semibold">1M+ Users</h4>
                    <p className="text-sm text-gray-400">Trust Us</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                    <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-semibold">95% Accuracy</h4>
                    <p className="text-sm text-gray-400">Detection Rate</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="font-semibold">Real-time</h4>
                    <p className="text-sm text-gray-400">Processing</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-400" />
                Contact & Feedback
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Organization</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                      placeholder="Your organization (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                      placeholder="Your message or feedback"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send Message
                  </button>
                </form>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-red-400" />
                        <span>contact@bharatfakeguard.ai</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                        <span>+91 98765 43210</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">For Organizations</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      We provide enterprise solutions for news agencies, government institutions, and digital content verifiers.
                    </p>
                    <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors">
                      Request Demo
                    </button>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-yellow-300 text-sm">
                          <strong>Report False Positives:</strong> Help us improve by reporting any incorrect detections.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">BharatFakeGuard</span>
              </div>
              <p className="text-gray-400 text-sm">
                Protecting India's digital truth with advanced AI-powered deepfake detection.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">API Documentation</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Research Papers</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Contact Support</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Bug Reports</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Feature Requests</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 BharatFakeGuard. All rights reserved. Made with ❤️ for India's digital security.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
