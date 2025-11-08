// هذا الملف يحتوي على الهيكل الأساسي للبيانات والدوال المساعدة
// يمكن إضافة المزيد من الدوال الحسابية المعقدة هنا

// هيكل البيانات الكامل
const financialModel = {
    // إضافة المزيد من الخصائص حسب الحاجة
};

// دوال حسابية إضافية
function calculateGrowthRate(values) {
    if (values.length < 2) return 0;
    const growthRates = [];
    for (let i = 1; i < values.length; i++) {
        if (values[i-1] !== 0) {
            growthRates.push((values[i] - values[i-1]) / values[i-1]);
        }
    }
    return growthRates.reduce((a, b) => a + b, 0) / growthRates.length;
}

function calculateAverageRatio(numerators, denominators) {
    if (numerators.length !== denominators.length) return 0;
    let totalRatio = 0;
    let count = 0;
    for (let i = 0; i < numerators.length; i++) {
        if (denominators[i] !== 0) {
            totalRatio += numerators[i] / denominators[i];
            count++;
        }
    }
    return count > 0 ? totalRatio / count : 0;
}