import { CircleDashed } from "lucide-react"
import NoDataAlert from "@/components/NoDataAlert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  date: string
}

export default function IncomeExpensePieChart({ transactions }: { transactions: Transaction[] }) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  const pieData = [
    { name: "Receitas", value: totalIncome },
    { name: "Despesas", value: totalExpense },
  ]

  return (
    <Card className="border bg-card dark:bg-card-dark rounded-xl">
      <CardHeader>
        <CardTitle>Visão Geral Financeira</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ?
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                <Cell fill="#10B981" />
                <Cell fill="#EF4444" />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          :
          <NoDataAlert icon={CircleDashed} text="Não há registros para construir o gráfico." />
        }
      </CardContent>
    </Card>
  )
}
