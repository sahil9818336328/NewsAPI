import React from "react";
import { useGlobalContext } from "./context";

const News = () => {
  const { isLoading, data, removeNews } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <section className="stories">
      {data.map((newz) => {
        const {
          objectID: id,
          title,
          num_comments: comments,
          url,
          points,
          author,
        } = newz;

        return (
          <article className="story" key={id}>
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} by <span>{author} | </span>
              {comments} comments
            </p>
            <div>
              <a
                href={url}
                className="read-link"
                rel="noreferrer"
                target="_blank"
              >
                read more
              </a>
              <button className="remove-btn" onClick={() => removeNews(id)}>
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default News;
