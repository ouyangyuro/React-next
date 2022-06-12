import { Fragment } from "react";

import { getEventById, getFeaturedEvents } from "../../../dummy-data";
import EventSummary from "../../../components/event-detail/event-summary";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventContent from "../../../components/event-detail/event-content";
import ErrorAlert from "../../../components/ui/error-alert";

function EventsIdPage(props) {
  const event = props.selectEvent;

  if (!event) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>Loading...</p>
        </ErrorAlert>
      </div>
    );
  }

  return (
    <>
      <h1>Events Id Page</h1>
      <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    </>
  );
}

export default EventsIdPage;

// SSG Start
export async function getStaticProps(context) {
  const eventId = context.params.id;
  const event = await getEventById(eventId);

  return {
    props: {
      selectEvent: event,
    },
    revalidate: 30 //30secs regenerate(刷新) this page for a new incoming request
  };
}

// Dynamic (動態) routes need getStaticPaths() cause we don't know which [id] we'll eventually have, so through this function will tell Next.js which event [id], it should pre-render this page.
export async function getStaticPaths() {
  const events = await getFeaturedEvents(); //call json file

  const paths = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths: paths,
    fallback: true, // true or false or 'blocking'
  };
}
