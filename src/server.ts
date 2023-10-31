
import express from "express";
import bodyParser from "body-parser";
import { config } from "./shared/config";
import { GenerateIntentUseCase } from "./application/usecases/generate-intent";
import { VerifyPaymentUseCase } from "./application/usecases/verify-payment";
import { PaymentAdapter } from "./infraestructure/payment-adapter";
import { SmsAdapter } from "./infraestructure/sms-adapter";
import { PushNotificationAdapter } from "./infraestructure/push-notification-adapter";

const app = express();
const port = config.port;

app.use(bodyParser.json());

app.post("/generate-intent", (req, res) => {
  const { token, productCode, amount } = req.body;
  const intentRepository = new PaymentAdapter();
  const generateIntentUseCase = new GenerateIntentUseCase(intentRepository);
  generateIntentUseCase.generateIntent(token, productCode, amount).then((intentKey) => {
    res.json({ intentKey });
  });
});

app.post("/verify-payment", (req, res) => {
  const { cardNumber, cvv, expirationDate, intentKey } = req.body;
  const intentRepository = new PaymentAdapter();
  const verifyPaymentUseCase = new VerifyPaymentUseCase(intentRepository);
  verifyPaymentUseCase.verifyPayment(cardNumber, cvv, expirationDate, intentKey).then((paymentSuccessful) => {
    if (paymentSuccessful) {
      const smsAdapter = new SmsAdapter();
      const pushNotificationAdapter = new PushNotificationAdapter();
      // Envía SMS y notificaciones push
      smsAdapter.sendSms("local_phone", "Pago realizado exitosamente");
      pushNotificationAdapter.sendPushNotification("local_user_token", "Pago realizado exitosamente");
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
