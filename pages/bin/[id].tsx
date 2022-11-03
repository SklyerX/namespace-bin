import styles from "../../styles/bin.module.css";
import { AiFillFire, AiFillInfoCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { createBinViaApi } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function BinsList({ bin }: any) {
  const [content, setContent] = useState<string>("");
  const [deleteAfterView, setDeleteAfterView] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (bin.success === true) {
      setContent(`${bin.data.Content}`);
    }
  }, []);

  const createBin = () => {
    const title: any = document.querySelector("#title");
    const desc: any = document.querySelector("#description");
    const content: any = document.querySelector("#textarea");

    const titleLength = title.innerHTML.length;
    const descLength = desc.innerHTML.length;
    const contentLength = content.value.length;

    const border = "3px solid #f00";

    if (titleLength !== 0 && descLength !== 0 && contentLength !== 0) {
    } else {
      if (titleLength === 0) {
        title.style.border = border;
      }
      if (descLength === 0) {
        desc.style.border = border;
      }
      if (contentLength === 0) {
        content.style.border = border;
      }
    }

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
            `https://namespace.netlify.app/bin/${res.data.data.urlCode}`
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
      {bin.success === true ? (
        <>
          <Head>
            <meta content={bin.data.Title} property="og:title" />
            <meta content={bin.data.Description} property="og:description" />
            <meta
              content={`http://localhost:3000/bin/${id}`}
              property="og:url"
            />
            <meta
              content="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAbFBMVEX/VVX/////U1P/Rkb/TEz/UVH/Skr/qqr/RET/SEj/tbX/+Pj/z8//W1v/f3//Tk7/1dX/Y2P/wsL/7e3/ysr/d3f/hIT/6Oj/mJj/8vL/sLD/4+P/3Nz/bm7/vb3/kJD/ior/np7/Pj7/NTWmbJZIAAAC10lEQVRoge2W2ZajIBCGtVhEjUviFrekY7//O04VaLQNnunkzN3w34BCfRZlQeF5Tk5OTk5OTk5OTk7/obKQxD8xldpUHI5DeD31TVGcwvfZYV8UTV+m7HBC6Wv1Cj8kRMY5zwTMHxYbgXk2I0L3VGxsuwPHRGrG/YZ5kIzpNQiCR+WFhIdznT5Vn0GMaVpxY4U98YT7oz0y8oZjeV3XOJcH81w/vhE9e/gb3TM9V3MUGTH8Bho22A/sf4ydcCzhepUrHBeCYciuO3iEzUABnrBzYjo6ssL+TVrhKkc/PRPjGW7WGsk9XGi4/5WtcB077F/sQX+BRyyDC7bthIYAIolpgsCuZ+CF+hzehSAkOa/IcoETe4b7D/45XHrAW+xMxnaG659v4K2Aj+EqU+nGdg+PyXX1S/igXVnh5f1626TuHh7jnHjaep4cwEHKacku70cqxtWcXC+eA+Z18L3CPY4vim8pYcceu2CYk2sP70Kww5MvYm3htNXyoDv/pItab5f7siYNj9tYJzqdNTb4WfXozgbusWtBBpWwwE8j38I7Jryv1mScFc7v+OV4Aw/TwQYfy7LdvF7yHPSWNq6/wkE1OnILPKNlFJdy3AVdMMXNEbSBSzpakdhmYIdr2goPe8ofxiwH47RPRYILyt0iPPDcU+0GrlOxtJeL1000SaaogAwKV8ZURvBQkWcLnF+38Hd2aB9Fl8IcIaI+laUuVNicUrHAddQ+gi/qJ/t5Tukcdu/DZbeicjgoFgQHeB8uqlvetKj+VimgfTDkTw2p4A981huRRXneyV/B/UTXAqRJpRTnSs1XEaE2ojqIjfEjVIrYaJaNx/CQqs7FS5Jk2QMA1ok2AZol5F1nL9DzjtBXi7f1vFpU9qsF8GHODvUBvDW2pb34Ez1q8CCMhw88ZwUatv3j2BQrBjXJ70O9miZk95c7LAC88Rv/haGTk5OTk5OTk9N/qT9EECuVQsB8sAAAAABJRU5ErkJggg=="
              property="og:image"
            />
            <meta
              content="#43B581"
              data-react-helmet="true"
              name="theme-color"
            />
            <title>{bin.data.Title}</title>
          </Head>
          <div className={styles.container}>
            {bin.data.DeleteAfterView ? (
              <div className={styles.banner}>
                <AiFillFire color="#f00" size={24} />
                <h3>This bin is only for your eyes</h3>
              </div>
            ) : (
              ""
            )}
            <div className={styles.banner}>
              <AiFillInfoCircle color="cyan" size={24} />
              <h3>Click on the title and description to edit them!</h3>
            </div>
            <h2 contentEditable className={styles.title} id="title">
              {bin.data.Title}
            </h2>
            <p contentEditable id="description">
              {bin.data.Description}
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
      ) : (
        <>
          <div>
            <h3>Bin Not Found</h3>
            <p>This been has been deleted or does not exist!</p>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const req = await fetch(`https://nmb.0110110.repl.co/v1/bin/${params.id}`);
  const data = await req.json();

  return {
    props: { bin: data },
  };
}
