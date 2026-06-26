import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, Cell, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter,
} from 'recharts';
import {
  Brain, Target, TrendingUp, Cpu, Zap, Award, Play, RotateCcw,
  CheckCircle2, AlertCircle, Activity, Gauge,
} from 'lucide-react';
import {
  modelResults, confusionMatrix, featureImportance, rocData,
  trainingCurve, pipelineStages, predict, PredictionInput,
} from '../data/predictionData';

const METRIC_COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];

export default function AIPrediction() {
  const [selectedModel, setSelectedModel] = useState(1); // Random Forest
  const [inputs, setInputs] = useState<PredictionInput>({
    featureA: 0.7, featureB: 0.5, featureC: 0.3, featureD: 0.6, featureE: 0.4,
  });
  const [prediction, setPrediction] = useState<{ prediction: string; probability: number } | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [activePipeline, setActivePipeline] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePipeline((p) => (p >= 6 ? 0 : p + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handlePredict = () => {
    setIsPredicting(true);
    setPrediction(null);
    setTimeout(() => {
      setPrediction(predict(inputs));
      setIsPredicting(false);
    }, 1200);
  };

  const resetPrediction = () => {
    setInputs({ featureA: 0.5, featureB: 0.5, featureC: 0.5, featureD: 0.5, featureE: 0.5 });
    setPrediction(null);
  };

  const bestModel = modelResults.reduce((best, m) => (m.accuracy > best.accuracy ? m : best), modelResults[0]);
  const currentModel = modelResults[selectedModel];

  // Radar data for current model
  const radarData = [
    { metric: 'Accuracy', value: currentModel.accuracy * 100, fullMark: 100 },
    { metric: 'Precision', value: currentModel.precision * 100, fullMark: 100 },
    { metric: 'Recall', value: currentModel.recall * 100, fullMark: 100 },
    { metric: 'F1 Score', value: currentModel.f1 * 100, fullMark: 100 },
  ];

  // Confusion matrix flat data
  const cmTotal = confusionMatrix.matrix.flat().reduce((a, b) => a + b, 0);
  const tn = confusionMatrix.matrix[0][0];
  const fp = confusionMatrix.matrix[0][1];
  const fn = confusionMatrix.matrix[1][0];
  const tp = confusionMatrix.matrix[1][1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3">
                <Brain className="w-3 h-3" />
                Machine Learning System
              </div>
              <h1 className="text-4xl font-bold mb-2">AI-Based Prediction System</h1>
              <p className="text-purple-200 max-w-2xl">
                Supervised machine learning model achieving ~82% prediction accuracy. 
                Feature engineering, preprocessing, model training, and evaluation pipelines 
                compared across multiple ML algorithms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-purple-200">Best Accuracy</div>
              <div className="text-2xl font-bold">{Math.round(bestModel.accuracy * 100)}%</div>
              <div className="text-xs text-purple-300 mt-1">{bestModel.algorithm}</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-purple-200">Algorithms Tested</div>
              <div className="text-2xl font-bold">{modelResults.length}</div>
              <div className="text-xs text-purple-300 mt-1">ML Models</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-purple-200">Pipeline Stages</div>
              <div className="text-2xl font-bold">6</div>
              <div className="text-xs text-purple-300 mt-1">End-to-End</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-purple-200">Target Accuracy</div>
              <div className="text-2xl font-bold">82%</div>
              <div className="text-xs text-purple-300 mt-1">Achieved ✓</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* ML Pipeline Visualization */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            ML Pipeline Workflow
          </h3>
          <p className="text-sm text-gray-500 mb-6">End-to-end machine learning pipeline stages</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {pipelineStages.map((stage, i) => (
              <div
                key={stage.name}
                className={`relative p-4 rounded-xl border-2 transition-all duration-500 ${
                  i <= activePipeline
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                  i <= activePipeline ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {i <= activePipeline ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <div className="text-sm font-bold text-gray-900 mb-1">{stage.name}</div>
                <div className="text-xs text-gray-500">{stage.duration}% of effort</div>
                <div className="text-xs text-gray-600 mt-2 leading-tight">{stage.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Comparison */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Algorithm Performance Comparison
            </h3>
            <p className="text-sm text-gray-500 mb-4">Click a bar to select a model for detailed analysis</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelResults} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 1]} stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
                <YAxis dataKey="algorithm" type="category" stroke="#94a3b8" fontSize={11} width={140} />
                <Tooltip formatter={(value: any) => [`${Math.round(Number(value) * 100)}%`, 'Accuracy']} />
                <Bar
                  dataKey="accuracy"
                  radius={[0, 8, 8, 0]}
                  barSize={28}
                  onClick={(_: any, i: number) => setSelectedModel(i)}
                  cursor="pointer"
                >
                  {modelResults.map((m, i) => (
                    <Cell
                      key={i}
                      fill={i === selectedModel ? '#8b5cf6' : m.color}
                      opacity={i === selectedModel ? 1 : 0.7}
                      stroke={i === selectedModel ? '#6d28d9' : 'none'}
                      strokeWidth={i === selectedModel ? 3 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Selected Model Radar */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Model Metrics</h3>
            <p className="text-sm text-purple-600 font-semibold mb-4">{currentModel.algorithm}</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Performance" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { label: 'Accuracy', value: currentModel.accuracy },
                { label: 'Precision', value: currentModel.precision },
                { label: 'Recall', value: currentModel.recall },
                { label: 'F1', value: currentModel.f1 },
              ].map((m, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-500">{m.label}</div>
                  <div className="text-sm font-bold" style={{ color: METRIC_COLORS[i] }}>{Math.round(m.value * 100)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Curves */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Training & Validation Accuracy
            </h3>
            <p className="text-sm text-gray-500 mb-4">Model accuracy over 20 training epochs</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trainingCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={12} label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0.5, 1]} stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
                <Tooltip formatter={(value: any) => [`${Math.round(Number(value) * 100)}%`]} />
                <Legend />
                <Line type="monotone" dataKey="trainingAcc" name="Training" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="validationAcc" name="Validation" stroke="#ec4899" strokeWidth={2.5} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-purple-600" />
              Loss Curve
            </h3>
            <p className="text-sm text-gray-500 mb-4">Cross-entropy loss decreasing over epochs</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trainingCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[0, 1]} stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="trainingLoss" name="Train Loss" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="validationLoss" name="Val Loss" stroke="#f59e0b" strokeWidth={2.5} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row: Confusion Matrix + Feature Importance + ROC */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Confusion Matrix */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Confusion Matrix
            </h3>
            <p className="text-sm text-gray-500 mb-4">Best model (XGBoost) predictions</p>
            <div className="flex items-center justify-center mb-4">
              <div>
                <div className="text-xs text-gray-500 text-center mb-2">Predicted →</div>
                <div className="grid grid-cols-[auto_1fr_1fr] gap-1 text-xs">
                  <div />
                  <div className="text-center font-semibold text-gray-700 py-2">Class 0</div>
                  <div className="text-center font-semibold text-gray-700 py-2">Class 1</div>

                  <div className="flex items-center font-semibold text-gray-700 px-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    Actual
                  </div>
                  <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">{tn}</div>
                    <div className="text-xs text-green-700">TN</div>
                  </div>
                  <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-700">{fp}</div>
                    <div className="text-xs text-red-700">FP</div>
                  </div>

                  <div />
                  <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-700">{fn}</div>
                    <div className="text-xs text-red-700">FN</div>
                  </div>
                  <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">{tp}</div>
                    <div className="text-xs text-green-700">TP</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <div className="font-bold text-green-700">{((tn + tp) / cmTotal * 100).toFixed(1)}%</div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-2 text-center">
                <div className="font-bold text-red-700">{((fp + fn) / cmTotal * 100).toFixed(1)}%</div>
                <div className="text-gray-600">Errors</div>
              </div>
            </div>
          </div>

          {/* Feature Importance */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Feature Importance
            </h3>
            <p className="text-sm text-gray-500 mb-4">Top 10 predictive features (XGBoost)</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickFormatter={(v) => `${v}`} />
                <YAxis dataKey="feature" type="category" stroke="#94a3b8" fontSize={10} width={70} />
                <Tooltip formatter={(value: any) => [Number(value).toFixed(2), 'Importance']} />
                <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ROC Curve */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              ROC Curve
            </h3>
            <p className="text-sm text-gray-500 mb-4">AUC: 0.88 · Excellent separability</p>
            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="fpr" name="False Positive Rate" domain={[0, 1]} stroke="#94a3b8" fontSize={10} tickFormatter={(v) => v.toFixed(1)} label={{ value: 'FPR', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#64748b' }} />
                <YAxis type="number" dataKey="tpr" name="True Positive Rate" domain={[0, 1]} stroke="#94a3b8" fontSize={10} tickFormatter={(v) => v.toFixed(1)} label={{ value: 'TPR', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="ROC" data={rocData} fill="#ec4899" line={{ stroke: '#ec4899', strokeWidth: 2 }} />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="text-center text-xs text-gray-500 mt-2">
              Diagonal: Random classifier (AUC = 0.5)
            </div>
          </div>
        </div>

        {/* Interactive Prediction Demo */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl p-6 mb-6 border border-purple-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Interactive Prediction Demo
          </h3>
          <p className="text-sm text-gray-600 mb-6">Adjust feature values and run a live prediction through the trained model</p>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Feature sliders */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-sm">Input Features</h4>
              {(['featureA', 'featureB', 'featureC', 'featureD', 'featureE'] as const).map((key, i) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="text-gray-700 font-medium">
                      Feature {String.fromCharCode(65 + i)}
                      <span className="text-xs text-gray-500 ml-2">
                        ({Math.round(featureImportance[i].importance * 100)}% importance)
                      </span>
                    </label>
                    <span className="text-purple-600 font-bold">{inputs[key].toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={inputs[key]}
                    onChange={(e) => setInputs({ ...inputs, [key]: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPredicting ? (
                    <><RotateCcw className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Play className="w-4 h-4" /> Run Prediction</>
                  )}
                </button>
                <button
                  onClick={resetPrediction}
                  className="px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Prediction output */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-inner">
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Model Output</h4>
              
              {!prediction && !isPredicting && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                  <Brain className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">Click "Run Prediction" to see the model output</p>
                  <p className="text-sm mt-2">The model will analyze your feature inputs and produce a prediction</p>
                </div>
              )}

              {isPredicting && (
                <div className="h-full flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
                  <p className="text-lg font-semibold text-gray-900">Running prediction...</p>
                  <div className="flex gap-1 mt-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}

              {prediction && !isPredicting && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-2xl ${
                    prediction.prediction.includes('Positive')
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      {prediction.prediction.includes('Positive')
                        ? <AlertCircle className="w-6 h-6 text-green-600" />
                        : <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      }
                      <span className="text-sm font-medium text-gray-600">Prediction Result</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{prediction.prediction}</div>
                    <div className="text-sm text-gray-600">Based on the input features provided</div>
                  </div>

                  {/* Probability bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-gray-700">Prediction Confidence</span>
                      <span className="font-bold text-purple-600">{prediction.probability}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.probability}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500">Model Used</div>
                      <div className="text-sm font-bold text-gray-900">XGBoost</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500">Inference Time</div>
                      <div className="text-sm font-bold text-gray-900">1.2s</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500">Confidence</div>
                      <div className="text-sm font-bold text-purple-600">{prediction.probability >= 70 ? 'High' : prediction.probability >= 50 ? 'Medium' : 'Low'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
