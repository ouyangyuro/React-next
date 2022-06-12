import { getFilteredEvents } from "../../../dummy-data";
// import { useRouter } from "next/router";

import EventList from "../../../components/events/EventList";
import ResultTitle from "../../../components/events/results-title";
import Button from "../../../components/ui/Button";
import ErrorAlert from "../../../components/ui/error-alert";

function SlugPage(props) {
  /**
   * CSR 這頁其實可以用CSR就好，但使用SSR來示範
   * ----------------------------------------------------------------------------------
   */
  // const router = useRouter();
  // const [eventData, setEventData] = useState();

  // const filterData = router.query.slug;
  // console.log(filterData); //for check

  // useEffect(() => {
  // //get all events
  // setEventData(response.data);
  // }, [])

  // if (!eventData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];
  // console.log("string:", filteredYear, filteredMonth); //for check

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;
  // console.log("num:", numYear, numMonth); //for check

  // if (
  //   isNaN(numYear) ||
  //   isNaN(numMonth) ||
  //   numYear > 2023 ||
  //   numYear < 2021 ||
  //   numMonth < 1 ||
  //   numMonth > 12
  // ) {
  //   return (
  //     <div className="center">
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values!!!</p>
  //       </ErrorAlert>
  //       <Button link="/events">Show All Events</Button>
  //     </div>
  //   );
  // }

  // const filteredEvents = eventData.filter((event) => {
  //   const eventDate = new Date(event.date);
  //   return (
  //     eventDate.getFullYear() === numYear &&
  //     eventDate.getMonth() === numMonth - 1
  //   );
  // });

  // if (!filteredEvents || filteredEvents.length === 0) {
  //   return (
  //     <div className="center">
  //       <ErrorAlert>
  //         <p>No events found for the chosen filter!!!</p>
  //       </ErrorAlert>
  //       <Button link="/events">Show All Events</Button>
  //     </div>
  //   );
  // }

  // const date = new Date(numYear, numMonth - 1);

  /**
   * SSR
   * ----------------------------------------------------------------------------------
   */
  if (props.hasError) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!!!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <h1>Slug Page</h1>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default SlugPage;

//SSR Start
export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

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
    return {
      props: { hasError: true }, // 錯誤props 回傳有錯
      // notFound: true, // 錯誤導去not found page(404 page)
      // redirect: { destination: "/error" }, // 錯誤導去自定義的error page
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  }); //call json file

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    }, // will be passed to the page component as props
  };
}
