// src/application/usecases/generate-intent.ts
import { IntentRepository } from "../../interfaces/intent-repository";

export class GenerateIntentUseCase {
  constructor(private repository: IntentRepository) {}

  async generateIntent(token: string, productCode: string, amount: number): Promise<string> {
    return this.repository.generateIntent(token, productCode, amount);
  }
}
