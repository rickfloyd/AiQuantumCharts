// Quantum Performance Engine: Persistent Alert Engine (Node.js)
// Stores alerts in DB, checks every tick, triggers notifications
import { EventEmitter } from 'events';

export interface Alert {
  symbol: string;
  condition: string; // e.g. 'price > 1.0850'
  userId: string;
  notifyMethod: 'email' | 'webhook';
  conditionValue: number;
}

export interface AlertEvent {
  alertId: string;
  event: 'created' | 'triggered' | 'missed' | 'modified';
  timestamp: number;
  reason?: string;
}

export class AlertsEngine extends EventEmitter {
  private alerts: Alert[] = [];
  private events: AlertEvent[] = [];

  addAlert(alert: Alert) {
    this.alerts.push(alert);
    this.events.push({
      alertId: alert.userId + '-' + alert.symbol,
      event: 'created',
      timestamp: Date.now(),
    });
  }

  processTick(tick: { symbol: string; price: number }) {
    for (const alert of this.alerts) {
      if (alert.symbol === tick.symbol) {
        if (eval(`${tick.price} ${alert.condition.replace('price', '')}`)) {
          this.emit('trigger', alert);
          this.events.push({
            alertId: alert.userId + '-' + alert.symbol,
            event: 'triggered',
            timestamp: Date.now(),
          });
        }
      }
    }
  }

  getAuditTrail(alertId: string) {
    return this.events.filter(e => e.alertId === alertId);
  }
}
