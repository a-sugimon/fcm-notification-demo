importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCHXDvCgn1JLfJokiMflPPhu5n5CSOyw2w",
  authDomain: "fcm-notification-demo-71005.firebaseapp.com",
  projectId: "fcm-notification-demo-71005",
  messagingSenderId: "239882082991",
  appId: "1:239882082991:web:4cbf27e851da2ee044525a",
});

const messaging = firebase.messaging();

// バックグラウンドでのメッセージ受信時の処理
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
