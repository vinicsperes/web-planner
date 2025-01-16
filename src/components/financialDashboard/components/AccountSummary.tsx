import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  date: string
}

interface AccountSummaryProps {
  transactions: Transaction[]
}

export function AccountSummary({ transactions }: AccountSummaryProps) {
  const totalBalance = transactions.reduce((acc, transaction) =>
    transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount, 0
  )

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  const summaryItems = [
    { title: "Saldo Total", amount: totalBalance, icon: DollarSign, gradient: "from-blue-500 to-blue-300" },
    { title: "Despesas", amount: totalExpenses, icon: TrendingDown, gradient: "from-red-500 to-red-300" },
    { title: "Receitas", amount: totalIncome, icon: TrendingUp, gradient: "from-green-500 to-green-300" },
    { title: "Economia", amount: totalIncome - totalExpenses, icon: Wallet, gradient: "from-yellow-500 to-yellow-300" },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {summaryItems.map((item, index) => (
        <Card key={index} className="overflow-hidden border bg-card dark:bg-card-dark rounded-xl">
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.title}</p>
              <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              R$ {item.amount.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}