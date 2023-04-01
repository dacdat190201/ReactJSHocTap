import React, { useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_at226mk",
        "template_dqu6x0y",
        form.current,
        "K9BIxHUW7XxeVv7Ln"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          window.alert("Gửi Thành Công");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="bg-contact">
      {" "}
      <section className="contact pt-100 pb-100" id="contact">
        <div className="container">
          <div className="row" style={{ width: 1100 }}>
            <div className="col-xl-6 mx-auto text-center">
              <div className="section-title mb-100">
                <p>get in touch</p>
                <h4>contact me</h4>
              </div>
            </div>
          </div>
          <div className="row text-center" style={{ width: 1100 }}>
            <div className="col-md-8">
              <form ref={form} className="contact-form" onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-xl-6">
                    <input type="text" placeholder="name" name="to_name" />
                  </div>
                  <div className="col-xl-6">
                    <input type="text" placeholder="email" name="from_name" />
                  </div>

                  <div className="col-xl-12">
                    <textarea
                      placeholder="message"
                      cols={30}
                      rows={10}
                      defaultValue={""}
                      name="message"
                    />
                    <input type="submit" defaultValue="send message" />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4">
              <div className="single-contact">
                <i className="fa fa-map-marker" />
                <h5>Địa Chỉ</h5>
                <p>
                  140 Lê Trọng Tấn, phường Tây Thạnh, Quận Tân Phú, Hồ Chí Mình
                </p>
              </div>
              <div className="single-contact">
                <i className="fa fa-phone" />
                <h5>Số điện thoại</h5>
                <p>0966.6969.999</p>
              </div>
              <div className="single-contact">
                <i className="fa fa-envelope" />
                <h5>Email</h5>
                <p>dacdat190201@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
