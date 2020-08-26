import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string
  value: number,
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((acc: Balance, transaction: Transaction) => {
      const income = (transaction.type === 'income') ? acc.income + transaction.value : acc.income + 0
      const outcome = (transaction.type === 'outcome') ? acc.outcome + transaction.value : acc.outcome + 0
      return {
        income,
        outcome,
        total: income - outcome
      }
    }, { income: 0, outcome: 0, total: 0 } as Balance)

    return balance
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
