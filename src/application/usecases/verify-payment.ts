// src/application/usecases/verify-payment.ts
import { IntentRepository } from "../../interfaces/intent-repository";

export class VerifyPaymentUseCase {
  constructor(private repository: IntentRepository) {}

  async verifyPayment(cardNumber: string, cvv: string, expirationDate: string, intentKey: string): Promise<boolean> {
    return this.repository.verifyPayment(cardNumber, cvv, expirationDate, intentKey);
  }
}
