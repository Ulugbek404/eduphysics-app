import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Real-time Ohm's Law Graph Component
 * Displays I vs U relationship using Canvas API
 */
export default function OhmLawGraph({ voltage, resistance, current }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Graph dimensions
        const padding = 50;
        const graphWidth = rect.width - padding * 2;
        const graphHeight = rect.height - padding * 2;

        // Draw axes
        drawAxes(ctx, padding, rect.width, rect.height, graphWidth, graphHeight);

        // Draw grid
        drawGrid(ctx, padding, graphWidth, graphHeight, voltage);

        // Draw Ohm's Law line
        drawOhmLine(ctx, padding, graphWidth, graphHeight, voltage, resistance);

        // Draw current point
        drawCurrentPoint(ctx, padding, graphWidth, graphHeight, voltage, current);

        // Draw labels
        drawLabels(ctx, padding, rect.width, rect.height, voltage, resistance, current);

    }, [voltage, resistance, current]);

    const drawAxes = (ctx, padding, width, height, graphWidth, graphHeight) => {
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;

        // X-axis (Voltage)
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Y-axis (Current)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();

        // Arrow heads
        ctx.fillStyle = '#64748b';

        // X-axis arrow
        ctx.beginPath();
        ctx.moveTo(width - padding, height - padding);
        ctx.lineTo(width - padding - 10, height - padding - 5);
        ctx.lineTo(width - padding - 10, height - padding + 5);
        ctx.fill();

        // Y-axis arrow
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding - 5, padding + 10);
        ctx.lineTo(padding + 5, padding + 10);
        ctx.fill();
    };

    const drawGrid = (ctx, padding, graphWidth, graphHeight, maxVoltage) => {
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 5]);

        // Vertical grid lines
        for (let i = 1; i <= 10; i++) {
            const x = padding + (graphWidth / 10) * i;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, padding + graphHeight);
            ctx.stroke();
        }

        // Horizontal grid lines
        for (let i = 1; i <= 10; i++) {
            const y = padding + (graphHeight / 10) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + graphWidth, y);
            ctx.stroke();
        }

        ctx.setLineDash([]);
    };

    const drawOhmLine = (ctx, padding, graphWidth, graphHeight, maxVoltage, resistance) => {
        if (resistance === 0) return;

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Draw line from (0,0) to (maxVoltage, maxVoltage/R)
        const maxCurrent = maxVoltage / resistance;

        for (let v = 0; v <= maxVoltage; v += maxVoltage / 100) {
            const i = v / resistance;
            const x = padding + (v / maxVoltage) * graphWidth;
            const y = padding + graphHeight - (i / maxCurrent) * graphHeight;

            if (v === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#3b82f6';
        ctx.stroke();
        ctx.shadowBlur = 0;
    };

    const drawCurrentPoint = (ctx, padding, graphWidth, graphHeight, maxVoltage, current) => {
        const maxCurrent = maxVoltage / (voltage / current || 1);
        const x = padding + (voltage / maxVoltage) * graphWidth;
        const y = padding + graphHeight - (current / maxCurrent) * graphHeight;

        // Outer glow
        ctx.fillStyle = '#ef4444';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ef4444';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner circle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(`(${voltage.toFixed(1)}V, ${current.toFixed(2)}A)`, x + 12, y - 8);
    };

    const drawLabels = (ctx, padding, width, height, voltage, resistance, current) => {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Inter, sans-serif';

        // X-axis label
        ctx.fillText('Kuchlanish (V)', width / 2 - 50, height - 10);

        // Y-axis label
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Tok kuchi (A)', -50, 0);
        ctx.restore();

        // Formula
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText(`I = U / R = ${voltage}V / ${resistance}Ω = ${current.toFixed(2)}A`, padding, 30);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
            ref={containerRef}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    📊 I vs U Grafigi
                </h3>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-0.5 bg-blue-500"></div>
                        <span className="text-slate-400">Ohm qonuni</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-slate-400">Joriy nuqta</span>
                    </div>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                className="w-full h-[400px] rounded-xl"
                style={{ imageRendering: 'crisp-edges' }}
            />

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/30">
                    <div className="text-xs text-blue-400 mb-1">Kuchlanish</div>
                    <div className="text-xl font-bold text-white">{voltage.toFixed(1)} V</div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/30">
                    <div className="text-xs text-purple-400 mb-1">Qarshilik</div>
                    <div className="text-xl font-bold text-white">{resistance.toFixed(1)} Ω</div>
                </div>
                <div className="bg-green-500/10 rounded-xl p-3 border border-green-500/30">
                    <div className="text-xs text-green-400 mb-1">Tok kuchi</div>
                    <div className="text-xl font-bold text-white">{current.toFixed(2)} A</div>
                </div>
            </div>
        </motion.div>
    );
}
