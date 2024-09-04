const subjects = [
    "جبر لاخطي", "فيزياء كهربائية", "تحليل 1", "عربي", "ثقافة", "انكليزي -1", "مبادئ الحاسوب",
    "جبر خطي", "أنصاف نواقل", "تحليل -2", "انكليزي -2", "برمجة -1", "برمجة -2",
    "برمجة متقدمة -1", "تحليل -3", "دارات كهربائية", "انكليزي معلوماتية -1", "احصاء واحتمالات", "متقطعة",
    "برمجة متقدمة -2", "تحليل عددي", "اشارات ونظم", "انكليزي معلوماتية -2", "بحوث عمليات", "داتا -1",
    "خوارزميات", "حوسبة", "دارات منطقية", "نظم تشغيل -1", "مهارات تواصل", "اتصالات رقمية",
    "شبكات -1", "ذكاء", "هندسة برمجيات -1", "تعقيد", "بنيان حواسيب", "نظرية معلومات"
];

const subjectsContainer = document.getElementById('subjects-container');

// إنشاء حقول الإدخال للمواد
subjects.forEach((subject, index) => {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject-input';

    const subjectLabel = document.createElement('label');
    subjectLabel.textContent = `${subject}: `;

    const subjectInput = document.createElement('input');
    subjectInput.type = 'number';
    subjectInput.min = 0;
    subjectInput.max = 100;
    subjectInput.placeholder = 'علامة';
    subjectInput.id = `subject-${index}`;

    
    const savedValue = localStorage.getItem(`subject-${index}`);
    if (savedValue !== null) {
        subjectInput.value = savedValue;
    }

    // حفظ العلامة في Local Storage عند تغييرها
    subjectInput.addEventListener('input', () => {
        localStorage.setItem(`subject-${index}`, subjectInput.value);
    });

    subjectDiv.appendChild(subjectLabel);
    subjectDiv.appendChild(subjectInput);
    subjectsContainer.appendChild(subjectDiv);
});

// حساب المعدل العام
function calculateAverage() {
    const inputs = document.querySelectorAll('input[type="number"]');
    let total = 0;
    let count = inputs.length;

    inputs.forEach(input => {
        let value = parseFloat(input.value);
        if (isNaN(value)) {
            value = 60; // إذا لم يتم إدخال علامة، تُعتبر العلامة 60
        }
        total += value;
    });

    const average = total / count;
    document.getElementById('result').textContent = `المعدل العام: ${average.toFixed(2)}`;

    // حفظ المعدل في Local Storage
    localStorage.setItem('average', average.toFixed(2));
}


function calculateDifferentialAverage() {
    const major = document.getElementById('major-select').value; // الاختصاص المختار
    const inputs = document.querySelectorAll('input[type="number"]');
    let totalGeneral = 0;
    let countGeneral = inputs.length;
    let totalSpecific = 0;
    let specificSubjects = [];

    
    if (major === "برمجيات") {
        specificSubjects = ["برمجة -1", "برمجة -2", "برمجة متقدمة -1", "برمجة متقدمة -2", "داتا -1"];
    } else if (major === "ذكاء") {
        specificSubjects = ["برمجة -1", "برمجة -2", "برمجة متقدمة -1", "برمجة متقدمة -2", "ذكاء"];
    } else if (major === "شبكات") {
        specificSubjects = ["برمجة -1", "برمجة -2", "برمجة متقدمة -1", "برمجة متقدمة -2", "شبكات -1"];
    }

    
    inputs.forEach(input => {
        let value = parseFloat(input.value);
        if (isNaN(value)) {
            value = 60; 
        }
        totalGeneral += value;
    });

    const generalAverage = totalGeneral / countGeneral;


    specificSubjects.forEach(subject => {
        const index = subjects.indexOf(subject);
        const input = document.getElementById(`subject-${index}`);
        let value = parseFloat(input.value);
        if (isNaN(value)) {
            value = 60; 
        }
        totalSpecific += value;
    });

    const specificAverage = totalSpecific / specificSubjects.length;

    
    const differentialAverage = (specificAverage * 0.3) + (generalAverage * 0.7);
    document.getElementById('result').textContent = `معدل التفاضل (${major}): ${differentialAverage.toFixed(2)}`;


    localStorage.setItem('differentialAverage', differentialAverage.toFixed(2));
}

function resetFields() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    
    inputs.forEach(input => {
        input.value = '';
        const subjectIndex = input.id.split('-')[1];
        localStorage.removeItem(`subject-${subjectIndex}`); 
    });

    
    localStorage.removeItem('average');
    localStorage.removeItem('differentialAverage');

    
    document.getElementById('result').textContent = '';
}



window.onload = function() {
    const savedAverage = localStorage.getItem('average');
    const savedDifferentialAverage = localStorage.getItem('differentialAverage');

    if (savedAverage !== null) {
        document.getElementById('result').textContent = `المعدل العام: ${savedAverage}`;
    }

    if (savedDifferentialAverage !== null) {
        document.getElementById('result').textContent += ` | معدل التفاضل المحفوظ: ${savedDifferentialAverage}`;
    }
};