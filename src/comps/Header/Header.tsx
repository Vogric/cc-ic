import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <div className={styles.wrapper}>
        <h1 className={styles.title}>Status Dashboard</h1>
    </div>
  )
}

export default Header