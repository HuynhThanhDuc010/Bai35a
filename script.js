const registerForm = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const termsInput = document.getElementById("terms");
const formMessage = document.getElementById("formMessage");

function showError(id, text) {
    document.getElementById(id).textContent = text;
}

function clearErrors() {
    showError("nameError", "");
    showError("emailError", "");
    showError("passwordError", "");
    showError("termsError", "");
    formMessage.textContent = "";
    formMessage.className = "form-message";
}

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function isValidPassword(password) {
    // Tối thiểu 8 ký tự, có chữ thường, chữ hoa và chữ số.
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return pattern.test(password);
}

registerForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn trang tải lại khi gửi form.
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const acceptedTerms = termsInput.checked;

    let isValid = true;

    if (name === "") {
        showError("nameError", "Vui lòng nhập họ và tên.");
        isValid = false;
    }
    if (!isValidEmail(email)) {
        showError("emailError", "Email không hợp lệ. Vui lòng kiểm tra lại.");
        isValid = false;
    }
    if (!isValidPassword(password)) {
        showError("passwordError", "Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường và chữ số.");
        isValid = false;
    }
    if (!acceptedTerms) {
        showError("termsError", "Bạn cần đồng ý với điều khoản.");
        isValid = false;
    }

    if (!isValid) {
        formMessage.textContent = "Vui lòng kiểm tra lại thông tin.";
        formMessage.classList.add("fail");
        return;
    }

    // Chỉ lưu thông tin cơ bản, tuyệt đối không lưu mật khẩu thật.
    const userData = {
        name: name,
        email: email,
        acceptedTerms: acceptedTerms,
        registeredAt: new Date().toISOString()
    };

    try {
        localStorage.setItem("registeredUser", JSON.stringify(userData));
        formMessage.textContent = "Đăng ký thành công! Thông tin cơ bản đã được lưu.";
        formMessage.classList.add("success");
        registerForm.reset();
    } catch (error) {
        formMessage.textContent = "Không thể lưu dữ liệu trên trình duyệt này.";
        formMessage.classList.add("fail");
    }
});
