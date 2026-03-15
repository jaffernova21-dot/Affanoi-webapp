// Service worker mein Firebase scripts import karein
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

// Aapka Firebase configuration (Service worker ko bhi config chahiye hota hai)
const firebaseConfig = {
  apiKey: "AIzaSyD_VhN-lTkXy9fS369nCwK-4TQq-lBWmUs",
  authDomain: "affanoi-ltd.firebaseapp.com",
  projectId: "affanoi-ltd",
  storageBucket: "affanoi-ltd.firebasestorage.app",
  messagingSenderId: "598136403114",
  appId: "1:598136403114:web:bfd3d5acc6e358bbb2ccd3"
};

// Initialize Firebase app in the service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background mein notifications handle karein
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Agar aapke paas koi logo image hai toh uska naam yahan dein, warna is line ko hata sakte hain
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
