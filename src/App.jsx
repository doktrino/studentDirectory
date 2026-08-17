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

  // Updates one student in place without mutating the array or the
  // student object — maps to a brand-new array, replacing only the
  // student whose id matches, and merging in the edited fields via spread.
  function handleEditStudent(id, updatedFields) {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, ...updatedFields } : student
      )
    );
  }

  // Removes one student without mutating the array — filter() returns a
  // brand-new array containing everyone except the matching id.
  function handleDeleteStudent(id) {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
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
      <StudentDirectory
        students={visibleStudents}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
}
