// Simple script to create placeholder icons
const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#00ff88');
    gradient.addColorStop(1, '#0066ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Circle
    ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2 * 0.8, 0, Math.PI * 2);
    ctx.fill();
    
    // Text
    ctx.fillStyle = '#00ff88';
    ctx.font = `bold ${size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BL', size/2, size/2);
    
    // Save
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icon-${size}x${size}.png`, buffer);
    console.log(`Created icon-${size}x${size}.png`);
});