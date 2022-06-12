import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";

function EventsPage(props) {
  const events = props.events;
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


// SSG Start
export async function getStaticProps() {
  const events = await getAllEvents(); //call json file

  return {
    props: {
      events: events,
    },
    revalidate: 60 //60secs regenerate(刷新) this page for a new incoming request
  };
}