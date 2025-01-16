import NoDataAlert from "@/components/NoDataAlert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, PackageOpen } from 'lucide-react'

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  date: string
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const recentTransactions = sortedTransactions.slice(0, 5)

  return (
    <Card className="border bg-card dark:bg-card-dark rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ?
          <ul className="space-y-4">
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  R$ {transaction.amount.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          :
          <NoDataAlert icon={PackageOpen} text="Não há transações registradas ainda." />
        }

      </CardContent>
    </Card>
  )
}