import StudentCard from './StudentCard';
import styles from './StudentDirectory.module.css';

// Same mapping as Week 7 (students -> StudentCard, keyed by id), with one
// addition: when the students prop is empty, show a message instead of
// rendering nothing.
export default function StudentDirectory({ students }) {
  if (students.length === 0) {
    return <p className={styles.empty}>No students match your search or filter.</p>;
  }

  return (
    <div className={styles.grid}>
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
