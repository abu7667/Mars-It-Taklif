let button = document.querySelectorAll('button')

button[1].addEventListener('click', () => {
    window.location.href = `index.html`
})

button[0].addEventListener('click', () => {
    window.location.href = `oxirgi.html`
})

const BOT_TOKEN = '8417918402:AAGgCrPXdMML7YHm-etD_PgzLZ5RLZk92f0';
const CHAT_ID = '7011500808';

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const phoneInput = document.getElementById('phone');
const countryCodeSelect = document.getElementById('countryCode');
const submitBtn = document.getElementById('submitBtn');
const errorEl = document.getElementById('error');
const form = document.getElementById('rsvpForm');

if (countryCodeSelect) {
    countryCodeSelect.addEventListener('change', (e) => {
        const selectedCode = e.target.value;

        let currentPhone = phoneInput.value.trim();

        currentPhone = currentPhone.replace(/^\+\d{1,4}\s*/, '');

        if (selectedCode && currentPhone) {
            phoneInput.value = `${selectedCode} ${currentPhone}`;
        } else if (selectedCode) {
            phoneInput.value = selectedCode + ' ';
            phoneInput.focus();
        }
    });

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value;
        const selectedCode = countryCodeSelect.value;

        if (!value.startsWith('+') && selectedCode) {
            phoneInput.value = selectedCode + ' ' + value;
        } 
    });
}

async function sendToTelegram(firstName, lastName, phone) {
    const message = `
🎉 Mars IT Tadbiriga Yangi Ishtirokchi!

👤 Ism: ${firstName}
👥 Familiya: ${lastName}
📱 Telefon: ${phone}
🕒 Vaqt: ${new Date().toLocaleString('uz-UZ')}
    `;

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Yuborilmoqda... ⏳';

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const result = await response.json();
        console.log("Telegram API javobi:", result);

        if (result.ok) {
            errorEl.className = 'text-success text-center font-semibold';
            errorEl.textContent = '✅ Muvaffaqiyatli ro\'yxatdan o\'tdingiz!';

            form.reset();

            setTimeout(() => {
                window.history.back();
            }, 2000);
        } else {
            console.error('Telegram API xatosi:', result);
            errorEl.className = 'text-error text-center font-semibold';
            errorEl.textContent = `Xatolik: ${result.description || 'Noma\'lum xato'}`;
        }
    } catch (err) {
        console.error('Xatolik:', err);
        errorEl.className = 'text-error text-center font-semibold';
        errorEl.textContent = 'Xabar yuborishda xatolik yuz berdi.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Tasdiqlash 🎊';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const phone = phoneInput.value.trim();

    console.log("Ism:", firstName);
    console.log("Familiya:", lastName);
    console.log("Telefon:", phone);

    errorEl.textContent = '';

    if (!firstName || !lastName || !phone) {
        errorEl.className = 'text-error text-center font-semibold';
        errorEl.textContent = 'Iltimos, barcha maydonlarni to\'ldiring.';
        return;
    }

    if (!phone.startsWith('+')) {
        errorEl.className = 'text-error text-center font-semibold';
        errorEl.textContent = 'Iltimos, country code tanlang.';
        return;
    }

    sendToTelegram(firstName, lastName, phone);
});