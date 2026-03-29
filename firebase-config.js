import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// إعدادات مشروعك كما هي
const firebaseConfig = {
  apiKey: "AIzaSyDD2mzGNR3gKwn-hCkQDkUE729sC8BnqVc",
  authDomain: "justtap-c7fde.firebaseapp.com",
  projectId: "justtap-c7fde",
  storageBucket: "justtap-c7fde.appspot.com",
  messagingSenderId: "467024881082",
  appId: "1:467024881082:web:5d88dbba462c9dc999a983"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// --- الدوال الأساسية الخاصة بك ---

export async function uploadImage(file, path) {
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}

export async function saveUser(username, data) {
  await setDoc(doc(db, "users", username), data);
}

export async function getUser(username) {
  const snap = await getDoc(doc(db, "users", username));
  return snap.exists() ? snap.data() : null;
}

// --- الجزء الجديد الخاص بالدومين www.jus-tt-ap.com/mohamed ---

/**
 * دالة لاستخراج اسم المستخدم من الرابط تلقائياً
 * تعمل مع الروابط المباشرة (باستخدام خدعة 404.html) أو الروابط العادية
 */
export function getUsernameFromURL() {
    const path = window.location.pathname; // مثال: /mohamed
    const segments = path.split('/').filter(s => s.length > 0 && s !== 'index.html');
    
    if (segments.length > 0) {
        return segments[0]; // سيعيد "mohamed"
    }
    return null;
}

/**
 * دالة التشغيل التلقائي عند فتح الدومين الجديد
 */
export async function initProfilePage() {
    const username = getUsernameFromURL();
    
    if (username) {
        console.log("جاري البحث عن اليوزر:", username);
        const userData = await getUser(username);
        
        if (userData) {
            console.log("تم العثور على بيانات اليوزر بنجاح من الدومين الجديد");
            // هنا يمكنك استدعاء دالة لعرض البيانات في صفحتك
            // renderProfile(userData); 
            return userData;
        } else {
            console.error("اليوزر غير موجود في Firestore");
        }
    }
    return null;
}

// تشغيل الفحص تلقائياً فور تحميل الصفحة
window.addEventListener('DOMContentLoaded', initProfilePage);
