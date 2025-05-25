import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing default icon images
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const problems = [
  {
    id: 1,
    title: "Overflowing Garbage in Mumbai",
    location: [19.076, 72.8777],
  },
  {
    id: 2,
    title: "Unclean Area in Delhi",
    location: [28.6139, 77.209],
  },
  {
    id: 3,
    title: "Waste Dump near Bangalore Market",
    location: [12.9716, 77.5946],
  },
  {
    id: 4,
    title: "Waste Dump near Sitamarhi Market",
    location: [26.5887, 85.5013],
  },
  {
    id: 5,
    title: "Water Solution near Hydrabad",
    location: [15.561899, 75.522598],
  },
  {
    id: 6,
    title: "River Cleaning near Bhubneshwar",
    location: [20.561899, 85.522598],
  },
];

export default function HeatmapSection() {
  return (
    <section
      id="heatmap"
      loading="lazy"
      className="relative z-0 pt-24 sm:pt-28 pb-12 px-4 sm:px-10 bg-[#f3f9f6] text-center"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0C2218] mb-3 sm:mb-4">
          🌍 Live Problem Heatmap
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-6 px-2">
          View real-time sanitation and cleanliness issues reported across the country.
        </p>

        <div className="w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-green-100">
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
              <Marker key={problem.id} position={problem.location}>
                <Popup>
                  <span className="text-sm font-medium">{problem.title}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}