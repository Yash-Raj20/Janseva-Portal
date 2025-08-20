import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
  iconRetinaUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const problems = [
  { id: 1, title: "Overflowing Garbage in Mumbai", location: [19.076, 72.8777] },
  { id: 2, title: "Unclean Area in Delhi", location: [28.6139, 77.209] },
  { id: 3, title: "Waste Dump near Bangalore Market", location: [12.9716, 77.5946] },
  { id: 4, title: "Waste Dump near Sitamarhi Market", location: [26.5887, 85.5013] },
  { id: 5, title: "Water Solution near Hyderabad", location: [15.561899, 75.522598] },
  { id: 6, title: "River Cleaning near Bhubaneswar", location: [20.561899, 85.522598] },
  { id: 7, title: "Overflowing Sewage in Kolkata", location: [22.5726, 88.3639] },
  { id: 8, title: "Trash Accumulation in Chennai", location: [13.0827, 80.2707] },
  { id: 9, title: "Flooded Street in Patna", location: [25.5941, 85.1376] },
  { id: 10, title: "Blocked Drainage in Pune", location: [18.5204, 73.8567] },
  { id: 11, title: "Illegal Dumping in Jaipur", location: [26.9124, 75.7873] },
];

/**
 * Heatmap Section Component
 */
export default function HeatmapSection() {
  return (
    <section
      id="heatmap"
      className="relative z-0 pt-24 sm:pt-28 pb-12 px-4 sm:px-10 bg-gradient-to-b from-[#f3f9f6] to-[#d1f0e0] text-center"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C2218] mb-3 sm:mb-4">
          🌍 Live Problem Heatmap
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 px-2">
          View real-time sanitation and cleanliness issues reported across the country.
        </p>

        <div className="w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-green-200 transition-all hover:shadow-3xl">
          <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {problems.map((problem) => (
              <Marker key={problem.id} position={problem.location} icon={customIcon}>
                <Popup className="text-sm font-medium">
                  <span className="font-semibold text-green-700">{problem.title}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}