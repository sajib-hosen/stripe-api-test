import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  // STRIPE https://dashboard.stripe.com/test/customers

  // Connected Accounts
  // https://stripe.com/docs/api/connected-accounts

  async createUser(newUser: any): Promise<any> {
    const stripeCustomer: Stripe.Customer =
      await this.stripeClient.customers.create({
        name: 'Jenny Rosen',
        email: 'jennyrosen@example.com',
      });
    return stripeCustomer;
  }

  async updateUser(userId: string) {
    const updatedUser: Promise<Stripe.Response<Stripe.Customer>> =
      this.stripeClient.customers.update(userId, {
        metadata: {
          order_no: '25478',
        },
        address: {
          line1:
            'House# 05, Road# 9/A, Sector# 05, Uttara, Dhaka-12300, Bangladesh',
        },
      });

    return updatedUser;
  }

  async getCustomer(userId: string) {
    const customer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer> =
      await this.stripeClient.customers.retrieve(userId);
    return customer;
  }

  async listOfCustomers(lim: number = 20) {
    const customers: Stripe.Response<Stripe.ApiList<Stripe.Customer>> =
      await this.stripeClient.customers.list({
        limit: lim,
      });

    return customers.data;
  }

  async deleteCustimer(customerId: string) {
    const deleteResponse: Stripe.Response<Stripe.DeletedCustomer> =
      await this.stripeClient.customers.del(customerId);
    return deleteResponse;
  }

  // Balance
  // https://stripe.com/docs/api/balance/balance_object

  async getBalance() {
    const balance: Stripe.Response<Stripe.Balance> =
      await this.stripeClient.balance.retrieve();
    return balance;
  }

  async getBalanceTransactions(lim: number = 20) {
    const transactions: Stripe.Response<
      Stripe.ApiList<Stripe.BalanceTransaction>
    > = await this.stripeClient.balanceTransactions.list({
      limit: lim,
    });
    return transactions;
  }

  async getATransaction(transId: string) {
    const transaction: Stripe.Response<Stripe.BalanceTransaction> =
      await this.stripeClient.balanceTransactions.retrieve(transId);
    return transaction;
  }

  // Payment Methods
  // https://stripe.com/docs/api/payment_intents

  async attachMethodToCuatomer(
    paymentMethod: Stripe.PaymentMethod,
    customerId: string,
  ) {
    const paymentMethodAttach: Stripe.Response<Stripe.PaymentMethod> =
      await this.stripeClient.paymentMethods.attach(paymentMethod.id, {
        customer: customerId,
      });

    return paymentMethodAttach;
  }

  async detuchMethodFCustomer(methodId: string) {
    const paymentMethod: Stripe.Response<Stripe.PaymentMethod> =
      await this.stripeClient.paymentMethods.detach(methodId);

    return paymentMethod;
  }

  async updateMethod(paymentMethodId: string) {
    const paymentMethod: Stripe.Response<Stripe.PaymentMethod> =
      await this.stripeClient.paymentMethods.update(paymentMethodId, {
        metadata: {
          order_id: '6735',
        },
      });

    return paymentMethod;
  }

  async getMethodByUser(customerId: string, methodId: string) {
    const paymentMethod: Stripe.Response<Stripe.PaymentMethod> =
      await this.stripeClient.customers.retrievePaymentMethod(
        customerId,
        methodId,
      );

    return paymentMethod;
  }

  async getPaymentMethod(methodId: string) {
    const paymentMethod: Stripe.Response<Stripe.PaymentMethod> =
      await this.stripeClient.paymentMethods.retrieve(methodId);

    return paymentMethod;
  }

  async paymentMethodList(customerId: string, lim: number = 10) {
    const paymentList: Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>> =
      await this.stripeClient.customers.listPaymentMethods(customerId, {
        type: 'card',
        limit: lim,
      });

    return paymentList;
  }

  // Bank Accounts
  // https://stripe.com/docs/api/customer_bank_accounts

  async createBankAccount(bankAccId: string, bankAccToken: string) {
    const bankAccount: Promise<Stripe.Response<Stripe.CustomerSource>> =
      this.stripeClient.customers.createSource(bankAccId, {
        source: bankAccToken,
      });

    return bankAccount;
  }

  async updateBankAccount(customerId: string, bankAcId: string) {
    const bankAccount: Stripe.Response<Stripe.CustomerSource> =
      await this.stripeClient.customers.updateSource(customerId, bankAcId, {
        metadata: {
          order_id: '6735',
        },
      });

    return bankAccount;
  }

  async deleteBankAccount(customerId: string, bankId: string) {
    const bankAccDelRes: Stripe.Response<
      Stripe.CustomerSource | Stripe.DeletedCustomerSource
    > = await this.stripeClient.customers.deleteSource(customerId, bankId);

    return bankAccDelRes;
  }

  async verifyBankAcc(customerId: string, bankId: string) {
    const bankAcc: Stripe.Response<Stripe.BankAccount> =
      await this.stripeClient.customers.verifySource(customerId, bankId, {
        amounts: [32, 45],
      });

    return bankAcc;
  }

  // Payment Inten
  // https://stripe.com/docs/api/payment_intents

  async createPaymentIntent(paymentMethodId: string) {
    const amount = 1000;
    const currency = 'usd';
    const userCustomerId = 'cus_Lh8BpVkOo5akHN';

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.create({
        amount: amount * 100,
        currency: currency,
        automatic_payment_methods: {
          enabled: true,
        },
        // customer: userCustomerId,
        // payment_method: paymentMethodId,
        // confirmation_method: 'manual', // For 3D Security
        // description: 'Buy Product',
      });

    return paymentIntent;
  }

  async updatePaymentIntent(paymentIntentId: string) {
    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.update(paymentIntentId, {
        metadata: {
          order_id: '45678',
        },
      });

    return paymentIntent;
  }

  async getPaymentIntent(paymentIntentId: string) {
    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.retrieve(paymentIntentId);

    return paymentIntent;
  }

  async geAllPaymentIntent(lim: number = 10) {
    const paymentIntents: Stripe.Response<
      Stripe.ApiList<Stripe.PaymentIntent>
    > = await this.stripeClient.paymentIntents.list({
      limit: lim,
    });

    return paymentIntents;
  }

  async cancelPaymentIntent(paymentIntentId: string) {
    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.cancel(paymentIntentId);

    return paymentIntent;
  }

  async confirmPayment(paymentMethodId: string, paymentIntentId: string) {
    const intent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
        return_url: 'https://www.example.com',
      });

    return intent;
  }

  // The Payout
  // https://stripe.com/docs/api/payouts/object

  async createPayout() {
    const payout: Stripe.Response<Stripe.Payout> =
      await this.stripeClient.payouts.create({
        amount: 1200,
        currency: 'usd',
      });

    return payout;
  }

  async updatePayout(payoutId: string) {
    const payout: Stripe.Response<Stripe.Payout> =
      await this.stripeClient.payouts.update(payoutId, {
        metadata: {
          order_id: '12548',
        },
      });

    return payout;
  }

  async getPayout(payoutId: string) {
    const payout: Stripe.Response<Stripe.Payout> =
      await this.stripeClient.payouts.retrieve(payoutId);

    return payout;
  }

  async getPayoutList(lim: number = 10) {
    const payouts: Stripe.Response<Stripe.ApiList<Stripe.Payout>> =
      await this.stripeClient.payouts.list({
        limit: lim,
      });

    return payouts;
  }

  async cancelPayout(payoutId: string) {
    const payout: Stripe.Response<Stripe.Payout> =
      await this.stripeClient.payouts.cancel(payoutId);

    return payout;
  }

  async reversePayout(payoutId: string) {
    const payout: Stripe.Response<Stripe.Payout> =
      await this.stripeClient.payouts.reverse(payoutId);

    return payout;
  }

  // Connect - Account
  // https://stripe.com/docs/api/accounts

  async createStAcc() {
    const account: Stripe.Response<Stripe.Account> =
      await this.stripeClient.accounts.create({
        type: 'custom',
        country: 'US',
        email: 'sajib.rosen@example.com',
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
      });
    return account;
  }

  async updateStAcc(stAccId: string) {
    const account: Stripe.Response<Stripe.Account> =
      await this.stripeClient.accounts.update(stAccId, {
        metadata: {
          order_id: '6735',
        },
      });
    return account;
  }

  async getStAccount(stAccId: string) {
    const account: Stripe.Response<Stripe.Account> =
      await this.stripeClient.accounts.retrieve(stAccId);

    return account;
  }

  async getStAccountsList(lim: number = 10) {
    const accounts: Stripe.Response<Stripe.ApiList<Stripe.Account>> =
      await this.stripeClient.accounts.list({
        limit: lim,
      });

    return accounts;
  }

  async deleteStAcc(stAccId: string) {
    const deletedRes: Stripe.Response<Stripe.DeletedAccount> =
      await this.stripeClient.accounts.del(stAccId);

    return deletedRes;
  }
}

// for STRIPE 14.12.2023
// 200	OK	Everything worked as expected.
// 400	Bad Request	The request was unacceptable, often due to missing a required parameter.
// 401	Unauthorized	No valid API key provided.
// 402	Request Failed	The parameters were valid but the request failed.
// 403	Forbidden	The API key doesn’t have permissions to perform the request.
// 404	Not Found	The requested resource doesn’t exist.
// 409	Conflict	The request conflicts with another request (perhaps due to using the same idempotent key).
// 429	Too Many Requests	Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.
// 500, 502, 503, 504	Server Errors	Something went wrong on Stripe’s end. (These are rare.)
