import { Button } from '@mui/material';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Realworld Blog</h1>
      <Button variant="text" sx={{ textTransform: 'none' }}>
        Sign in
      </Button>
      <Button variant="outlined" color="success" sx={{ textTransform: 'none' }}>
        Sign up
      </Button>
    </header>
  );
};

export default Header;
