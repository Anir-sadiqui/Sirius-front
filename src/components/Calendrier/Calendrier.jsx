import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendrier.css";

const localizer = momentLocalizer(moment);

const Calendrier = ({ disponibilites = [] }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!Array.isArray(disponibilites) || disponibilites.length === 0) {
            console.warn(" Aucune disponibilité reçue.");
            setEvents([]);
            return;
        }

        console.log(" Disponibilités reçues :", disponibilites);

        const mappedEvents = disponibilites.map((dispo) => {
            // Conversion du jour en date réelle (ex: "MARDI" -> 06/02/2024)
            const joursSemaine = ["DIMANCHE", "LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"];
            const today = new Date();
            const targetDayIndex = joursSemaine.indexOf(dispo.jour);
            let startDate = new Date(today);
            startDate.setDate(today.getDate() + ((targetDayIndex - today.getDay() + 7) % 7));

            startDate.setHours(dispo.periode === "MATIN" ? 9 : 14, 0, 0);

            const endDate = new Date(startDate);
            endDate.setHours(dispo.periode === "MATIN" ? 13 : 17);

            return {
                title: dispo.periode === "MATIN" ? "✔ Matin (9h-13h)" : "✔ Soir (14h-17h)",
                start: startDate,
                end: endDate,
                allDay: false,
                className: dispo.periode === "MATIN" ? "event-matin" : "event-soir" // ✅ Appliquer la classe CSS
            };
        });

        setEvents(mappedEvents);
    }, [disponibilites]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-2 text-gray-800">📅 Calendrier des disponibilités</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                views={["week", "day"]}
                min={new Date(0, 0, 0, 9, 0)} //  Début à 9h
                max={new Date(0, 0, 0, 17, 0)} // Fin à 17h
                eventPropGetter={(event) => ({
                    className: event.className, //  Ajout de la classe CSS personnalisée
                    style: { fontSize: "14px", borderRadius: "8px", padding: "5px" }
                })}
                style={{ height: 400, maxWidth: "100%", margin: "auto" }}
            />
        </div>
    );
};

export default Calendrier;
