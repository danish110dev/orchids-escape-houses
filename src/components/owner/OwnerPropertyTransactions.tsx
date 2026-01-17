"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, MapPin, Calendar, Users, Home, TrendingUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OwnerTransaction {
  id: number;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string | null;
  paymentMethodBrand: string | null;
  paymentMethodLast4: string | null;
  description: string | null;
  billingReason: string | null;
  createdAt: string;
  receiptUrl: string | null;
  bookingId: number | null;
  propertyName: string | null;
  propertyLocation: string | null;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  numberOfGuests: number | null;
  bookingStatus: string | null;
  totalPrice: number | null;
  depositAmount: number | null;
  balanceAmount: number | null;
  occasion: string | null;
  propertyId: number | null;
}

interface Stats {
  totalTransactions: number;
  totalRevenue: number;
  totalBookings: number;
  pendingPayments: number;
  depositPayments: number;
  balancePayments: number;
}

export function OwnerPropertyTransactions() {
  const [transactions, setTransactions] = useState<OwnerTransaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [propertyCount, setPropertyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/owner/transactions");
      const data = await response.json();

      if (data.success) {
        console.log("Owner Property Transactions data received:", data);
        setTransactions(data.transactions);
        setStats(data.stats);
        setPropertyCount(data.propertyCount || 0);
      } else {
        setError(data.error || "Failed to fetch property transactions");
      }
    } catch (err) {
      console.error("Error fetching owner property transactions:", err);
      setError("An error occurred while fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "destructive" | "secondary" | "outline"; label: string }> = {
      succeeded: { variant: "default", label: "Paid" },
      pending: { variant: "secondary", label: "Pending" },
      failed: { variant: "destructive", label: "Failed" },
      requires_payment_method: { variant: "destructive", label: "Payment Required" },
      processing: { variant: "secondary", label: "Processing" },
    };

    const statusInfo = statusMap[status] || { variant: "outline" as const, label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getPaymentTypeBadge = (billingReason: string | null) => {
    if (billingReason === "booking_deposit") {
      return <Badge variant="secondary">Deposit</Badge>;
    }
    if (billingReason === "booking_balance") {
      return <Badge variant="outline">Balance</Badge>;
    }
    return null;
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your property transactions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">{error}</p>
        <Button onClick={fetchTransactions} className="mt-2" variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Property Bookings & Payments</h2>
        <p className="text-muted-foreground mt-1">
          View all payments received for bookings at your {propertyCount} {propertyCount === 1 ? 'property' : 'properties'}
        </p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalRevenue, "GBP")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                From {stats.totalBookings} bookings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Unique bookings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Deposits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.depositPayments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                30% deposits
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Balances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.balancePayments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                70% balances
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats.pendingPayments}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting payment
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>
            All payments received for bookings at your properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <CreditCard className="mx-auto h-16 w-16 opacity-50" />
              <p className="mt-4 text-lg font-medium">No payments yet</p>
              <p className="mt-1 text-sm">
                Payments will appear here once guests book your properties
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>
                  Payment history for all your property bookings
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Guest Details</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDateTime(transaction.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col min-w-[150px]">
                          <span className="font-medium flex items-center gap-1">
                            <Home className="h-3 w-3" />
                            {transaction.propertyName}
                          </span>
                          {transaction.propertyLocation && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {transaction.propertyLocation}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col min-w-[180px]">
                          <span className="font-medium">{transaction.guestName}</span>
                          <span className="text-sm text-muted-foreground">
                            {transaction.guestEmail}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            {transaction.numberOfGuests && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {transaction.numberOfGuests} guests
                              </span>
                            )}
                            {transaction.occasion && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                                {transaction.occasion}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {transaction.checkInDate && (
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1 text-sm font-medium">
                              <Calendar className="h-3 w-3" />
                              {formatDate(transaction.checkInDate)}
                            </span>
                            {transaction.checkOutDate && (
                              <span className="text-xs text-muted-foreground">
                                to {formatDate(transaction.checkOutDate)}
                              </span>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {getPaymentTypeBadge(transaction.billingReason)}
                      </TableCell>
                      <TableCell className="font-bold text-green-600">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>
                        {transaction.paymentMethod && (
                          <div className="flex items-center gap-1">
                            <span className="capitalize">
                              {transaction.paymentMethodBrand || transaction.paymentMethod}
                            </span>
                            {transaction.paymentMethodLast4 && (
                              <span className="text-muted-foreground">
                                •••• {transaction.paymentMethodLast4}
                              </span>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
