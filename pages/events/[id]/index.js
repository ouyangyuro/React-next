import { Fragment } from "react";
import { useRouter } from "next/router";

import { getEventById } from "../../../dummy-data";
import EventSummary from "../../../components/event-detail/event-summary";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventContent from "../../../components/event-detail/event-content";
import ErrorAlert from "../../../components/ui/error-alert";

function EventsIdPage() {
  const router = useRouter();

  const eventId = router.query.id;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No event Found!!!</p>
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
