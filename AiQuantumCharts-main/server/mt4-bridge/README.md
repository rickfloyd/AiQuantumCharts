# MT4 Webhook Bridge

A simple Node.js Express server to receive webhook alerts from MetaTrader 4 (MT4) or any trading platform.

## Usage

1. **Start the server:**
   ```sh
   node index.js
   ```
2. **Send a POST request to:**
   `http://<your-server>:8088/mt4-webhook`

3. **Payload Example:**
   ```json
   {
     "symbol": "EURUSD",
     "action": "BUY",
     "price": 1.2345,
     "lot": 0.1,
     "comment": "Signal from MT4"
   }
   ```

4. **Response:**
   ```json
   { "status": "ok", "received": true }
   ```

## Security
- Add authentication, IP whitelisting, or validation as needed for production.

## Customization
- Forward signals to other services, databases, or notification systems as needed.
