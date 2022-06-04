import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";

function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  const onSearch = (year, month) => {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  };

  return (
    <>
      <h1>Events Page</h1>
      <EventSearch onSearch={onSearch} />
      <EventList items={events} />
    </>
  );
}

export default EventsPage;
