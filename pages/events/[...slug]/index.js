import { getFilteredEvents } from "../../../dummy-data";
import { useRouter } from "next/router";

import EventList from "../../../components/events/EventList";
import ResultTitle from "../../../components/events/results-title";
import Button from "../../../components/ui/Button";
import ErrorAlert from "../../../components/ui/error-alert";

function SlugPage() {
  const router = useRouter();

  const filterData = router.query.slug;
  // console.log(filterData); //for check

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  // console.log("string:", filteredYear, filteredMonth); //for check

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  // console.log("num:", numYear, numMonth); //for check

  //if numYear or numMonth "is Not a Number" = "isNaN"
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2023 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!!!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No events found for the chosen filter!!!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <h1>Slug Page</h1>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default SlugPage;
