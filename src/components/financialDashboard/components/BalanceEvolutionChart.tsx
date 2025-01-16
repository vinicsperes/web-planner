import NoDataAlert from "@/components/NoDataAlert"
import { ChartSpline } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface Transaction {
    id: string
    type: "income" | "expense"
    amount: number
    date: string
}

export default function BalanceEvolutionChart({ transactions }: { transactions: Transaction[] }) {
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    let balance = 0
    const chartData = sortedTransactions.map((transaction) => {
        if (transaction.type === "income") {
            balance += transaction.amount
        } else {
            balance -= transaction.amount
        }

        return {
            date: new Date(transaction.date).toLocaleDateString(),
            balance: balance,
        };
    });

    return (
        <Card className="border bg-card dark:bg-card-dark rounded-xl">
            <CardHeader>
                <CardTitle>Receitas e Despesas Mensais</CardTitle>
            </CardHeader>
            <CardContent>
                {transactions.length > 0 ?
                    <ResponsiveContainer width="100%" height={300} className=''>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="balance"
                                stroke="#4CAF50"
                                dot={false}
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                                name="Saldo"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    :
                    <NoDataAlert icon={ChartSpline} text="Não há registros para construir o gráfico." />
                }
            </CardContent>
        </Card>
    );
}