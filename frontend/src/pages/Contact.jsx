import React from "react";

// Contact section
const Contact = () => {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center text-primaryColor">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Or want to give us feedback? We are here to
          help you.
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="name" className="form__label">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              // value={userData.name}
              // onChange={handleInputs}
              placeholder="Your name"
              className="form__input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form__label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              // value={userData.email}
              // onChange={handleInputs}
              placeholder="Your email"
              className="form__input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              // value={userData.subject}
              // onChange={handleInputs}
              placeholder="Let us know how can we help you"
              className="form__input mt-1"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your Message
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              name="message"
              // value={userData.message}
              // onChange={handleInputs}
              placeholder="Leave your comment here..."
              className="form__input mt-1"
              required
            />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
