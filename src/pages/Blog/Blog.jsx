import React from "react";
import "./Blog.css";

const Blog = () => {
  return (
    <div className="Blog-main">
      <p
        style={{
          fontSize: "4rem",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        Blog!
      </p>

      <div className="Blog-content">
        <div className="blog-item">
          <h1>Blog Item</h1>
          Self-care is often overlooked, but it is an essential part of
          maintaining good physical and mental health. It involves taking the
          time to prioritize your own well-being, whether that means getting
          enough sleep, eating nutritious meals, exercising regularly, or simply
          taking a few moments to relax and unwind. There are many benefits to
          practicing self-care. It can help reduce stress, improve your mood,
          boost your immune system, and increase your overall sense of
          well-being. It can also help you feel more productive and energized,
          which can lead to better performance at work or school. Unfortunately,
          many of us struggle to make self-care a priority.
        </div>

        <div className="blog-item">
          <h1>Blog Item</h1> We may feel like we don't have the time or energy
          to take care of ourselves, or we may be so focused on our
          responsibilities that we forget to pay attention to our own needs. But
          it's important to remember that taking care of yourself is not a
          luxury; it's a necessity.
        </div>

        <div className="blog-item">
          <h1>Blog Item</h1>
          You deserve to feel your best, and self-care is one of the best ways
          to ensure that you are able to live a happy, healthy life. So don't
          neglect your self-care. Make time for activities that nourish your
          body and mind, and remember that taking care of yourself is an
          important part of taking care of others. By prioritizing self-care,
          you'll be better equipped to handle the challenges of daily life and
          enjoy the rewards of your hard work.
        </div>
      </div>
    </div>
  );
};
export default Blog;
