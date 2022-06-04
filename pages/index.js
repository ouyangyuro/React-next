import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/EventList";

export default function Home() {
  const featureEvents = getFeaturedEvents();

  return (
    <>
      <h1>Home Page</h1>
      <EventList items={featureEvents} />
    </>
  );
}
