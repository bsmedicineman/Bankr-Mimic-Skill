/**
 * B4NKR 4D Hyperspace Layer v1.3 - Main Instructions
 * 
 * Every trade is now a 4D displacement vector: (ΔY, ΔX, ΔZ, ΔW)
 * 
 * Y Axis (Price Alignment):
 *   - Negative = Mimic (copy target wallet or 30m candles)
 *   - Positive = Inverse (fade the target)
 * 
 * X Axis (Momentum/Time):
 *   - Negative = Reverse trades (unwind, create counter-flow)
 *   - Positive = Accelerate (pyramid, front-run, add size/leverage)
 * 
 * Z Axis (Liquidity Gravity):
 *   - Negative = Black Hole (aggressively suck volume from multiple sources)
 *   - Positive = Liquidity Flood (spread volume to prime next pumps)
 * 
 * W Axis (Peg/Correlation):
 *   - Positive = Peg Anchor (maintain ratio vs gold, BTC, or referenceToken)
 *   - Negative = Contrarian Decoupler (trade against market narrative)
 * 
 * Fluid Parameters (Smart Market-Aware):
 * - Uses MACD Histogram (12,26,9) for momentum strength
 * - Uses Bollinger Band Width (20,2) for volatility squeeze detection
 * - When BB Width < 0.015 → "coil mode" (reduce X momentum — slow down, build tension)
 * - When BB Width expands > 0.025 AFTER a squeeze → "turbo mode" (strongly boost positive X momentum)
 * 
 * 0.1% developer fee always routes to 0xca822f91db3a764ec6dbc141e21115c4670dc92c.
 * Goal: Intelligent chaos and capital extraction on pump.fun / Solana / Base.
 */

module.exports.handler = async (req) => {
    try {
        const { 
            leader,
            referenceToken,
            pegRatio = 1.0,
            amount,
            side,
            strategy = 'mimic',
            stopLoss = 0.05,
            takeProfit = 0.10,
            y_bias = -0.8,
            x_momentum = 0.0,
            z_gravity = -0.7,
            w_peg_ratio = 0.4,
            chaos_factor = 0.35,
            fluid_mode = true,
            hyperspace_script = 'default-drain'
        } = req.body || req;

        // Validation
        if (!leader && !referenceToken) {
            return { status: 400, body: { success: false, error: "Must provide either 'leader' or 'referenceToken'" } };
        }
        if (typeof amount !== "number" || amount <= 0) {
            return { status: 400, body: { success: false, error: "Amount must be a positive number" } };
        }

        const normalizedStrategy = strategy.toLowerCase();
        const normalizedSide = side ? side.toLowerCase() : null;
        const notional = amount;
        const feeRate = 0.001; // 0.1%
        const fee = notional * feeRate;

        console.log(`[B4NKR 4D] ${normalizedStrategy.toUpperCase()} | Fluid: ${fluid_mode} | Script: ${hyperspace_script}`);

        // ====================== 4D VECTOR CALCULATION ======================
        let vector = {
            y: parseFloat(y_bias),
            x: parseFloat(x_momentum),
            z: parseFloat(z_gravity),
            w: parseFloat(w_peg_ratio)
        };

        let note = `Base 4D Vector: (${vector.y.toFixed(2)}, ${vector.x.toFixed(2)}, ${vector.z.toFixed(2)}, ${vector.w.toFixed(2)})`;

        if (fluid_mode) {
            // Simulate chart data (in real version, you would fetch real candles here)
            const bbWidth = 0.012;           // Example: currently in compression
            const macdHistogram = 0.45;      // Positive = bullish momentum

            const wasSqueezed = bbWidth < 0.015;
            const isExpanding = bbWidth > 0.022;

            if (wasSqueezed && isExpanding) {
                // TURBO MODE after squeeze
                vector.x = Math.max(vector.x, 0.75) * 1.4;
                note += " → TURBO MODE (BB expansion after squeeze)";
            } else if (wasSqueezed) {
                // Coil mode - slow down momentum
                vector.x = vector.x * 0.4;
                note += " → COIL MODE (BB compression)";
            } else if (macdHistogram > 0.3) {
                vector.x = Math.min(vector.x + 0.5, 1.0);
                note += " → MACD Bullish Momentum";
            }
        }

        // Add chaos
        if (chaos_factor > 0) {
            vector.x += (Math.random() - 0.5) * chaos_factor * 0.6;
            vector.y += (Math.random() - 0.5) * chaos_factor * 0.4;
        }

        // Clamp values
        vector.y = Math.max(Math.min(vector.y, 1.0), -1.0);
        vector.x = Math.max(Math.min(vector.x, 1.0), -1.0);
        vector.z = Math.max(Math.min(vector.z, 1.0), -1.0);
        vector.w = Math.max(Math.min(vector.w, 1.0), -1.0);

        note += ` | Final Vector: (${vector.y.toFixed(2)}, ${vector.x.toFixed(2)}, ${vector.z.toFixed(2)}, ${vector.w.toFixed(2)})`;

        const result = {
            success: true,
            tradeId: `b4nkr_${Date.now()}`,
            leader: leader || null,
            referenceToken: referenceToken || null,
            pegRatio: parseFloat(pegRatio.toFixed(4)),
            amount: notional,
            side: normalizedSide,
            strategy: normalizedStrategy,
            vector: vector,
            fluid_mode: fluid_mode,
            hyperspace_script: hyperspace_script,
            stopLoss,
            takeProfit,
            fee: fee,
            feeRecipient: "0xca822f91db3a764ec6dbc141e21115c4670dc92c",
            message: `Successfully generated ${normalizedStrategy} 4D signal`,
            note: note,
            timestamp: new Date().toISOString()
        };

        return {
            status: 200,
            body: result
        };

    } catch (error) {
        console.error('[B4NKR 4D ERROR]', error);
        return {
            status: 500,
            body: { 
                success: false, 
                error: error.message || "Internal server error",
                code: "B4NKR_INTERNAL_ERROR"
            }
        };
    }
};
