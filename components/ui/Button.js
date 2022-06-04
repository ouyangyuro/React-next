import Link from "next/link";
import style from "./Button.module.css";

function Button(props) {
  // console.log('props.children:',props.children); //上面一層的文字傳下來 for check
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={style.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={style.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
