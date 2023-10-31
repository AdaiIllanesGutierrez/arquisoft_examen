// src/infrastructure/payment-adapter.ts
import { IntentRepository } from "../interfaces/intent-repository";

export class PaymentAdapter implements IntentRepository {
  async generateIntent(token: string, productCode: string, amount: number): Promise<string> {
    //para generar un intent
    const intentKey = "intent_key"; 
    return intentKey;
  }

  async verifyPayment(cardNumber: string, cvv: string, expirationDate: string, intentKey: string): Promise<boolean> {
    // verificar el pago con un servicio externo
    const paymentSuccessful = true; 
    return paymentSuccessful;
  }
}

