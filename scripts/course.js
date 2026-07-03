const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 2, completed: false }
];

const container = document.getElementById('course-container');
const totalCreditsEl = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    container.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.classList.add(course.completed ? 'completed' : 'incomplete');
        card.innerHTML = `<span>${course.subject} ${course.number}</span>`;
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;
}

document.getElementById('btn-all').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

document.getElementById('btn-cse').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});

document.getElementById('btn-wdd').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

function setActiveButton(button) {
    document.querySelectorAll('.filter-buttons .btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

displayCourses(courses);