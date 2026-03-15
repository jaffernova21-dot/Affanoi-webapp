// Firebase SDKs import kar rahe hain
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging.js";

// Aapka Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_VhN-lTkXy9fS369nCwK-4TQq-lBWmUs",
  authDomain: "affanoi-ltd.firebaseapp.com",
  projectId: "affanoi-ltd",
  storageBucket: "affanoi-ltd.firebasestorage.app",
  messagingSenderId: "598136403114",
  appId: "1:598136403114:web:bfd3d5acc6e358bbb2ccd3"
};

// Firebase aur Messaging initialize karein
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Button click par permission mangein
document.getElementById('request-permission').addEventListener('click', () => {
    console.log('Permission maang rahe hain...');
    
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission mil gayi.');
            
            // FCM Token generate karein aapki VAPID key ke sath
            getToken(messaging, { vapidKey: 'yTy_4bfgrewDKEXYa297I0cj0HRkORhgWqG7t_tkTHA' }).then((currentToken) => {
                if (currentToken) {
                    console.log('FCM Token:', currentToken);
                    document.getElementById('token-display').innerText = "FCM Token: " + currentToken;
                } else {
                    console.log('Token generate nahi hua.');
                }
            }).catch((err) => {
                console.log('Token lene mein error aayi: ', err);
            });
        } else {
            console.log('User ne permission deny kar di.');
        }
    });
});

// Jab app open ho (foreground), tab message receive karne ke liye
onMessage(messaging, (payload) => {
    console.log('Foreground message mila: ', payload);
    alert(`New Message: ${payload.notification.title} \n${payload.notification.body}`);
});
