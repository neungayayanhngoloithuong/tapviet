// Dữ liệu điểm đặt bút cho từng chữ cái
const charDotPositions = {
    'a': { x: 25, y: 50 },
    'ă': { x: 25, y: 50 },
    'â': { x: 25, y: 50 },
    'b': { x: 20, y: 0 },
    'c': { x: 70, y: 60 },
    'd': { x: 30, y: 0 },
    'đ': { x: 30, y: 0 },
    'e': { x: 20, y: 45 },
    'ê': { x: 20, y: 45 },
    'g': { x: 30, y: 50 },
    'h': { x: 20, y: 0 },
    'i': { x: 50, y: 30 },
    'k': { x: 20, y: 0 },
    'l': { x: 20, y: 0 },
    'm': { x: 15, y: 50 },
    'n': { x: 15, y: 50 },
    'o': { x: 50, y: 60 },
    'ô': { x: 50, y: 60 },
    'ơ': { x: 50, y: 60 },
    'p': { x: 25, y: 50 },
    'q': { x: 30, y: 50 },
    'r': { x: 40, y: 50 },
    's': { x: 80, y: 55 },
    't': { x: 40, y: 20 },
    'u': { x: 20, y: 50 },
    'ư': { x: 20, y: 50 },
    'v': { x: 20, y: 50 },
    'x': { x: 20, y: 50 },
    'y': { x: 20, y: 50 },
};

// Nhân bản cho chữ hoa
Object.keys(charDotPositions).forEach(key => {
    charDotPositions[key.toUpperCase()] = { ...charDotPositions[key] };
});

// Dữ liệu cho chữ số
for (let i = 0; i <= 9; i++) {
    charDotPositions[i.toString()] = { x: 50, y: 50 };
}

// Hàm chính tạo trang tập viết
function generatePage() {
    const charSelect = document.getElementById('charSelect');
    const fontSelect = document.getElementById('fontSelect');
    const sampleCount = parseInt(document.getElementById('sampleCount').value);
    const lineCount = parseInt(document.getElementById('lineCount').value);
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const showDots = document.getElementById('showDots').checked;
    const fadeChars = document.getElementById('fadeChars').checked;
    
    const selectedChar = charSelect.value;
    const selectedFont = fontSelect.value;
    
    if (!selectedChar) {
        alert('Vui lòng chọn một chữ cái!');
        return;
    }
    
    let html = '';
    
    // Header
    html += `
        <div class="page-header">
            <div class="title">📝 Tập viết chữ: <strong>${selectedChar}</strong></div>
            <div class="info">
                <span>Họ và tên: ___________________</span>
                <span>Lớp: _____</span>
                <span>Ngày: _______________</span>
            </div>
        </div>
    `;
    
    // Từng dòng
    for (let line = 0; line < lineCount; line++) {
        // Tính độ mờ cho dòng này
        const opacity = fadeChars ? (1 - (line / lineCount) * 0.7) : 1;
        
        html += `<div class="oly-row" style="font-family: ${selectedFont};">`;
        
        // Chữ mẫu đầu dòng
        for (let i = 0; i < sampleCount; i++) {
            html += `<span class="char-sample" style="font-size: ${fontSize}mm; opacity: ${opacity};">${selectedChar}</span>`;
        }
        
        // Các ô trống có dấu chấm
        const totalSlots = 10;
        const emptySlots = totalSlots - sampleCount;
        
        for (let i = 0; i < emptySlots; i++) {
            html += '<span class="char-space">';
            if (showDots) {
                // Dấu chấm tự động hiển thị qua CSS ::before
            }
            html += '</span>';
        }
        
        html += '</div>';
    }
    
    // Footer
    html += `
        <div class="page-footer">
            <span>☐ Phụ huynh đã kiểm tra</span>
            <span>Chữ ký: ___________________</span>
        </div>
    `;
    
    // Cập nhật preview
    document.getElementById('previewPage').innerHTML = html;
}

// Hàm in PDF
function printPDF() {
    // Kiểm tra đã có nội dung chưa
    const previewPage = document.getElementById('previewPage');
    if (previewPage.querySelector('.empty-state')) {
        alert('⚠️ Vui lòng tạo trang tập viết trước khi in!');
        return;
    }
    window.print();
}

// Hàm reset
function resetPage() {
    document.getElementById('previewPage').innerHTML = `
        <div class="empty-state">
            <p>👈 Chọn chữ cái và nhấn <strong>"Xem trước"</strong></p>
            <p>để tạo trang tập viết</p>
        </div>
    `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnPreview').addEventListener('click', generatePage);
    document.getElementById('btnPrint').addEventListener('click', printPDF);
    document.getElementById('btnReset').addEventListener('click', resetPage);
    
    // Tự động preview khi thay đổi settings
    document.getElementById('charSelect').addEventListener('change', generatePage);
    document.getElementById('fontSelect').addEventListener('change', generatePage);
    document.getElementById('sampleCount').addEventListener('change', generatePage);
    document.getElementById('lineCount').addEventListener('change', generatePage);
    document.getElementById('fontSize').addEventListener('change', generatePage);
    document.getElementById('showDots').addEventListener('change', generatePage);
    document.getElementById('fadeChars').addEventListener('change', generatePage);
    
    console.log('✅ Ứng dụng Tập Viết đã sẵn sàng!');
    console.log('💝');
});
