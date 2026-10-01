import { Link } from 'react-router-dom';
import { PLACEHOLDER_IMG } from '../../../constants/dog';
import styles from './DogCard.module.css';

const CARD_COLORS = ['gold', 'darkGreen', 'brown', 'green'];

const showPlaceholder = (e) => {
  if (!e.currentTarget.src.endsWith(PLACEHOLDER_IMG)) e.currentTarget.src = PLACEHOLDER_IMG;
};

const DogCard = ({ dog, index }) => (
  <Link
    to={`/dogs/${dog.id}`}
    className={`${styles.card} ${styles[CARD_COLORS[index % CARD_COLORS.length]]}`}
  >
    <div className={styles.content}>
      <h3 className={styles.name}>{dog.name}</h3>
      <span className={styles.button}>MORE ABOUT ME</span>
    </div>

    <div className={styles.imageWrapper}>
      <img
        src={dog.photoUrl || PLACEHOLDER_IMG}
        alt={dog.name}
        className={styles.image}
        onError={showPlaceholder}
      />
    </div>
  </Link>
);

export default DogCard;
