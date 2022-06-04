import { useRef } from "react";
import Button from "../ui/Button";
import style from "./EventSearch.module.css";

function EventSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const submitHandle = (e) => {
    e.preventDefault();

    const selYear = yearInputRef.current.value;
    const selMonth = monthInputRef.current.value;

    props.onSearch(selYear, selMonth);
  };

  return (
    <>
      <form className={style.form} onSubmit={submitHandle}>
        <div className={style.controls}>
          <div className={style.control}>
            <label htmlFor="year">Year</label>
            <select id="year" ref={yearInputRef}>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className={style.control}>
            <label htmlFor="month">Month</label>
            <select id="month" ref={monthInputRef}>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </div>
        </div>
        <Button>Find Events</Button>
      </form>
    </>
  );
}

export default EventSearch;
