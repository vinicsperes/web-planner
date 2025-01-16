"use client"
import { useState } from "react"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { AccountSummary } from "./components/AccountSummary"
import { TransactionForm } from "./components/TransactionForm"
import { RecentTransactions } from "./components/RecentTransactions"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Header } from "@/components/header/Header"

import IncomeExpensePieChart from "./components/IncomeExpensePieChart"
import BalanceEvolutionChart from "./components/BalanceEvolutionChart"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  date: string
}

export default function FinancialDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions])
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-col px-48 gap-4">
          <AccountSummary transactions={transactions} />
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-3 space-y-4">
              <TransactionForm onAddTransaction={addTransaction} />
            </div>
            <div className="col-span-7">
              <RecentTransactions transactions={transactions} />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-7 space-y-4">
              <BalanceEvolutionChart transactions={transactions} />
            </div>
            <div className="col-span-3">
              <IncomeExpensePieChart transactions={transactions} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
