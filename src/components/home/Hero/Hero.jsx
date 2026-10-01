import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/button';
import dog1 from '../../../assets/Images/HEADER-1.jpg';
import dog2 from '../../../assets/Images/HEADER-2.jpg';
import dog3 from '../../../assets/Images/HEADER-3.jpg';
import dog4 from '../../../assets/Images/HEADER-4.jpg';
import dog5 from '../../../assets/Images/HEADER-5.jpg';
import styles from './Hero.module.css';

const DOG_IMAGES = [dog1, dog2, dog3, dog4, dog5];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.decorationBg}></div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            Where every journey ends in love.
            <br />
            And every paw finds a home.
          </h1>
          <Button onClick={() => navigate('/dogs')}>ADOPT, DON'T SHOP</Button>
        </div>

        <div className={styles.photoGrid}>
          {DOG_IMAGES.map((src, index) => (
            <div key={src} className={styles.photoCard}>
              <img src={src} alt={`Adorable dog ${index + 1}`} className={styles.photo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
