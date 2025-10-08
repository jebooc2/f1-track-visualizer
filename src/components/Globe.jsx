import React, { useEffect, useState, useRef } from "react";
import GlobeGL from "react-globe.gl";
import { tracks } from "../api/tracks";
import { getMeetings } from "../api/openf1";

export default function Globe({ onSelect }) {
  const [points, setPoints] = useState([]);
  const [selected, setSelected] = useState(null);
  const globeEl = useRef();

  useEffect(() => {
    (async () => {
      const meetings = await getMeetings(2023);
      // Merge coordinates from tracks.js
      const merged = meetings
        .map((m) => {
          const track = tracks.find((t) => t.circuit_key === m.circuit_key);
          if (!track) return null;
          return {
            ...m,
            lat: track.lat,
            lng: track.lng,
          };
        })
        .filter(Boolean);
      setPoints(merged);
    })();
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.6;
    }
  }, []);

  return (
    <div className="w-[80vw] h-[80vh] bg-black rounded-lg relative">
      <GlobeGL
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "red"}
        pointRadius={1.0}
        pointAltitude={0.08}
        onPointClick={(d) => {
          setSelected(d);
          onSelect(d);
        }}
        htmlElementsData={selected ? [selected] : []}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.style.background = "rgba(31, 41, 55, 0.9)";
          el.style.padding = "6px 10px";
          el.style.borderRadius = "6px";
          el.style.color = "white";
          el.style.fontSize = "14px";
          el.style.pointerEvents = "auto"; // makes card clickable
          el.innerHTML = `
            <strong>${d.meeting_name}</strong><br/>
            ${d.country_name}<br/>
            Next race: ${new Date(d.date_start).toLocaleDateString()}
            <br/><button style="
              margin-top: 4px; 
              padding: 4px 8px; 
              background: #2563eb; 
              border-radius: 4px; 
              color: white; 
              cursor: pointer;
            ">Details</button>
          `;
          return el;
        }}
      />
    </div>
  );
}
