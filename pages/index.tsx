import styles from "../styles/Home.module.css";
import { AiOutlinePlus } from "react-icons/ai";

export default function Home({ bin }: any) {
  return (
    <div className={styles.container}>
      <div
        className={styles.add}
        onClick={() => window.location.replace("/bin")}
      >
        <AiOutlinePlus color="#fff" size={24} />
      </div>
      {bin.map((data: any) => (
        <div
          key={data.UrlCode}
          className={styles.card}
          onClick={() =>
            window.location.replace(
              `${window.location.href}/bin/${data.UrlCode}`
            )
          }
        >
          <h2 className={styles.header}>{data.Title}</h2>
          <p className={styles.description}>{data.Description}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const req = await fetch(`https://nmb.0110110.repl.co/v1/bin`);
  const data = await req.json();

  return {
    props: { bin: data },
  };
}
