// src/interfaces/intent-repository.ts
import { Intent } from "../domain/intent";

export interface IntentRepository {
  generateIntent(token: string, productCode: string, amount: number): Promise<string>;
  verifyPayment(cardNumber: string, cvv: string, expirationDate: string, intentKey: string): Promise<boolean>;
}
