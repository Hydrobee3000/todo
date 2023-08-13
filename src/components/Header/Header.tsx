import { Typography, AppBar, Toolbar } from '@mui/material'
import s from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <AppBar position='static' className={s.header__container}>
      <Toolbar className={s.header}>
        <img className={s.header__logo} src={process.env.PUBLIC_URL + '/logo.svg'} alt='Иконка' />
        <Typography variant='h2' gutterBottom className={s.header__title}>
          Список дел
        </Typography>
        <Typography className={s.header__version} variant='body2'>
          v1 13.08
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
