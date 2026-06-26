// Simulated ML prediction data
export interface ModelResult {
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  trainingTime: number;
  color: string;
}

export const modelResults: ModelResult[] = [
  { algorithm: 'Logistic Regression', accuracy: 0.76, precision: 0.74, recall: 0.72, f1: 0.73, trainingTime: 2.1, color: '#8b5cf6' },
  { algorithm: 'Random Forest', accuracy: 0.82, precision: 0.83, recall: 0.80, f1: 0.81, trainingTime: 8.5, color: '#ec4899' },
  { algorithm: 'XGBoost', accuracy: 0.85, precision: 0.86, recall: 0.83, f1: 0.84, trainingTime: 12.3, color: '#06b6d4' },
  { algorithm: 'SVM', accuracy: 0.78, precision: 0.77, recall: 0.75, f1: 0.76, trainingTime: 15.7, color: '#10b981' },
  { algorithm: 'Neural Network', accuracy: 0.84, precision: 0.85, recall: 0.82, f1: 0.83, trainingTime: 45.2, color: '#f59e0b' },
  { algorithm: 'K-Nearest Neighbors', accuracy: 0.72, precision: 0.71, recall: 0.70, f1: 0.70, trainingTime: 1.2, color: '#ef4444' },
];

// Confusion matrix data for the best model (XGBoost)
export const confusionMatrix = {
  labels: ['Class 0', 'Class 1'],
  matrix: [
    [425, 75],   // True negatives, False positives
    [65, 435],   // False negatives, True positives
  ],
};

// Feature importance (top 10 features)
export const featureImportance = [
  { feature: 'Feature_A', importance: 0.28 },
  { feature: 'Feature_B', importance: 0.22 },
  { feature: 'Feature_C', importance: 0.15 },
  { feature: 'Feature_D', importance: 0.11 },
  { feature: 'Feature_E', importance: 0.08 },
  { feature: 'Feature_F', importance: 0.06 },
  { feature: 'Feature_G', importance: 0.04 },
  { feature: 'Feature_H', importance: 0.03 },
  { feature: 'Feature_I', importance: 0.02 },
  { feature: 'Feature_J', importance: 0.01 },
];

// ROC curve data
export const rocData = [
  { fpr: 0.0, tpr: 0.0, threshold: 1.0 },
  { fpr: 0.02, tpr: 0.15, threshold: 0.9 },
  { fpr: 0.05, tpr: 0.35, threshold: 0.8 },
  { fpr: 0.08, tpr: 0.55, threshold: 0.7 },
  { fpr: 0.12, tpr: 0.70, threshold: 0.6 },
  { fpr: 0.18, tpr: 0.82, threshold: 0.5 },
  { fpr: 0.25, tpr: 0.88, threshold: 0.4 },
  { fpr: 0.35, tpr: 0.93, threshold: 0.3 },
  { fpr: 0.50, tpr: 0.96, threshold: 0.2 },
  { fpr: 0.70, tpr: 0.98, threshold: 0.1 },
  { fpr: 1.0, tpr: 1.0, threshold: 0.0 },
];

// Training/validation accuracy over epochs
export const trainingCurve = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  trainingAcc: 0.65 + (0.85 - 0.65) * (1 - Math.exp(-i / 5)) + (Math.random() - 0.5) * 0.01,
  validationAcc: 0.62 + (0.82 - 0.62) * (1 - Math.exp(-i / 5)) + (Math.random() - 0.5) * 0.02,
  trainingLoss: 0.8 * Math.exp(-i / 6) + 0.15,
  validationLoss: 0.85 * Math.exp(-i / 6) + 0.18,
}));

// Pipeline stages
export const pipelineStages = [
  { name: 'Data Collection', duration: 15, description: 'Gathered 10,000+ labeled records from multiple sources' },
  { name: 'Data Cleaning', duration: 20, description: 'Handled missing values, outliers, and duplicates' },
  { name: 'Feature Engineering', duration: 25, description: 'Created meaningful features and encoded categorical variables' },
  { name: 'Preprocessing', duration: 10, description: 'Scaled features, split train/test sets (80/20)' },
  { name: 'Model Training', duration: 20, description: 'Trained 6 ML algorithms with cross-validation' },
  { name: 'Evaluation', duration: 10, description: 'Evaluated using accuracy, precision, recall, F1, AUC-ROC' },
];

// Prediction input features
export interface PredictionInput {
  featureA: number;
  featureB: number;
  featureC: number;
  featureD: number;
  featureE: number;
}

// Simple simulated prediction function
export function predict(input: PredictionInput): { prediction: string; probability: number } {
  const { featureA, featureB, featureC, featureD, featureE } = input;
  const score = 0.35 * featureA + 0.28 * featureB + 0.18 * featureC + 0.12 * featureD + 0.07 * featureE;
  const probability = 1 / (1 + Math.exp(-score * 2 + 1));
  return {
    prediction: probability >= 0.5 ? 'Positive (Class 1)' : 'Negative (Class 0)',
    probability: Math.round(probability * 100),
  };
}
