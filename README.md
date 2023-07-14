# 📷 Firlej Kamery
Tool to see my home city CCTV's in one place.

## 📦 Used packages
| 📦 Package  | 📋 Reasons |
| ------------- | ------------- |
| Vite | Build tool  |
| react-google-maps/api | Google Maps API wrapper  |
| zustand | state management  |
| Tailwind CSS  | css framework  |
| react-icons | icons  |
| class-variance-authority | reusable components  |

## 🚀 Running
```
git clone https://github.com/emigrek/firlej-kamery
cd firlej-kamery
npm install
```

Fill .env file with:
* Google Maps API key (**restrict it to your domain!**)
* Google Analytics ID (optional)
```
VITE_GOOGLE_MAPS_API_KEY=
VITE_GOOGLE_ANALYTICS_ID=
```

Run development server
```
npm run dev
```
or
run production build
```
npm run build
```