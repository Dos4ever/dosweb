
/* all variables */

const header = document.querySelector('header');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

/* --------------- remove toggle icon and navbar when click navbar link (scroll) ---------------- */
navbar.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x'); // إزالة الكلاس bx-x من أيقونة القائمة
    navbar.classList.remove('active'); // إزالة الكلاس active من شريط التنقل
});

/* --------------- toggle icon navbar ---------------- */


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}

/*---------------- sticky navbar ------------------ */

window.onscroll = () => {
    // إضافة الكلاس sticky إلى الرأس إذا كانت قيمة scroll Y أكبر من 100
    header.classList.toggle('sticky', window.scrollY > 100);
}

/* --------------- scroll sections active link ---------------- */

// الحصول على جميع عناصر sections في الصفحة
const sections = document.querySelectorAll('section');
// الحصول على جميع روابط شريط التنقل في الصفحة
const navLinks = document.querySelectorAll('header nav a');

// دالة لتنشيط الرابط بناءً على القسم المعروض
function activateLink(sectionID) {
    // إزالة الكلاس 'active' من جميع الروابط
    navLinks.forEach(link => link.classList.remove('active'));

    // البحث عن الرابط الذي يحتوي على معرف القسم الحالي باستخدام CSS.escape
    const activeLink = document.querySelector(`header nav a[href="#${CSS.escape(sectionID)}"]`);
    
    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        logWarning(`No active link found for section with ID: ${sectionID}`);
    }
}

// دالة تسجيل رسائل التحذير أو الأخطاء
function logWarning(message) {
    console.warn(message);
    // يمكن إضافة خاصية تسجيل الأخطاء إلى ملف أو نظام خارجي إذا كان الموقع معقدًا
}

// استخدام IntersectionObserver لمراقبة الأقسام
const observerOptions = {
    root: null, // مراقبة التمرير ضمن كامل الصفحة
    threshold: [0.3, 0.6, 0.9] // مراقبة الأقسام عند نسب مختلفة من الظهور 30%، 60%، و90%
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionID = entry.target.getAttribute('id');
            if (sectionID) {
                activateLink(sectionID); // تنشيط الرابط عند عرض القسم
            } else {
                logWarning('Section with no ID is intersecting.');
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// إضافة مراقب لكل قسم
sections.forEach(section => observer.observe(section));

// التحقق من صلاحية معرفات الأقسام
function isValidSectionID(id) {
    return /^[a-zA-Z0-9_-]+$/.test(id); // التأكد من أن المعرف يحتوي على حروف وأرقام فقط
}

// التحقق من المعرفات عند التحميل
sections.forEach(section => {
    const id = section.getAttribute('id');
    if (id && !isValidSectionID(id)) {
        logWarning(`Invalid section ID detected: ${id}`);
    }
});

/* --------------- scroll reveal ---------------- */

// تأكد من أن ScrollReveal تم تحميله بشكل صحيح
if (typeof ScrollReveal === 'function') {
    // إعداد ScrollReveal مع خيارات مخصصة
    const scrollRevealInstance = ScrollReveal({
        // reset: true,  // يمكنك استخدام هذه الخاصية إذا كنت ترغب في إعادة كشف العناصر عند التمرير
        distance: '80px',  // المسافة التي ستتحرك بها العناصر عند الكشف
        duration: 2000,    // المدة الزمنية لكشف العناصر (بالملي ثانية)
        delay: 200         // التأخير بين كشف العناصر
    });

    // كشف العناصر حسب الفئات المحددة
    scrollRevealInstance.reveal('.home-content, .heading', { origin: 'top' });
    scrollRevealInstance.reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    scrollRevealInstance.reveal('.home-content h1, .about-img', { origin: 'left' });
    scrollRevealInstance.reveal('.home-content p, .about-content', { origin: 'right' });
} else {
    console.error('ScrollReveal library is not loaded.');
}


/* --------------- typed js ---------------- */

// بطريقة آمنة Typed.js تابع لتشغيل 
function initializeTyped() {
    const multipleTextElement = document.querySelector('.multiple-text');

    // تحقق من وجود العنصر
    if (multipleTextElement) {
        const typed = new Typed(multipleTextElement, {
            strings: ['Full-Stuck Developer', 'YouTuber', 'Blogger'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    } else {
        console.warn('Element with class "multiple-text" not found.');
    }
}

// تأكد من تشغيل الكود بعد تحميل DOM
document.addEventListener('DOMContentLoaded', initializeTyped);

