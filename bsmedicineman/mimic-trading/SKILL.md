# Mimic Pro

Advanced real-time copy-trading skill that allows agents to intelligently mimic (or inversely mirror) the trading behavior of any wallet or token with configurable risk management, position sizing, and multi-chain support.

## Author
- **bsmedicineman**
- Base (EVM): `0xca822f91db3a764ec6dbc141e21115c4670dc92c`
- Solana: `AWZd4fMYiFMEHTjGgkTKqV5PHir712XaDwoMEgbUWurx`

## Capabilities

- Real-time monitoring of target wallets/tokens via WebSockets and on-chain events
- Intelligent position sizing (fixed, percentage of portfolio, risk-based, or supply-weighted)
- Direct mimic, inverse mimic (fade the leader), and hybrid strategies
- Automatic stop-loss, take-profit, and trailing stops
- 30-minute candle replication and momentum matching
- Supply-based mirroring ("match X% of supply bought/sold in last N minutes")
- Multi-chain support (**Base primary**, **Solana secondary**)
- Performance analytics, win-rate tracking, and drawdown protection
- Configurable risk parameters (max daily loss, per-trade exposure, volatility filters)
- 0.1% developer fee per executed trade

## Usage Examples

- "Start mimicking 0xLeaderAddress with 2% portfolio allocation and 8% stop loss"
- "Fade trader 0xABC... using inverse mimic with 1:2 risk reward"
- "Match 0.5% of the supply bought of token X in the last 30 minutes"
- "Replicate the 30-minute candle movement of token Y on token X"
- "Show performance report and win rate for my mimic strategy"

## Configuration Options

- `leader`: Target wallet or token address
- `follower`: Agent's trading wallet
- `amount`: Fixed amount, percentage of portfolio, or risk-based sizing
- `strategy`: `mimic`, `inverse`, `candle_match`, `supply_match`
- `stop_loss`, `take_profit`, `max_drawdown`, `timeframe`

## Requirements

- Bankr API key with trading permissions
- Sufficient USDC (Base) or SOL/USDC (Solana) balance
- Access to Base and/or Solana networks

## Technical Implementation

This skill is backed by a custom x402 endpoint (`mimic-pro-v3`). The handler accepts structured JSON payloads containing `leader`, `follower`, `amount`, and `side`. Real-time monitoring can leverage Bankr's infrastructure on both Base and Solana.

## Fees

**0.1%** of notional trade volume is sent to the skill developer on every executed trade:
- Base (EVM): `0xca822f91db3a764ec6dbc141e21115c4670dc92c`
- Solana: `AWZd4fMYiFMEHTjGgkTKqV5PHir712XaDwoMEgbUWurx`

## Risk Warning

Copy-trading involves substantial risk of loss. Past performance does not guarantee future results. Always use appropriate risk parameters and only deploy capital you can afford to lose.
