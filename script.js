let studentData = []; // لتخزين البيانات

// تحميل البيانات من ملف JSON أو Excel موجود
fetch('students.json') // استبدل "students.json" باسم الملف الخاص بك
    .then(response => response.json())
    .then(data => {
        studentData = data; // تخزين البيانات
        console.log("تم تحميل البيانات بنجاح.");
    })
    .catch(error => {
        console.error("خطأ أثناء تحميل البيانات:", error);
        alert("حدث خطأ أثناء تحميل بيانات الطلاب.");
    });

// البحث عن بيانات الطالب
document.getElementById('searchButton').addEventListener('click', () => {
    const studentId = document.getElementById('studentIdInput').value.trim();
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    if (!studentId) {
        alert('يرجى إدخال رقم الطالب!');
        return;
    }

    // البحث عن الطالب
    const student = studentData.find(row => row['رقم الطالب'] == studentId); // استبدل 'رقم الطالب' باسم العمود

    if (!student) {
        tableContainer.innerHTML = `<p>لم يتم العثور على طالب برقم ${studentId}.</p>`;
        return;
    }

    // عرض بيانات الطالب
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    Object.keys(student).forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    const dataRow = document.createElement('tr');
    Object.values(student).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        dataRow.appendChild(td);
    });

    table.appendChild(headerRow);
    table.appendChild(dataRow);
    tableContainer.appendChild(table);
});
