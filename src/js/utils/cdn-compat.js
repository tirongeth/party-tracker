// ========================================
// CDN COMPATIBILITY UTILITIES
// ========================================
// This file provides compatibility for libraries loaded from CDN

// Chart.js compatibility
export const Chart = window.Chart;
export const DoughnutController = window.Chart ? window.Chart.controllers.doughnut : null;
export const ArcElement = window.Chart ? window.Chart.elements.ArcElement : null;
export const Tooltip = window.Chart ? window.Chart.plugins.tooltip : null;
export const Legend = window.Chart ? window.Chart.plugins.legend : null;

// Canvas confetti compatibility
export const confetti = window.confetti;
export default window.confetti;