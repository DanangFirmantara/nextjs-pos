'use client';

import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { isLoading } = useProtectedRoute();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Welcome, {user?.name}! 👋
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Selamat datang di POS System Dashboard
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Card 1 */}
        <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              boxShadow: '0 5px 20px rgba(102, 126, 234, 0.3)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Penjualan
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Rp 5.2M
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +12% dari bulan lalu
              </Typography>
            </CardContent>
          </Card>

        {/* Card 2 */}
        <Card
            sx={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              boxShadow: '0 5px 20px rgba(245, 87, 108, 0.3)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Transaksi
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                1,234
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +8% dari bulan lalu
              </Typography>
            </CardContent>
          </Card>

        {/* Card 3 */}
        <Card
            sx={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              boxShadow: '0 5px 20px rgba(79, 172, 254, 0.3)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Produk Terjual
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                4,567
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +15% dari bulan lalu
              </Typography>
            </CardContent>
          </Card>

        {/* Card 4 */}
        <Card
            sx={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
              boxShadow: '0 5px 20px rgba(250, 112, 154, 0.3)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Baru
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                187
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +5% dari bulan lalu
              </Typography>
            </CardContent>
          </Card>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
        }}
      >
        {/* Recent Transactions */}
        <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Transaksi Terbaru
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { id: 1, date: '26 Feb 2026', amount: 'Rp 450.000', status: 'Selesai' },
                  { id: 2, date: '25 Feb 2026', amount: 'Rp 320.000', status: 'Selesai' },
                  { id: 3, date: '24 Feb 2026', amount: 'Rp 125.000', status: 'Pending' },
                  { id: 4, date: '23 Feb 2026', amount: 'Rp 780.000', status: 'Selesai' },
                  { id: 5, date: '22 Feb 2026', amount: 'Rp 560.000', status: 'Selesai' },
                ].map((transaction) => (
                  <Box
                    key={transaction.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      borderBottom: '1px solid #eee',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Transaction #{transaction.id}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {transaction.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                        {transaction.amount}
                      </Typography>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor:
                            transaction.status === 'Selesai' ? '#e8f5e9' : '#fff3e0',
                          color:
                            transaction.status === 'Selesai' ? '#2e7d32' : '#e65100',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {transaction.status}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

        {/* Quick Actions */}
        <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 1.2,
                  }}
                >
                  + Transaksi Baru
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ py: 1.2 }}
                >
                  Kelola Produk
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ py: 1.2 }}
                >
                  Laporan Harian
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ py: 1.2 }}
                >
                  Setting
                </Button>
              </Box>
            </CardContent>
          </Card>
      </Box>
    </Box>
  );
}
