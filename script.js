// البيانات الأساسية
let financialData = {
    historical: {
        2022: {},
        2023: {},
        2024: {}
    },
    projected: {
        2025: {},
        2026: {},
        2027: {},
        2028: {},
        2029: {}
    }
};

// دوال التنقل بين التبويبات
function openTab(tabName) {
    // إخفاء جميع المحتويات
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
    }
    
    // إزالة النشاط من جميع الأزرار
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let button of tabButtons) {
        button.classList.remove('active');
    }
    
    // إظهار المحتوى المحدد
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function openResultTab(tabName) {
    // إخفاء جميع محتويات النتائج
    const resultContents = document.getElementsByClassName('result-content');
    for (let content of resultContents) {
        content.classList.remove('active');
    }
    
    // إزالة النشاط من جميع أزرار النتائج
    const resultButtons = document.getElementsByClassName('result-tab');
    for (let button of resultButtons) {
        button.classList.remove('active');
    }
    
    // إظهار المحتوى المحدد
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// جمع البيانات من النماذج
function collectHistoricalData() {
    // جمع بيانات الإيرادات
    financialData.historical[2022].revenue = parseFloat(document.getElementById('revenue-2022').value) || 0;
    financialData.historical[2023].revenue = parseFloat(document.getElementById('revenue-2023').value) || 0;
    financialData.historical[2024].revenue = parseFloat(document.getElementById('revenue-2024').value) || 0;
    
    // جمع بيانات تكلفة الإيرادات
    financialData.historical[2022].costOfRevenue = parseFloat(document.getElementById('cost-of-revenue-2022').value) || 0;
    financialData.historical[2023].costOfRevenue = parseFloat(document.getElementById('cost-of-revenue-2023').value) || 0;
    financialData.historical[2024].costOfRevenue = parseFloat(document.getElementById('cost-of-revenue-2024').value) || 0;
    
    // جمع بيانات المصاريف الإدارية
    financialData.historical[2022].adminExpenses = parseFloat(document.getElementById('admin-expenses-2022').value) || 0;
    financialData.historical[2023].adminExpenses = parseFloat(document.getElementById('admin-expenses-2023').value) || 0;
    financialData.historical[2024].adminExpenses = parseFloat(document.getElementById('admin-expenses-2024').value) || 0;
}

// حساب التوقعات المستقبلية
function calculateProjections() {
    // جمع البيانات التاريخية
    collectHistoricalData();
    
    // حساب معدلات النمو
    const growthRates = calculateGrowthRates();
    
    // حساب التوقعات المستقبلية
    calculateFutureProjections(growthRates);
    
    // عرض النتائج
    displayResults();
    
    // إظهار قسم النتائج
    document.getElementById('results-section').style.display = 'block';
    
    // إنشاء الرسوم البيانية
    createCharts();
}

// حساب معدلات النمو
function calculateGrowthRates() {
    const rates = {};
    
    // حساب نمو الإيرادات
    const revenueGrowth23 = financialData.historical[2023].revenue / financialData.historical[2022].revenue - 1;
    const revenueGrowth24 = financialData.historical[2024].revenue / financialData.historical[2023].revenue - 1;
    rates.revenueGrowth = (revenueGrowth23 + revenueGrowth24) / 2;
    
    // حساب متوسط نسبة التكاليف إلى الإيرادات
    const costRatio22 = financialData.historical[2022].costOfRevenue / financialData.historical[2022].revenue;
    const costRatio23 = financialData.historical[2023].costOfRevenue / financialData.historical[2023].revenue;
    const costRatio24 = financialData.historical[2024].costOfRevenue / financialData.historical[2024].revenue;
    rates.costRatio = (costRatio22 + costRatio23 + costRatio24) / 3;
    
    // حساب متوسط نسبة المصاريف الإدارية إلى الإيرادات
    const adminRatio22 = financialData.historical[2022].adminExpenses / financialData.historical[2022].revenue;
    const adminRatio23 = financialData.historical[2023].adminExpenses / financialData.historical[2023].revenue;
    const adminRatio24 = financialData.historical[2024].adminExpenses / financialData.historical[2024].revenue;
    rates.adminRatio = (adminRatio22 + adminRatio23 + adminRatio24) / 3;
    
    return rates;
}

// حساب التوقعات المستقبلية
function calculateFutureProjections(rates) {
    let previousRevenue = financialData.historical[2024].revenue;
    
    for (let year = 2025; year <= 2029; year++) {
        // حساب الإيرادات المتوقعة
        financialData.projected[year].revenue = previousRevenue * (1 + rates.revenueGrowth);
        previousRevenue = financialData.projected[year].revenue;
        
        // حساب تكلفة الإيرادات المتوقعة
        financialData.projected[year].costOfRevenue = financialData.projected[year].revenue * rates.costRatio;
        
        // حساب المصاريف الإدارية المتوقعة
        financialData.projected[year].adminExpenses = financialData.projected[year].revenue * rates.adminRatio;
        
        // حساب الربح الإجمالي
        financialData.projected[year].grossProfit = financialData.projected[year].revenue - financialData.projected[year].costOfRevenue;
        
        // حساب دخل العمليات الأساسية
        financialData.projected[year].operatingIncome = financialData.projected[year].grossProfit - financialData.projected[year].adminExpenses;
        
        // حساب صافي الدخل (مبسط)
        financialData.projected[year].netIncome = financialData.projected[year].operatingIncome * 0.8; // افتراض ضريبي
    }
}

// عرض النتائج في الجداول
function displayResults() {
    displayProfitLossStatement();
}

// عرض قائمة الدخل
function displayProfitLossStatement() {
    const tableBody = document.getElementById('profit-loss-body');
    tableBody.innerHTML = '';
    
    // صف الإيرادات
    addTableRow(tableBody, 'الإيرادات', 'revenue');
    
    // صف تكلفة الإيرادات
    addTableRow(tableBody, 'تكلفة الإيرادات', 'costOfRevenue');
    
    // صف الربح الإجمالي
    addTableRow(tableBody, 'الربح الإجمالي', 'grossProfit');
    
    // صف المصاريف الإدارية
    addTableRow(tableBody, 'المصاريف العامة والإدارية', 'adminExpenses');
    
    // صف دخل العمليات
    addTableRow(tableBody, 'دخل العمليات الأساسية', 'operatingIncome');
    
    // صف صافي الدخل
    addTableRow(tableBody, 'صافي الدخل', 'netIncome');
}

// إضافة صف إلى الجدول
function addTableRow(tableBody, label, dataKey) {
    const row = document.createElement('tr');
    
    // الخلية الأولى (اسم البند)
    const labelCell = document.createElement('td');
    labelCell.textContent = label;
    labelCell.style.fontWeight = 'bold';
    row.appendChild(labelCell);
    
    // البيانات التاريخية (2022-2024)
    for (let year = 2022; year <= 2024; year++) {
        const cell = document.createElement('td');
        const value = financialData.historical[year][dataKey] || 
                     (dataKey === 'grossProfit' ? (financialData.historical[year].revenue - financialData.historical[year].costOfRevenue) :
                      dataKey === 'operatingIncome' ? ((financialData.historical[year].revenue - financialData.historical[year].costOfRevenue) - financialData.historical[year].adminExpenses) :
                      dataKey === 'netIncome' ? (((financialData.historical[year].revenue - financialData.historical[year].costOfRevenue) - financialData.historical[year].adminExpenses) * 0.8) : 0);
        
        cell.textContent = formatNumber(value);
        cell.classList.add('historical');
        row.appendChild(cell);
    }
    
    // البيانات المتوقعة (2025-2029)
    for (let year = 2025; year <= 2029; year++) {
        const cell = document.createElement('td');
        cell.textContent = formatNumber(financialData.projected[year][dataKey] || 0);
        cell.classList.add('projected');
        row.appendChild(cell);
    }
    
    tableBody.appendChild(row);
}

// تنسيق الأرقام
function formatNumber(number) {
    if (number === 0) return '-';
    return new Intl.NumberFormat('ar-SA').format(Math.round(number));
}

// إنشاء الرسوم البيانية
function createCharts() {
    // بيانات الرسم البياني للإيرادات
    const revenueData = {
        labels: ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
        datasets: [{
            label: 'الإيرادات',
            data: [
                financialData.historical[2022].revenue,
                financialData.historical[2023].revenue,
                financialData.historical[2024].revenue,
                financialData.projected[2025].revenue,
                financialData.projected[2026].revenue,
                financialData.projected[2027].revenue,
                financialData.projected[2028].revenue,
                financialData.projected[2029].revenue
            ],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.4
        }]
    };
    
    // بيانات الرسم البياني للأرباح
    const profitData = {
        labels: ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
        datasets: [{
            label: 'صافي الدخل',
            data: [
                (financialData.historical[2022].revenue - financialData.historical[2022].costOfRevenue - financialData.historical[2022].adminExpenses) * 0.8,
                (financialData.historical[2023].revenue - financialData.historical[2023].costOfRevenue - financialData.historical[2023].adminExpenses) * 0.8,
                (financialData.historical[2024].revenue - financialData.historical[2024].costOfRevenue - financialData.historical[2024].adminExpenses) * 0.8,
                financialData.projected[2025].netIncome,
                financialData.projected[2026].netIncome,
                financialData.projected[2027].netIncome,
                financialData.projected[2028].netIncome,
                financialData.projected[2029].netIncome
            ],
            borderColor: '#27ae60',
            backgroundColor: 'rgba(39, 174, 96, 0.1)',
            tension: 0.4
        }]
    };
    
    // إنشاء الرسوم البيانية
    new Chart(document.getElementById('revenueChart'), {
        type: 'line',
        data: revenueData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'تطور الإيرادات عبر السنوات'
                }
            }
        }
    });
    
    new Chart(document.getElementById('profitChart'), {
        type: 'line',
        data: profitData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'تطور صافي الدخل عبر السنوات'
                }
            }
        }
    });
}