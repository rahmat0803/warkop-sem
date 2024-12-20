document.addEventListener("DOMContentLoaded", function () {

var map = L.map('peta', {
center: [-6.1189226, 120.4625105],
zoom: 18,
minZoom: 15,
maxZoom: 20
});

// Gaya default untuk GeoJSON
const defaultStyle1 = {
color: "#f0f0f0",
weight: 1.5,
opacity: 0.8,
fillColor: "#45F450",
fillOpacity: 1,
};

const defaultStyle2 = {
color: "#f0f0f0",
weight: 1.5,
opacity: 0.8,
fillColor: "#45F450",
fillOpacity: 1,
};

const umkmData = {
name: "Kedai Kopi Sem",
rating: "5.0",
reviews: 1,
category: "Kedai Kopi",
buka: "Buka · Tutup pukul 22.04 🔻",
alamat: "VFJ7+C2R, Benteng, Kec. Benteng, Kab. Kepulauan Selayar, Sulawesi Selatan 92812",
phone: "+62 815-4591-6913",
coords: [-6.1189226, 120.4625105],
};

const marker = L.marker(umkmData.coords).addTo(map);

// Menambahkan tooltip permanen pada marker
marker.bindTooltip(umkmData.name, {
permanent: true,
direction: "top",
className: "marker-tooltip",
});

marker.bindPopup(`
<div class="popup-container">
    <div class="popup-header">${umkmData.name}</div>
    <div class="popup-rating">⭐ ${umkmData.rating} <span>(${umkmData.reviews})</span></div>
    <div class="popup-category">${umkmData.category}</div>
    <img src="./sem.jpg" style="height:200px; width:100%" />
    <div class="popup-address"><i class="fas fa-map-marker-alt"></i> ${umkmData.alamat}</div>
    <div class="popup-contact"><i class="fas fa-phone-alt"></i> ${umkmData.phone}</div>
</div>
`);

fetch("./jalanBentengAnjay.geojson")
.then((response) => response.json())
.then((geojsonData) => {
L.geoJSON(geojsonData, {
style: {
color: "#000",
weight: 3,
opacity: 1,
},
}).addTo(map);
})
.catch((error) =>
console.error("Error loading jalan GeoJSON:", error)
);

// Fungsi untuk memuat GeoJSON ke peta
function loadGeoJSON(url, styleOptions) {
fetch(url)
.then(response => {
if (!response.ok) {
throw new Error(`Gagal memuat ${url}: ${response.status}`);
}
return response.json();
})
.then(geojsonData => {
L.geoJSON(geojsonData, {
style: styleOptions,
onEachFeature: function (feature, layer) {
if (feature.properties && feature.properties.nama) {
layer.bindPopup(`${feature.properties.nama}`);
}
},
}).addTo(map);
})
.catch(error => console.error(`Kesalahan saat memuat ${url}:`, error));
}

// Memuat GeoJSON dengan gaya default
loadGeoJSON("./sekolah.geojson", defaultStyle1);
loadGeoJSON("./mesjid.geojson", defaultStyle2);

// GeoJSON dengan gaya khusus
const geojsonFiles = [
{ url: "./BentengUtara.geojson", style: { color: "#f0f0f0", weight: 1.5, opacity: 0.8, fillColor: "red", fillOpacity:
0.2 } },
{ url: "./BentengPusat.geojson", style: { color: "#f0f0f0", weight: 1.5, opacity: 0.8, fillColor: "yellow", fillOpacity:
0.2 } },
{ url: "./BentengSelatan.geojson", style: { color: "#f0f0f0", weight: 1.5, opacity: 0.8, fillColor: "green",
fillOpacity: 0.2 } },
{ url: "./jalanBentengAnjay.geojson", style: { color: "#333", weight: 3, opacity: 1 } }
];

// Memuat semua file GeoJSON dalam array
geojsonFiles.forEach(file => {
loadGeoJSON(file.url, file.style);
});


const overlayMaps = {
"UMKM Marker": marker
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
});