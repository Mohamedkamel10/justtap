import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// إعدادات مشروعك (كما هي)
const firebaseConfig = {
  apiKey: "AIzaSyDD2mzGNR3gKwn-hCkQDkUE729sC8BnqVc",
  authDomain: "justtap-c7fde.firebaseapp.com",
  projectId: "justtap-c7fde",
  storageBucket: "justtap-c7fde.appspot.com",
  messagingSenderId: "467024881082",
  appId: "1:467024881082:web:5d88dbba462c9dc999a983"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// دالة استخراج اسم المستخدم من الرابط (URL)
// مثال: www.jus-tt-ap.com/mohamed -> يعطينا "mohamed"
function getUsernameFromURL() {
    const path = window.location.pathname; // المسار بعد الدومين
    const segments = path.split('/').filter(segment => segment.length > 0);
    
    // إذا كان الرابط هو الدومين فقط، قد ترغب في توجيهه لصفحة رئيسية
    if (segments.length === 0 || segments[0] === 'index.html') return null;
    
    return segments[0]; // يعيد أول كلمة بعد / وهي اسم المستخدم
}

// دالة جلب بيانات المستخدم وعرضها
async function loadUserProfile() {
    const username = getUsernameFromURL();

    if (!username) {
        console.log("أنت في الصفحة الرئيسية");
        return;
    }

    try {
        const userRef = doc(db, "users", username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();
            console.log("تم جلب بيانات المستخدم:", data);
            
            // تحديث العناصر في الـ HTML (تأكد أن هذه الـ IDs موجودة في ملف الـ HTML)
            if(document.getElementById('user-name')) {
                document.getElementById('user-name').innerText = data.name || username;
            }
            if(document.getElementById('user-bio')) {
                document.getElementById('user-bio').innerText = data.bio || "No bio available";
            }
            // إذا كان هناك صورة بروفايل
            if(data.profilePic && document.getElementById('user-img')) {
                document.getElementById('user-img').src = data.profilePic;
            }

        } else {
            console.error("المستخدم " + username + " غير موجود في Firestore");
            // يمكنك توجيه المستخدم لصفحة 404 أو الصفحة الرئيسية
        }
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
    }
}

// تشغيل الدالة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', loadUserProfile);

// مراقبة حالة التسجيل (للتأكد من عمل الدومين الجديد)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in on: " + window.location.hostname);
    }
