import styles from "../../styles/Card.module.css";

const Card = (user) => {
  return (
    <div className={styles["card-wrapper"]}>
      <img src="/assets/default-user-picture.svg" alt="default-user-picture" className={styles["card-image"]} />
      <pre className={styles["pre"]}>{`${JSON.stringify(user, null, 2)}`}</pre>
    </div>
  );
};

export default Card;
