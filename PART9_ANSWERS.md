# Part 9 — Assessment: Explain Your Solution

**Question 1 (5 pts)**
`students` lives in `useState` (in `App.jsx`) kasi it's data na nagbabago habang tumatakbo ang app — may staff na nag-a-add ng bagong student anytime. React only re-renders when state changes through its setter function (`setStudents`), hindi automatic kapag plain variable lang ang array. If `handleAddStudent` called `students.push(newStudent)` and stopped there, wala akong tatawagin na `setStudents`, so React would have no idea na nag-iba ang array — walang re-render mangyayari. On screen, wala kang makikitang bagong card pagka-submit ng form, kahit na technically nasa memory na yung bagong student — need mo pang mag-trigger ng ibang state change (like pag-type sa search box) para ma-"force" ang re-render, at doon mo lang makikita, kung sakaling ma-detect pa nga.

**Question 2 (5 pts)**
Sa `handleAddStudent(newStudent)` (App.jsx), ginagamit ko yung updater-function form ng `setStudents`:

```js
function handleAddStudent(newStudent) {
  setStudents((prevStudents) => [...prevStudents, newStudent]);
}
```

Yung `[...prevStudents, newStudent]` ay gumagawa ng **bagong array** — sina-spread ko lahat ng laman ng dating `prevStudents` tapos idinadagdag sa dulo ang `newStudent`. Hindi ko ginagalaw yung original array (walang `.push()`, walang direct index assignment), kaya intact pa rin ang reference sa lumang array kung sakaling kailanganin — pero mas importante, bagong array reference ang pinasa kay `setStudents`, kaya alam agad ni React na kailangan mag-re-render.

Yung `id` ng bagong student ay galing sa `Date.now()`, sa loob ng `handleSubmit` sa `StudentForm.jsx`. Kailangan siyang iba sa lahat ng existing id kasi ginagamit ang `id` bilang `key` prop sa `.map()` sa `StudentDirectory.jsx`. Kung magkaroon ng duplicate id, magkakagulo ang React sa pag-track kung alin ang alin sa mga list items — pwedeng mag-render ng maling card, mag-mismatch ang state ng existing card, o mag-warn ng duplicate key sa console. `Date.now()` (millisecond timestamp) ay practically unique dahil hindi realistic na mag-submit ng dalawang bagong student sa parehong millisecond.

**Question 3 (5 pts)**
Sa `App.jsx`, hindi ko dinideklara si `visibleStudents` bilang `useState` — plain `let` variable siya na kino-compute tuwing may re-render. Nagsisimula siya sa buong `students` array, tapos:
1. Kung may laman ang `searchTerm` (naka-trim), fina-filter ko yung mga students na case-insensitive match sa `name`.
2. Base sa `statusFilter`, fina-filter ko ulit: `'deansLister'` → `gwa <= 1.75`, `'probation'` → `status === 'On Probation'`, `'all'` → wala nang extra filter.

Mas maganda ito kaysa gumawa ng separate `useState` na sini-sync gamit ang `useEffect` kasi si `visibleStudents` ay **derived value** — laging pwedeng makalkula mula sa `students`, `searchTerm`, at `statusFilter`. Kung ilalagay ko siya sa sarili niyang state, magkakaroon ako ng "two sources of truth" — kailangan kong tiyakin na tumatakbo yung `useEffect` sa tamang oras (tuwing magbabago ang alinman sa tatlong dependencies) para hindi sila mag-out of sync. Karagdagang complexity yun (at posibleng bug source — extra render cycle pa dahil sa effect) para lang sa isang bagay na direkta namang nakukuha gamit ang `.filter()`. Sa halip, kada render, sariwa (fresh) ang computation, kaya laging tama at walang stale data.

**Question 4 (5 pts)**
Trace ng typing sa search box hanggang sa magbawas ang cards:
1. User nag-type ng isang character sa `<input>` sa `DirectoryControls.jsx`.
2. Nag-fire ang `onChange` event, tumatawag ito ng `onSearchChange(e.target.value)` — na siyang `setSearchTerm` na pinasa mula `App.jsx` bilang prop.
3. Tumatawag si `setSearchTerm` para i-update ang `searchTerm` state sa `App.jsx`, at dahil state ito, nag-trigger ito ng re-render ng `App` component.
4. Sa panibagong render, kino-compute ulit ang `visibleStudents` gamit ang bagong `searchTerm` value — mas kaunti na ngayon ang pumapasa sa `.filter()` condition.
5. Pinasa ang bagong (mas maikling) `visibleStudents` array bilang `students` prop papunta sa `StudentDirectory`.
6. Nire-render ulit ng `StudentDirectory` ang mga `StudentCard`, base sa bagong list — kaya mas kaunting cards na ang lumalabas sa screen.

Para naman sa bagong idinagdag na student na tama agad ang Dean's Lister badge kahit walang ginalaw sa `StudentCard.jsx`: ang `StudentCard` ay isang **pure presentational component** — kinukuha lang niya ang `student` prop na pinasa sa kanya, tapos siya mismo ang kumukwenta kung Dean's Lister ba (`student.gwa <= 1.75`) base sa laman ng prop na `iyon`. Hindi mahalaga kung saan galing ang student object — seeded data man ito o kaka-submit lang sa form, pareho lang ang binibigay na `gwa` field, kaya pareho rin ang conditional logic na tatakbo. Ito ang nagpapakita na ang conditional rendering ay function lang ng **kasalukuyang laman ng props**, hindi ng "history" kung paano nakarating yung data doon — bawat render, sariwang eval ulit, kaya automatic na sumasabay ang UI sa totoong laman ng state, real-time.
