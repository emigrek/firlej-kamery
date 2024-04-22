# 📷 Firlej Kamery
Tool to see my home city CCTV's in one place.

## 📦 Used packages
| 📦 Package  | 📋 Reasons |
| ------------- | ------------- |
| Vite | React client  |
| Express | Node.js server  |
| vite-express | Vite + Express  |
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

Fill .env file
```
# CLIENT
VITE_GOOGLE_MAPS_API_KEY=

# SERVER (optional)
HOST=
PORT=
```

Run dev server
```
npm run dev
```
or build and run production server
```
npm run build
npm run start
```

