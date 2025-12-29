import styles from "./Rating.module.css";

function Rating({ rating }) {
  const rate = rating?.rate || 0;
  const count = rating?.count || 0;

  let fullStars = Math.floor(rate);
  const remainder = rate - fullStars;
  const halfStar = remainder > 0.25 && remainder < 0.75 ? 1 : 0;

  if (remainder >= 0.75) {
    fullStars += 1;
  }

  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div
      className={styles.rating}
      aria-label={`Rating: ${rate} out of 5 from ${count} reviews`}
    >
      <span className={styles.rateValue}>{rate.toFixed(1)}</span>
      <span className={styles.rateStars}>
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="material-icons" aria-hidden="true">
            star
          </span>
        ))}
        {halfStar === 1 && (
          <span className="material-icons" aria-hidden="true">
            star_half
          </span>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="material-icons" aria-hidden="true">
            star_border
          </span>
        ))}
      </span>
      <span className={styles.count}>({count})</span>
    </div>
  );
}

export default Rating;
