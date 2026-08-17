import styles from './StudentCard.module.css';

// Unchanged from Week 7: displays one student, shows the Dean's Lister
// badge, and applies probation styling. It has no idea whether the data
// it receives came from a static array or from state — that's the point.
export default function StudentCard({ student }) {
  const isDeansLister = student.gwa <= 1.75;
  const isOnProbation = student.status === 'On Probation';

  const cardClassName = isOnProbation
    ? `${styles.card} ${styles.probation}`
    : styles.card;

  return (
    <div className={cardClassName}>
      <div className={styles.cardHeader}>
        <h3 className={styles.name}>{student.name}</h3>
        {isDeansLister && <span className={styles.badge}>Dean's Lister</span>}
      </div>
      <p className={styles.detail}>{student.course}</p>
      <p className={styles.detail}>{student.yearLevel}</p>
      <p className={styles.detail}>Status: {student.status}</p>
      <p className={styles.detail}>GWA: {student.gwa}</p>
    </div>
  );
}
