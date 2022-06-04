import EventItem from "./EventItem";
import style from './EventList.module.css'

function EventList(props) {
  const { items } = props;

  return (
    <>
      <ul className={style.list}>
        {items.map((event) => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            location={event.location}
            date={event.date}
            image={event.image}
          />
        ))}
      </ul>
    </>
  );
}

export default EventList;
