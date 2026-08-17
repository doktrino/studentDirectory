import { useState } from 'react';
import styles from './StudentCard.module.css';

// Displays one student, shows the Dean's Lister badge, applies probation
// styling, and now also owns its own local "edit mode" — a controlled
// mini-form that reuses this card's layout instead of opening a separate
// modal. Saving or deleting doesn't touch state directly here; it calls
// back up to App.jsx via onEdit/onDelete, same pattern as StudentForm's
// onAdd, so App.jsx stays the single owner of the students array.
export default function StudentCard({ student, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [course, setCourse] = useState(student.course);
  const [yearLevel, setYearLevel] = useState(student.yearLevel);
  const [status, setStatus] = useState(student.status);
  const [gwa, setGwa] = useState(student.gwa);

  const isDeansLister = student.gwa <= 1.75;
  const isOnProbation = student.status === 'On Probation';

  const cardClassName = isOnProbation
    ? `${styles.card} ${styles.probation}`
    : styles.card;

  function handleStartEdit() {
    // Reset the local fields to the student's current values every time
    // edit mode opens, in case a previous edit was cancelled mid-way.
    setName(student.name);
    setCourse(student.course);
    setYearLevel(student.yearLevel);
    setStatus(student.status);
    setGwa(student.gwa);
    setIsEditing(true);
  }

  function handleSave(e) {
    e.preventDefault();
    onEdit(student.id, {
      name,
      course,
      yearLevel,
      status,
      gwa: parseFloat(gwa),
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleDelete() {
    const confirmed = window.confirm(`Remove ${student.name} from the directory?`);
    if (confirmed) {
      onDelete(student.id);
    }
  }

  if (isEditing) {
    return (
      <form className={cardClassName} onSubmit={handleSave}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.editInput}
          required
        />
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className={styles.editInput}
          required
        />
        <input
          type="text"
          value={yearLevel}
          onChange={(e) => setYearLevel(e.target.value)}
          className={styles.editInput}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.editInput}
        >
          <option value="Regular">Regular</option>
          <option value="Irregular">Irregular</option>
          <option value="On Probation">On Probation</option>
        </select>
        <input
          type="number"
          step="0.01"
          min="1"
          max="5"
          value={gwa}
          onChange={(e) => setGwa(e.target.value)}
          className={styles.editInput}
          required
        />
        <div className={styles.cardActions}>
          <button type="submit" className={styles.saveButton}>Save</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    );
  }

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
      <div className={styles.cardActions}>
        <button type="button" onClick={handleStartEdit} className={styles.editButton}>Edit</button>
        <button type="button" onClick={handleDelete} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
}
