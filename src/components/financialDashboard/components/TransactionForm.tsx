import { useState } from "react"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  date: string
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !description) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString(),
    }
    onAddTransaction(newTransaction)
    setAmount("")
    setDescription("")
    toast({
      title: "Sucesso",
      description: "Transação registrada com sucesso!",
    })
  }

  return (
    <Card className="border bg-card dark:bg-card-dark rounded-xl max-w-md mx-auto sm:p-4 p-3">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
          Adicionar Transação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup
            value={type}
            onValueChange={(value) => setType(value as "income" | "expense")}
            className="flex flex-wrap space-x-4 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expense" id="expense" />
              <Label htmlFor="expense" className="flex items-center space-x-2 cursor-pointer">
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
                <span>Despesa</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="income" id="income" />
              <Label htmlFor="income" className="flex items-center space-x-2 cursor-pointer">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span>Receita</span>
              </Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag">Tag</Label>
            <Input
              id="tag"
              placeholder="Digite o tipo de transação"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Registrar Transação
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
