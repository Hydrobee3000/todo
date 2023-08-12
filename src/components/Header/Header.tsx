import { Typography, AppBar, Toolbar } from '@mui/material'
import s from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <AppBar position='static' className={s.header}>
      <Toolbar>
        <Typography variant='h2' gutterBottom className={s.header__title}>
          Список дел
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
