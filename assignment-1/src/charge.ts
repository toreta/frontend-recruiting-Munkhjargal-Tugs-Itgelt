export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: string;
  percentage?: number;
  amount?: number;
};

export function charge(invoice: Invoice, payments: Payment[]) {
  const total = invoice.total;
  let deposit = 0;

  const nonCashPayments = payments.filter((payment) => payment.type !== 'CASH');
  const cashPayments = payments.filter((payment) => payment.type === 'CASH');

  for (const nonCashPayment of nonCashPayments) {
    if (nonCashPayment.type !== 'COUPON') {
      throw new Error('UnknownPaymentType');
    }
    if (nonCashPayment.percentage != null) {
      deposit += Math.floor(total * (nonCashPayment.percentage / 100));
      continue;
    }
    deposit += nonCashPayment.amount || 0;
  }
  for (const cashPayment of cashPayments) {
    if (deposit >= total) {
      throw new Error('OverCharge');
    }
    deposit += cashPayment.amount || 0;
  }

  if (total > deposit) {
    throw new Error('Shortage');
  }
  const isCoupon = cashPayments.length === 0;

  if (isCoupon) return { total, deposit, change: 0 };
  return { total: total, deposit: deposit, change: deposit - total };
}
