import styles from "../../styles/bin.module.css";
import { AiFillInfoCircle } from "react-icons/ai";
import { useState } from "react";
import { createBinViaApi } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateBin() {
  const [content, setContent] = useState<string>("");
  const [deleteAfterView, setDeleteAfterView] = useState<boolean>(false);

  const createBin = () => {
    const title: any = document.querySelector("#title");
    const desc: any = document.querySelector("#description");
    const content: any = document.querySelector("#textarea");

    createBinViaApi(
      title?.innerHTML,
      desc?.innerHTML,
      deleteAfterView,
      content.value
    )
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Bin Link Copied!");
          console.log(res.data);

          window.navigator.clipboard.writeText(
            `http://localhost:3000/bin/${res.data.data.urlCode}`
          );
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message.includes("409")) {
          return toast.error(
            "Title or Description length exceeded. \nTitle Limit: 20 \nDescription Limit: 60"
          );
        }
        toast.error("Something went wrong while creating a bin!");
      });
  };

  return (
    <>
      <ToastContainer theme="dark" position="bottom-center" />
      <div className={styles.container}>
        <div className={styles.banner}>
          <AiFillInfoCircle color="cyan" size={24} />
          <h3>Click on the title and description to edit them!</h3>
        </div>
        <h2 contentEditable className={styles.title} id="title">
          New Bin
        </h2>
        <p contentEditable id="description">
          A new bin created with namespace
        </p>
      </div>
      <div className={styles.shell}>
        <textarea
          className={styles.editor}
          id="textarea"
          spellCheck={false}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className={styles.deleter}>
          <h3>Delete After View</h3>
          <input
            type="checkbox"
            onChange={(e) => setDeleteAfterView(e.target.checked)}
          />
        </div>
        <button className={styles.button} onClick={createBin}>
          Create Bin
        </button>
      </div>
    </>
  );
}
