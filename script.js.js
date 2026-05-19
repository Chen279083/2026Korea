// --- 分頁切換邏輯 ---
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 行李清單數據 ---
let packingData = [
    { id: 1, category: 'handbag', name: '護照與簽證', qty: 1, checked: true },
    { id: 2, category: 'checked', name: '換洗衣物', qty: 4, checked: false },
    { id: 3, category: 'shopping', name: '化妝品代購', qty: 1, checked: false }
];

let currentCategory = 'handbag';

function renderPackingList() {
    const container = document.getElementById('packing-list-container');
    const filtered = packingData.filter(item => item.category === currentCategory);
    
    container.innerHTML = filtered.map(item => `
        <div class="item-row">
            <div class="checkbox" onclick="toggleCheck(${item.id})">
                ${item.checked ? '✔' : ''}
            </div>
            <div class="item-name" style="${item.checked ? 'text-decoration: line-through; color: #999' : ''}">
                ${item.name}
            </div>
            <div class="qty-control">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                <span style="min-width: 15px; text-align: center">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            </div>
            <span style="color: #FFCFD2; margin-left: 10px" onclick="deleteItem(${item.id})">✕</span>
        </div>
    `).join('');
}

function filterPacking(cat, el) {
    currentCategory = cat;
    document.querySelectorAll('.p-tab').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');
    renderPackingList();
}

function addItem() {
    const input = document.getElementById('new-item-input');
    if (!input.value.trim()) return;
    
    packingData.push({
        id: Date.now(),
        category: currentCategory,
        name: input.value,
        qty: 1,
        checked: false
    });
    input.value = '';
    renderPackingList();
}

function toggleCheck(id) {
    const item = packingData.find(i => i.id === id);
    if (item) item.checked = !item.checked;
    renderPackingList();
}

function updateQty(id, delta) {
    const item = packingData.find(i => i.id === id);
    if (item && item.qty + delta > 0) {
        item.qty += delta;
        renderPackingList();
    }
}

function deleteItem(id) {
    packingData = packingData.filter(i => i.id !== id);
    renderPackingList();
}

// 頁面加載完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    renderPackingList();
});