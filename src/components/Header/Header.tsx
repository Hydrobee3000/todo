import { Typography, AppBar, Toolbar } from '@mui/material'
import s from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <AppBar position='static' className={s.header}>
      <Toolbar>
        <Typography variant='h2' gutterBottom className={s.header__title}>
          Список дел
        </Typography>
        <Typography style={{ marginLeft: 'auto', opacity: '0.1', marginBottom: '3rem' }} variant='body2'>
          v1 12.08
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
