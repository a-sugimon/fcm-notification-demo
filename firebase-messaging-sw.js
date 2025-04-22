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
    icon: payload.notification.icon,
    data: payload.data || {} // データを通知オプションに追加
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 通知クリック時の処理
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification);
  
  // 通知を閉じる
  event.notification.close();
  
  // data.urlがあればそのURLを開く
  if (event.notification.data && event.notification.data.url) {
    const urlToOpen = event.notification.data.url;
    console.log('Opening URL:', urlToOpen);
    
    // クライアントを取得してURLを開く
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // 既に開いているウィンドウがあれば、そこにフォーカスする
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // 新しいウィンドウを開く
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});
