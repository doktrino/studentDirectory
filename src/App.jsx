import { useState } from 'react';
import { initialStudents } from './data/students';
import StudentDirectory from './components/StudentDirectory';
import StudentForm from './components/StudentForm';
import DirectoryControls from './components/DirectoryControls';
import styles from './App.module.css';

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'deansLister' | 'probation'

  // TODO 1: handleAddStudent(newStudent)
  // Adds a new student without mutating the existing `students` array.
  // Spreading into a brand-new array is what makes React notice the
  // change and re-render — pushing into the old array would not.
  function handleAddStudent(newStudent) {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  }

  // TODO 2: visibleStudents
  // Derived fresh on every render from students + searchTerm + statusFilter.
  // Intentionally NOT its own useState — see Part 9, Question 3.
  let visibleStudents = students;

  if (searchTerm.trim() !== '') {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    visibleStudents = visibleStudents.filter((student) =>
      student.name.toLowerCase().includes(normalizedSearch)
    );
  }

  if (statusFilter === 'deansLister') {
    visibleStudents = visibleStudents.filter((student) => student.gwa <= 1.75);
  } else if (statusFilter === 'probation') {
    visibleStudents = visibleStudents.filter(
      (student) => student.status === 'On Probation'
    );
  }
  // statusFilter === 'all' -> no extra filtering

  return (
    <div className={styles.app}>
      <h1>Student Directory</h1>

      {/* TODO 3: pass handleAddStudent */}
      <StudentForm onAdd={handleAddStudent} />

      <DirectoryControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* TODO 4: pass visibleStudents, NOT students */}
      <StudentDirectory students={visibleStudents} />
    </div>
  );
}
