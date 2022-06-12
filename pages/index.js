import { getFeaturedEvents } from "../dummy-data";
import { getAllUsers } from "../helper/api-utils";
import EventList from "../components/events/EventList";

export default function Home(props) {
  const events = props.events
  // console.log("homepage SSG events:", events); //for check
  // console.log("homepage SSG users:", props.users); //for check

  return (
    <>
      <h1>Home Page</h1>
      <EventList items={events} />
    </>
  );
}

// SSG Start
export async function getStaticProps() {
  const featureEvents = await getFeaturedEvents(); //call json file
  const users = await getAllUsers(); //call real api

  return {
    props: {
      events: featureEvents,
      users: users,
    },
    revalidate: 1800 //1800secs = 30mins regenerate(刷新) this page for a new incoming request
  };
}
