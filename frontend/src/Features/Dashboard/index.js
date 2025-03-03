// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import { Input, Button, Card, Space, Typography, message } from "antd";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "antd/dist/reset.css";

// const { Title, Text } = Typography;

// // Fix for default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// const RoutingMachine = ({ pickup, dropoff, setDistance }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !pickup || !dropoff) return;

//     const waypoints = [
//       L.latLng(pickup.lat, pickup.lng),
//       L.latLng(dropoff.lat, dropoff.lng)
//     ];

//     // Clear existing routing control if it exists
//     if (routingControlRef.current) {
//       try {
//         // Clear waypoints to ensure internal route layers are cleared before removal
//         routingControlRef.current.getPlan().setWaypoints([]);
//         map.removeControl(routingControlRef.current);
//       } catch (error) {
//         console.error("Error removing existing routing control:", error);
//       }
//       routingControlRef.current = null;
//     }

//     const routingControl = L.Routing.control({
//       waypoints: waypoints,
//       lineOptions: {
//         styles: [{ color: "#6FA1EC", weight: 4 }]
//       },
//       show: false,
//       addWaypoints: false,
//       routeWhileDragging: false,
//       fitSelectedRoutes: true,
//       showAlternatives: false,
//     });

//     routingControl.addTo(map);

//     routingControl.on("routesfound", function (e) {
//       const routes = e.routes;
//       if (routes && routes.length > 0) {
//         const summary = routes[0].summary;
//         setDistance((summary.totalDistance / 1000).toFixed(2));
//       }
//     });

//     routingControlRef.current = routingControl;

//     return () => {
//       if (map && routingControlRef.current) {
//         try {
//           // Clear waypoints before removal to avoid errors in internal cleanup
//           routingControlRef.current.getPlan().setWaypoints([]);
//           map.removeControl(routingControlRef.current);
//         } catch (error) {
//           console.error("Error during routing control cleanup:", error);
//         }
//         routingControlRef.current = null;
//       }
//     };
//   }, [map, pickup, dropoff, setDistance]);

//   return null;
// };

// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({
//     click: (e) => {
//       onMapClick(e.latlng);
//     },
//   });
//   return null;
// };

// export const Dashboard = () => {
//   const [pickup, setPickup] = useState(null);
//   const [dropoff, setDropoff] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [pickupAddress, setPickupAddress] = useState("");
//   const [dropoffAddress, setDropoffAddress] = useState("");

//   const handleAddressSubmit = async (address, type) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
//       );
//       const data = await response.json();
//       if (data.length > 0) {
//         const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
//         if (type === "pickup") {
//           setPickup(coords);
//           message.success("Pickup point set");
//         } else {
//           setDropoff(coords);
//           message.success("Drop-off point set");
//         }
//       } else {
//         message.error("Address not found");
//       }
//     } catch (error) {
//       message.error("Error geocoding address");
//     }
//   };

//   const handleMapClick = (latlng) => {
//     if (!pickup) {
//       setPickup(latlng);
//       message.success("Pickup point set");
//     } else if (!dropoff) {
//       setDropoff(latlng);
//       message.success("Drop-off point set");
//     } else {
//       message.info("Both points are already set. Clear to set new points.");
//     }
//   };

//   const clearPoints = () => {
//     setPickup(null);
//     setDropoff(null);
//     setDistance(null);
//     setPickupAddress("");
//     setDropoffAddress("");
//     message.success("Points cleared");
//   };

//   return (
//     <Space direction="vertical" size="large" style={{ width: "80%", padding: "20px" }}>
//       <Title level={2}>Book your Haul</Title>
//       <Card title="Address">
//         <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//         <div>
//           <Input
//             placeholder="Enter Pickup Address"
//             value={pickupAddress}
//             onChange={(e) => setPickupAddress(e.target.value)}
//           />
//           <Button type="primary" onClick={() => handleAddressSubmit(pickupAddress, "pickup")}>
//             Set Pickup
//           </Button>
          
//           </div>
//           <Input
//             placeholder="Enter Drop-off Address"
//             value={dropoffAddress}
//             onChange={(e) => setDropoffAddress(e.target.value)}
//           />
//           <Button type="primary" onClick={() => handleAddressSubmit(dropoffAddress, "dropoff")}>
//             Set Drop-off
//           </Button>
//           <Button onClick={clearPoints}>Clear Points</Button>
//         </Space>
//       </Card>

//       <Card title="Map">
//         <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <MapClickHandler onMapClick={handleMapClick} />
//           {pickup && <Marker position={pickup} />}
//           {dropoff && <Marker position={dropoff} />}
//           {pickup && dropoff && (
//             <RoutingMachine pickup={pickup} dropoff={dropoff} setDistance={setDistance} />
//           )}
//         </MapContainer>
//       </Card>

//       {distance && (
//         <Card>
//           <Text strong>Distance: {distance} km</Text>
//         </Card>
//       )}
//     </Space>
//   );
// };
export const Dashboard=()=>{
 
  return(
      <h1>In Dashboard</h1>
  );

}