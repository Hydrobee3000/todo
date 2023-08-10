import { Typography, AppBar, Toolbar } from '@mui/material'

const Header: React.FC = () => {
  return (
    <AppBar position='static' style={{ marginBottom: '2rem', minHeight: '8vh' }}>
      <Toolbar style={{ paddingTop: '0.5rem' }}>
        <Typography variant='h2' gutterBottom style={{ fontSize: '3.5rem' }}>
          Список дел
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
