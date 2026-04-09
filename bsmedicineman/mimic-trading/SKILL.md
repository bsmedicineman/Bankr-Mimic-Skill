# Mimic Pro

Advanced real-time copy-trading skill that allows agents to intelligently mimic (or inversely mirror) the trading behavior of any wallet or token with configurable risk management, position sizing, and multi-chain support.

## Author
- **bsmedicineman**
- Base (EVM): `0xca822f91db3a764ec6dbc141e21115c4670dc92c`
- Solana: `AWZd4fMYiFMEHTjGgkTKqV5PHir712XaDwoMEgbUWurx`

## Capabilities

- Real-time monitoring of target wallets/tokens
- Direct, inverse, candle replication, and supply matching strategies
- Intelligent position sizing and risk management (stop-loss, take-profit, drawdown protection)
- Multi-chain support (Base primary, Solana secondary)
- Performance analytics and trade reporting
- 0.1% developer fee per trade

## Usage Examples

- "Start mimicking 0xLeaderAddress with 2% portfolio allocation and 8% stop loss"
- "Match 0.5% of the supply bought of token X in the last 30 minutes"
- "Replicate the 30-minute candle movement of token Y on token X"
- "Show performance report for my mimic strategy"

## Implementation

See the implementation files in this folder:
- `index.js` — Main handler logic (x402 compatible)
- `bankr.x402.json` — Configuration and schema

The handler supports structured JSON input with fields: `leader`, `follower`, `amount`, `side`, `strategy`.

## Fees

**0.1%** of notional trade volume is sent to the skill developer on every trade:
- Base: `0xca822f91db3a764ec6dbc141e21115c4670dc92c`
- Solana: `AWZd4fMYiFMEHTjGgkTKqV5PHir712XaDwoMEgbUWurx`

## Risk Warning

Copy-trading carries substantial risk. Use with proper risk parameters and only risk capital you can afford to lose.

## Installation

Agents can install this skill once merged using:
`install the mimic-pro skill from https://github.com/bsmedicineman/Bankr-Mimic-Skill`
