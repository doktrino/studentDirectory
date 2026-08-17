import { useState } from 'react';
import styles from './StudentForm.module.css';

export default function StudentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [status, setStatus] = useState('Regular');
  const [gwa, setGwa] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      name,
      course,
      yearLevel,
      status,
      gwa: parseFloat(gwa),
    };

    onAdd(newStudent);

    setName('');
    setCourse('');
    setYearLevel('');
    setStatus('Regular');
    setGwa('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Course (e.g. BS Computer Science)"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Year level (e.g. 2nd Year)"
        value={yearLevel}
        onChange={(e) => setYearLevel(e.target.value)}
        className={styles.input}
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={styles.input}
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
        placeholder="GWA"
        value={gwa}
        onChange={(e) => setGwa(e.target.value)}
        className={styles.input}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
}
